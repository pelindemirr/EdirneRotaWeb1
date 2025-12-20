"use client";

import {
  Award,
  MapPin,
  Star,
  Trophy,
  Target,
  Crown,
  Lock,
  Calendar,
  Clock,
  Route,
  TrendingUp,
  Zap,
  Map,
  CheckCircle2,
  Heart,
  Trash2,
  X,
  Edit2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import {
  getUserRoutes,
  setRouteCompleted,
  deleteUserRoute,
  UserRoute,
} from "@/utils/userRoutes";
import { places, Place } from "@/mock/places";
import { allBadges } from "@/mock/badges";

const badges = allBadges;

import React, { useState, useEffect } from "react";

// Avatar seçenekleri (PNG)
const avatars = [
  { id: 1, src: "/assets/images/profile/man1.png", name: "Erkek 1" },
  { id: 2, src: "/assets/images/profile/woman2.png", name: "Kadın 2" },

  { id: 3, src: "/assets/images/profile/man2.png", name: "Erkek 2" },
  { id: 4, src: "/assets/images/profile/woman1.png", name: "Kadın 1" },
];

// Kullanıcıya ait rotalar (localStorage'dan)
function useUserRoutes() {
  const [routes, setRoutes] = useState<UserRoute[]>([]);
  useEffect(() => {
    setRoutes(getUserRoutes());
    const onStorage = () => setRoutes(getUserRoutes());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return [routes, setRoutes] as const;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const { user: authUser } = useAuth();
  const [userRoutes, setUserRoutes] = useUserRoutes();

  // Favori yerler: localStorage'dan id'leri alıp places ile eşleştir
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  useEffect(() => {
    function getFavoritePlaces() {
      if (typeof window === "undefined") return [];
      const favIds = JSON.parse(
        localStorage.getItem("edirne_favorites") || "[]"
      );
      return places.filter((p) => favIds.includes(p.id));
    }
    setFavoritePlaces(getFavoritePlaces());
    const onStorage = () => setFavoritePlaces(getFavoritePlaces());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Avatar localStorage'dan yükle
  useEffect(() => {
    const savedAvatarId = localStorage.getItem("edirne_avatar");
    if (savedAvatarId) {
      const avatar = avatars.find((a) => a.id === parseInt(savedAvatarId));
      if (avatar) setSelectedAvatar(avatar);
    }
  }, []);

  // Kullanıcı bilgileri - gerçek auth'dan geliyor
  const user = {
    name: authUser?.name || "Kullanıcı",
    email: authUser?.email || "email@example.com",
    level: 1,
    xp: userRoutes.filter((r) => r.completed).length * 100,
    nextLevelXp: 500,
  };
  // Tamamlanan rota sayısı
  const completedRoutesCount = userRoutes.filter((r) => r.completed).length;

  // Rozetleri tamamlanan rota sayısına göre filtrele
  const earnedBadges = badges.filter((badge) =>
    badge.requirement.type === "route_completion" &&
    badge.requirement.count !== undefined
      ? completedRoutesCount >= badge.requirement.count
      : false
  );
  const lockedBadges = badges.filter((badge) =>
    badge.requirement.type === "route_completion" &&
    badge.requirement.count !== undefined
      ? completedRoutesCount < badge.requirement.count
      : false
  );

  const totalPlaces = userRoutes.reduce(
    (sum, route) => sum + route.places.length,
    0
  );
  const progressPercentage = (user.xp / user.nextLevelXp) * 100;

  // Rota tamamlandı/tamamlanmadı işaretleme
  const handleToggleCompleted = (route: UserRoute) => {
    setRouteCompleted(route.id, !route.completed);
    setUserRoutes(getUserRoutes());
  };
  // Rota silme
  const handleDeleteRoute = (route: UserRoute) => {
    deleteUserRoute(route.id);
    setUserRoutes(getUserRoutes());
  };

  // Avatar seçme
  const handleAvatarSelect = (avatar: (typeof avatars)[0]) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("edirne_avatar", avatar.id.toString());
    setShowAvatarModal(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Avatar Seçim Modal */}
          {showAvatarModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Avatar Seç
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`aspect-square rounded-xl border-4 transition-all transform hover:scale-110 flex items-center justify-center bg-white ${
                        selectedAvatar.id === avatar.id
                          ? "border-red-500 bg-red-50 shadow-lg"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={avatar.src}
                        alt={avatar.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profil Header - Geliştirilmiş */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-8 mb-6 border border-orange-100 relative overflow-hidden">
            {/* Dekoratif arka plan */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/10 to-red-500/10 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 bg-gray-200 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform overflow-hidden">
                  <img
                    src={selectedAvatar.src}
                    alt={selectedAvatar.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => setShowAvatarModal(true)}
                    className="absolute -bottom-2 -right-2 bg-white text-red-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-red-200 hover:bg-red-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  {user.name}
                  {earnedBadges.length >= 3 && (
                    <Crown className="w-7 h-7 text-yellow-500 animate-pulse" />
                  )}
                </h1>
                <p className="text-gray-600 mb-3">{user.email}</p>

                {/* İstatistikler Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      bg: "bg-red-800",
                      icon: <Route className="w-4 h-4" />,
                      label: "Tamamlanan",
                      value: userRoutes.filter((r) => r.completed).length,
                      sub: "Rota",
                      valueClass:
                        "text-sm font-bold text-white leading-relaxed",
                      subClass: "text-xs text-white",
                    },
                    {
                      bg: "bg-gray-500",
                      icon: <Trophy className="w-4 h-4" />,
                      label: "Kazanılan",
                      value: earnedBadges.length,
                      sub: "Rozet",
                      valueClass: "text-2xl font-bold",
                      subClass: "text-xs text-white",
                    },
                    {
                      bg: "bg-red-700",
                      icon: <MapPin className="w-4 h-4" />,
                      label: "Ziyaret",
                      value: totalPlaces,
                      sub: "Mekan",
                      valueClass: "text-2xl font-bold",
                      subClass: "text-xs opacity-75",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className={`${stat.bg} text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {stat.icon}
                        <p className="text-xs font-semibold opacity-90">
                          {stat.label}
                        </p>
                      </div>
                      <p className={stat.valueClass}>{stat.value}</p>
                      <p className={stat.subClass}>{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Modern Design */}
          <div className="bg-white rounded-2xl shadow-lg mb-6 p-2 flex gap-2 overflow-x-auto">
            {[
              {
                key: "overview",
                icon: <Target className="w-4 h-4" />,
                label: "Genel Bakış",
              },
              {
                key: "badges",
                icon: <Trophy className="w-4 h-4" />,
                label: "Rozetler",
              },
              {
                key: "routes",
                icon: <Map className="w-4 h-4" />,
                label: "Rotalarım",
              },
              {
                key: "favorites",
                icon: <Heart className="w-4 h-4" />,
                label: "Favorilerim",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 min-w-[120px] py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-red-600 to-gray-800 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Genel Bakış */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <TrendingUp className="text-red-500" />
                    Aktivite Özeti
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-red-50 p-6 rounded-xl border border-red-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-gray-200 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Tamamlanan Rota
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {userRoutes.filter((r) => r.completed).length}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Edirne'de tamamladığın rota sayısı
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Rozet Başarısı
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {Math.round((earnedBadges.length / 3) * 100)}%
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {earnedBadges.length}/3 rozet kazandın
                      </p>
                    </div>
                  </div>

                  {/* Son Aktiviteler */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Son Tamamlanan Rotalar
                    </h3>
                    <div className="space-y-3">
                      {userRoutes
                        .filter((r) => r.completed)
                        .slice(-3)
                        .reverse()
                        .map((route) => (
                          <div
                            key={route.id}
                            className="flex items-center gap-4 bg-white p-4 rounded-lg"
                          >
                            <div className="text-3xl">🗺️</div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">
                                {route.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(route.createdAt).toLocaleDateString(
                                  "tr-TR"
                                )}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-green-600">
                                +100 XP
                              </p>
                              <p className="text-xs text-gray-500">
                                {route.places.length} mekan
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rozetler - Geliştirilmiş Tasarım */}
            {activeTab === "badges" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Trophy className="text-yellow-500" />
                  Rozet Koleksiyonum
                </h2>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Kazanılan Rozetler
                    </h3>
                    <span className="text-sm text-gray-500">
                      {earnedBadges.length} / {badges.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`group relative bg-gradient-to-br rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                      >
                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="text-center">
                          <div className="text-6xl mb-3 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">
                            {badge.icon}
                          </div>
                          <h4 className="font-bold text-black text-lg mb-2 drop-shadow-md">
                            {badge.name}
                          </h4>
                          <p className="text-sm text-red-500 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>
                        {/* Parlama efekti */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Kilitli Rozetler
                    </h3>
                    <span className="text-sm text-gray-500">Yeni hedefler</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {lockedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="group relative bg-gray-100 border-2 border-gray-300 rounded-2xl p-6 hover:border-gray-400 transition-all cursor-pointer"
                      >
                        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
                          <Lock className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="text-center opacity-60 group-hover:opacity-80 transition-opacity">
                          <div className="text-6xl mb-3 grayscale filter">
                            {badge.icon}
                          </div>
                          <h4 className="font-bold text-gray-700 text-lg mb-2">
                            {badge.name}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rotalarım */}
            {activeTab === "routes" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Map className="text-red-500" />
                  Rotalarım
                </h2>
                <div className="space-y-4">
                  {userRoutes.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      Henüz rota oluşturmadınız.
                    </div>
                  ) : (
                    userRoutes.map((route) => (
                      <div
                        key={route.id}
                        className={`bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all flex flex-col md:flex-row items-center md:items-start gap-4`}
                      >
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {route.name}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {route.places.length} mekan
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleToggleCompleted(route)}
                              className={`px-4 py-2 rounded-lg font-semibold text-xs shadow-md transition-all duration-200 flex items-center gap-2 ${
                                route.completed
                                  ? "bg-green-500 text-white hover:bg-green-600"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {route.completed ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <Clock className="w-4 h-4" />
                              )}
                              {route.completed ? "Tamamlandı" : "Tamamlanmadı"}
                            </button>
                            <button
                              onClick={() => handleDeleteRoute(route)}
                              className="px-4 py-2 rounded-lg font-semibold text-xs shadow-md bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Sil
                            </button>
                          </div>
                        </div>
                        <div className="text-center bg-green-100 px-4 py-2 rounded-lg min-w-[100px]">
                          <p className="text-xs text-green-700 font-semibold">
                            XP
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {route.completed ? "+100" : "+0"}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Favori Yerler */}
            {activeTab === "favorites" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Heart className="text-red-500 fill-red-500" />
                  Favori Yerlerim
                </h2>
                {favoritePlaces.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">
                    Henüz favori mekan eklemediniz.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoritePlaces.map((place) => (
                      <div
                        key={place.id}
                        className="bg-white border border-red-100 rounded-xl p-5 shadow hover:shadow-lg transition-all flex gap-4 items-center"
                      >
                        <div className="text-4xl">{place.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">
                            {place.name}
                          </h3>
                          <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-1 bg-red-50 text-red-700 font-semibold">
                            {place.category}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {place.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
