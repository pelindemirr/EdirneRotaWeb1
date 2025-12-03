"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import {
  getUserRoutes,
  setRouteCompleted,
  deleteUserRoute,
  UserRoute,
} from "@/utils/userRoutes";
import { getEarnedBadges } from "@/utils/badgeLogic";

// Gerçek rozet sistemi
const badges = [
  {
    id: 1,
    name: "İlk Adım",
    icon: "🎯",
    desc: "İlk rotanı tamamladın!",
    requirement: 1,
    unlocked: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Tarih Meraklısı",
    icon: "🏛️",
    desc: "5 tarihi mekanı ziyaret ettin",
    requirement: 5,
    unlocked: true,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Doğa Sever",
    icon: "🌳",
    desc: "3 doğal alanı keşfettin",
    requirement: 3,
    unlocked: false,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Gurme",
    icon: "🍽️",
    desc: "10 yerel lezzeti tattın",
    requirement: 10,
    unlocked: true,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Sosyal Gezgin",
    icon: "👥",
    desc: "Rotalarını 5 kişiyle paylaştın",
    requirement: 5,
    unlocked: false,
    color: "from-teal-500 to-blue-500",
  },
  {
    id: 6,
    name: "Festival Aşığı",
    icon: "🎭",
    desc: "3 etkinliğe katıldın",
    requirement: 3,
    unlocked: true,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 7,
    name: "Maraton Koşucusu",
    icon: "🏃",
    desc: "50km yol kat ettin",
    requirement: 50,
    unlocked: false,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 8,
    name: "Edirne Uzmanı",
    icon: "🎓",
    desc: "Tüm kategorileri keşfettin",
    requirement: 100,
    unlocked: false,
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: 9,
    name: "Fotoğraf Sanatçısı",
    icon: "📸",
    desc: "20 fotoğraf paylaştın",
    requirement: 20,
    unlocked: false,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 10,
    name: "Kırkpınar Görmüş",
    icon: "🤼",
    desc: "Kırkpınar Festivali'ne katıldın",
    requirement: 1,
    unlocked: true,
    color: "from-red-600 to-orange-600",
  },
  {
    id: 11,
    name: "Selimiye'nin Ustası",
    icon: "🕌",
    desc: "Selimiye Camii'ni 3 kez ziyaret ettin",
    requirement: 3,
    unlocked: false,
    color: "from-sky-500 to-blue-600",
  },
  {
    id: 12,
    name: "Edirne Elçisi",
    icon: "👑",
    desc: "50 yer ziyaret ettin - Tebrikler!",
    requirement: 50,
    unlocked: false,
    color: "from-amber-500 to-yellow-600",
  },
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

// Favori yerler
import { places, Place } from "@/mock/places";
// Favori yerler hook'ları component içinde kullanılmalı

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
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

  // Kullanıcı bilgileri - gerçek auth'dan geliyor
  const user = {
    name: authUser?.name || "Kullanıcı",
    email: authUser?.email || "email@example.com",
    level: 1,
    xp: userRoutes.filter((r) => r.completed).length * 100,
    nextLevelXp: 500,
  };
  const earnedBadges = getEarnedBadges(userRoutes);
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Profil Header - Geliştirilmiş */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-8 mb-6 border border-orange-100 relative overflow-hidden">
            {/* Dekoratif arka plan */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/10 to-red-500/10 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl transform hover:scale-105 transition-transform">
                  {user.name.charAt(0)}
                </div>
                {/* Level Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Seviye {user.level}
                </div>
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  {user.name}
                  {earnedBadges.length >= 3 && (
                    <Crown className="w-7 h-7 text-yellow-500" />
                  )}
                </h1>
                <p className="text-gray-600 mb-3">{user.email}</p>

                {/* İstatistikler Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center gap-2 mb-1">
                      <Route className="w-4 h-4" />
                      <p className="text-xs font-semibold opacity-90">
                        Tamamlanan
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {userRoutes.filter((r) => r.completed).length}
                    </p>
                    <p className="text-xs opacity-75">Rota</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4" />
                      <p className="text-xs font-semibold opacity-90">
                        Kazanılan
                      </p>
                    </div>
                    <p className="text-2xl font-bold">{earnedBadges.length}</p>
                    <p className="text-xs opacity-75">Rozet</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4" />
                      <p className="text-xs font-semibold opacity-90">
                        Ziyaret
                      </p>
                    </div>
                    <p className="text-2xl font-bold">{totalPlaces}</p>
                    <p className="text-xs opacity-75">Mekan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Modern Design */}
          <div className="bg-white rounded-2xl shadow-lg mb-6 p-2 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 min-w-[120px] py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Target className="w-4 h-4" />
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`flex-1 min-w-[120px] py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "badges"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Trophy className="w-4 h-4" />
              Rozetler
            </button>
            <button
              onClick={() => setActiveTab("routes")}
              className={`flex-1 min-w-[120px] py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "routes"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Map className="w-4 h-4" />
              Rotalarım
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex-1 min-w-[120px] py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "favorites"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart className="w-4 h-4" />
              Favorilerim
            </button>
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
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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

            {/* Rozetler */}
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
                      {earnedBadges.length} / 3
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="group relative bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                      >
                        <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-center">
                          <div className="text-5xl mb-3 animate-bounce">
                            {badge.icon}
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">
                            {badge.name}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(3 - earnedBadges.length)].map((_, i) => (
                      <div
                        key={i}
                        className="group relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition-all cursor-pointer opacity-60 hover:opacity-80"
                      >
                        <div className="absolute top-2 right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-center">
                          <div className="text-5xl mb-3 grayscale">🎖️</div>
                          <h4 className="font-bold text-gray-700 mb-2">
                            Kilitli
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Yeni rozet için daha fazla rota tamamla
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
                              <Calendar className="w-4 h-4" />
                              {new Date(route.createdAt).toLocaleDateString(
                                "tr-TR"
                              )}
                            </span>
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
