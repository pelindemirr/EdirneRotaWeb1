"use client";
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Header from "@/components/layout/Header";
import {
  MapPin,
  Plus,
  X,
  Navigation,
  Clock,
  Trash2,
  Search,
  Star,
  Heart,
  GripVertical,
  Route,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dynamic from "next/dynamic";
import { places, Place } from "@/mock/places";
import { addUserRoute } from "@/utils/userRoutes";
import { useAuth } from "@/contexts/AuthContext";

// Leaflet bileşenini ayrı component olarak yükle
const LeafletMap = dynamic(() => import("../../components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500 animate-pulse">Harita yükleniyor...</div>
    </div>
  ),
});

import { SortableRouteItem } from "./SortableRouteItem";

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
        <div className="text-lg font-bold text-gray-800 mb-2">{title}</div>
        <div className="text-gray-600 text-sm mb-4 text-center">{message}</div>
        <div className="flex gap-2 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
          >
            Vazgeç
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-600 hover:to-orange-600 shadow-md"
          >
            Temizle
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EdirneRoutePage() {
  const { isLoggedIn } = useAuth();

  const [showClearModal, setShowClearModal] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    []
  );
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [routeName, setRouteName] = useState("");

  const fetchRealRoute = async (placesParam: Place[]) => {
    if (placesParam.length < 2) {
      setRouteCoordinates([]);
      setRouteInfo(null);
      return;
    }

    setIsLoadingRoute(true);
    try {
      const coords = placesParam.map((p) => `${p.lng},${p.lat}`).join(";");
      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.code === "Ok" && data.routes && data.routes.length > 0) {
        const routeCoords = data.routes[0].geometry.coordinates.map(
          (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
        );
        setRouteCoordinates(routeCoords);
        setRouteInfo({
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
        });
      } else {
        // fallback: düz noktaları kullan
        setRouteCoordinates(placesParam.map((p) => [p.lat, p.lng]));
        setRouteInfo(null);
      }
    } catch (error) {
      console.error("Rota çizimi başarısız:", error);
      setRouteCoordinates(placesParam.map((p) => [p.lat, p.lng]));
      setRouteInfo(null);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  useEffect(() => {
    if (selectedPlaces.length > 1) {
      fetchRealRoute(selectedPlaces);
    } else {
      setRouteCoordinates([]);
      setRouteInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaces]);

  const shareOnWhatsApp = () => {
    const text = `📍 Edirne rotamı keşfetmek ister misin?\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const saveRoute = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setCopySuccess(false);
    try {
      // Loginli kullanıcı ise localStorage'a kaydet
      if (isLoggedIn) {
        addUserRoute({
          name: "Edirne Rotam",
          places: selectedPlaces.map((p) => p.name),
        });
      }
      // Eski API paylaşım logic'i (isteğe bağlı)
      // ...
      setSaveSuccess(true);
    } catch (e) {
      alert("Bir hata oluştu, rota kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("edirne_favorites");
    if (
      savedFavorites &&
      savedFavorites !== "undefined" &&
      savedFavorites !== "null"
    ) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch {}
    }
  }, []);

  const toggleFavorite = (placeId: number) => {
    const newFavorites = favorites.includes(placeId)
      ? favorites.filter((id) => id !== placeId)
      : [...favorites, placeId];
    setFavorites(newFavorites);
    localStorage.setItem("edirne_favorites", JSON.stringify(newFavorites));
  };

  const categories = [
    "Tüm Mekanlar",
    "Favorilerim",
    "Popüler",
    "Tarih & Kültür",
    "Doğa & Gezi",
    "Yemek & Gastronomi",
    "Alışveriş",
    "Müze",
  ];

  const districts = [
    "Tüm İlçeler",
    "Merkez",
    "Keşan",
    "İpsala",
    "Uzunköprü",
    "Havsa",
    "Enez",
    "Lalapaşa",
    "Meriç",
    "Süloğlu",
  ];

  const addPlace = (place: Place) => {
    if (!selectedPlaces.some((p) => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const removePlace = (id: number) => {
    setSelectedPlaces(selectedPlaces.filter((p) => p.id !== id));
  };

  const clearRoute = () => {
    setSelectedPlaces([]);
    setRouteCoordinates([]);
    setRouteInfo(null);
    setShareUrl("");
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px hareket ettiğinde drag başlar
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("active:", active?.id, "over:", over?.id);

    if (over && active.id !== over.id) {
      setSelectedPlaces((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id.toString() === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.id.toString() === over.id
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredPlaces = places
    .filter((p) => {
      // İlçe filtresi
      if (districtFilter && p.district !== districtFilter) {
        return false;
      }

      // Kategori filtresi
      if (categoryFilter === "Favorilerim") {
        return favorites.includes(p.id);
      }
      if (categoryFilter === "Popüler") {
        return p.popular === true;
      }
      if (categoryFilter && categoryFilter !== "Tüm Mekanlar") {
        return p.category === categoryFilter;
      }

      return true;
    })
    .filter((p) => {
      // Sadece isimde ara
      if (!search.trim()) return true;
      return p.name.toLowerCase().includes(search.toLowerCase().trim());
    });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Tarih & Kültür": "bg-purple-100 text-purple-700",
      "Doğa & Gezi": "bg-green-100 text-green-700",
      "Yemek & Gastronomi": "bg-orange-100 text-orange-700",
      Alışveriş: "bg-blue-100 text-blue-700",
      Manzara: "bg-cyan-100 text-cyan-700",
      Müze: "bg-indigo-100 text-indigo-700",
      "Tatlı & Kültür": "bg-pink-100 text-pink-700",
      "Tarih & Arkeoloji": "bg-amber-100 text-amber-700",
      Etkinlik: "bg-rose-100 text-rose-700",
      "Kültür & Spor": "bg-lime-100 text-lime-700",
      "Tarih & Manzara": "bg-teal-100 text-teal-700",
      Tarih: "bg-violet-100 text-violet-700",
      "Anıt & Tarih": "bg-slate-100 text-slate-700",
      "Manzara & Tarih": "bg-emerald-100 text-emerald-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_400px] gap-6 mb-20">
          {/* Sol - Önerilen Yerler */}
          <div
            className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
            style={{ height: "calc(100vh - 220px)" }}
          >
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-xl sticky top-0 z-10">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Önerilen Yerler
              </h2>

              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800" />
                <input
                  type="text"
                  placeholder="Mekan ara..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* İlçe Filtresi */}
              <div className="mb-3">
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300 bg-white cursor-pointer"
                >
                  {districts.map((district) => (
                    <option
                      key={district}
                      value={district === "Tüm İlçeler" ? "" : district}
                    >
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kategori Chip'leri */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setCategoryFilter(cat === "Tüm Mekanlar" ? "" : cat)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                      categoryFilter === cat ||
                      (cat === "Tüm Mekanlar" && !categoryFilter)
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat === "Popüler" && "⭐ "}
                    {cat === "Favorilerim" && "❤️ "}
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mt-2 text-xs text-gray-500">
                {filteredPlaces.length} mekan bulundu
                {categoryFilter === "Favorilerim" && favorites.length > 0 && (
                  <span className="ml-2 text-red-600 font-semibold">
                    ({favorites.length} favorin var)
                  </span>
                )}
              </div>
            </div>

            {/* Places List */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-2">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-red-400 hover:shadow-md transition-all duration-200 cursor-pointer relative hover:scale-[1.01]"
                  >
                    {/* Popüler ve Favori İkonları */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {place.popular && (
                        <div className="bg-yellow-100 p-1 rounded-full">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(place.id);
                        }}
                        className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                          favorites.includes(place.id)
                            ? "bg-red-100 hover:bg-red-200"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        title={
                          favorites.includes(place.id)
                            ? "Favorilerden çıkar"
                            : "Favorilere ekle"
                        }
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-all ${
                            favorites.includes(place.id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">{place.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-800 mb-1 pr-12">
                          {place.name}
                        </h3>
                        <span
                          className={`inline-block text-xs px-2 py-0.5 rounded-full mb-1 ${getCategoryColor(
                            place.category
                          )}`}
                        >
                          {place.category}
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {place.desc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => addPlace(place)}
                      disabled={selectedPlaces.some((p) => p.id === place.id)}
                      className={`absolute bottom-3 right-3 p-1.5 rounded-full transition-all duration-200 ${
                        selectedPlaces.some((p) => p.id === place.id)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white hover:scale-110 shadow-md"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orta - Harita */}
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            style={{ height: "calc(100vh - 220px)" }}
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                <span className="font-semibold text-sm">Harita Görünümü</span>
                {isLoadingRoute && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full animate-pulse">
                    Rota çiziliyor...
                  </span>
                )}
              </div>
              {selectedPlaces.length > 0 && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {selectedPlaces.length} nokta
                </span>
              )}
            </div>
            {isMounted && (
              <LeafletMap
                selectedPlaces={selectedPlaces}
                routeCoordinates={routeCoordinates}
              />
            )}
          </div>

          {/* Sağ - Seçilen Rota */}
          <div
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col"
            style={{ height: "calc(100vh - 220px)" }}
          >
            <div className="border-b border-gray-200 pb-3 mb-3">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-red-600" />
                Rotanız
              </h2>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  {selectedPlaces.length} mekan seçildi
                </p>
              </div>

              {/* Mesafe ve Süre Bilgisi - Profesyonel ve kullanıcı dostu kutu */}
              {routeInfo &&
                (() => {
                  const distanceKm = (routeInfo.distance / 1000).toFixed(2);
                  const durationMin = Math.round(routeInfo.duration / 60);
                  const durationHrs = Math.floor(durationMin / 60);
                  const durationRemainingMin = durationMin % 60;
                  console.log("Route Info:", routeInfo);

                  return (
                    <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Route className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-800">
                            Toplam Mesafe
                          </span>
                        </div>
                        <span className="font-bold text-blue-700">
                          {distanceKm} km
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-800">
                            Tahmini Süre
                          </span>
                        </div>
                        <span className="font-bold text-blue-700">
                          {durationHrs > 0
                            ? `${durationHrs} sa ${durationRemainingMin} dk`
                            : `${durationMin} dk`}
                        </span>
                      </div>

                      <div className="text-[10px] text-gray-500 text-right italic mt-1">
                        Trafik, duraklama ve yol tipi süreyi etkileyebilir.
                      </div>
                    </div>
                  );
                })()}
            </div>

            {/* Rota boşsa */}
            {selectedPlaces.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-3 animate-pulse">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-gray-500 text-sm mb-1 font-medium">
                  Henüz mekan eklenmedi
                </p>
                <p className="text-gray-400 text-xs">
                  Sol taraftan ➕ butonuna tıklayarak rotanızı oluşturun
                </p>
              </div>
            ) : (
              <>
                {/* ✅ Drag & Drop Sıralama Alanı */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={selectedPlaces.map((p) => p.id.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                      {selectedPlaces.map((place, index) => (
                        <SortableRouteItem
                          key={place.id}
                          id={place.id.toString()}
                          place={place}
                          index={index}
                          onRemove={removePlace}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                {/* Alt Butonlar */}
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Rotayı Temizle
                  </button>
                  <ConfirmModal
                    open={showClearModal}
                    onClose={() => setShowClearModal(false)}
                    onConfirm={clearRoute}
                    title="Rotayı Temizle?"
                    message="Rotanızdaki tüm mekanları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                  />

                  <div className="mt-2">
                    <div className="mb-2 text-xs text-gray-500 text-center">
                      Rotanızı kaydedin ve paylaşın
                    </div>
                    <button
                      onClick={() => setShowNameModal(true)}
                      disabled={isSaving || selectedPlaces.length === 0}
                      className={`w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center justify-center gap-2 shadow-md text-sm ${
                        isSaving || selectedPlaces.length === 0
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {isSaving ? (
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                      ) : (
                        <Navigation className="w-3.5 h-3.5" />
                      )}
                      {isSaving ? "Kaydediliyor..." : "Rotayı Kaydet ve Paylaş"}
                    </button>

                    {/* Rota ismi modalı */}
                    {showNameModal && (
                      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
                          <div className="text-lg font-bold text-gray-800 mb-2">
                            Rota İsmi
                          </div>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm text-gray-800"
                            placeholder="Rota adını girin..."
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                          />
                          <div className="flex gap-2 w-full">
                            <button
                              onClick={() => setShowNameModal(false)}
                              className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                            >
                              Vazgeç
                            </button>
                            <button
                              onClick={async () => {
                                setIsSaving(true);
                                setSaveSuccess(false);
                                setCopySuccess(false);
                                try {
                                  if (isLoggedIn) {
                                    addUserRoute({
                                      name: routeName || "Edirne Rotam",
                                      places: selectedPlaces.map((p) => p.name),
                                    });
                                  }
                                  setSaveSuccess(true);
                                  setShowNameModal(false);
                                } catch (e) {
                                  alert("Bir hata oluştu, rota kaydedilemedi.");
                                } finally {
                                  setIsSaving(false);
                                }
                              }}
                              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-600 hover:to-orange-600 shadow-md"
                              disabled={isSaving || !routeName.trim()}
                            >
                              Kaydet
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {saveSuccess && shareUrl && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in slide-in-from-bottom duration-300">
                          {/* Header */}
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 relative">
                            <button
                              onClick={() => {
                                setSaveSuccess(false);
                                setShareUrl("");
                              }}
                              className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <div className="flex flex-col items-center text-white">
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                                <svg
                                  className="w-8 h-8"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <h3 className="text-xl font-bold">
                                Rota Başarıyla Kaydedildi!
                              </h3>
                              <p className="text-sm text-white/90 mt-1">
                                Rotanızı şimdi paylaşabilirsiniz
                              </p>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 space-y-4">
                            {/* QR Code */}
                            <div className="flex justify-center">
                              <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                                <QRCodeCanvas value={shareUrl} size={140} />
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-xs text-gray-500">
                                QR kodu telefonunuzla taratarak rotayı
                                görüntüleyebilirsiniz
                              </p>
                            </div>

                            {/* Share Buttons */}
                            <div className="space-y-2">
                              <button
                                onClick={shareOnWhatsApp}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-lg"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp ile Paylaş
                              </button>

                              <button
                                onClick={handleCopy}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-lg"
                              >
                                {copySuccess ? (
                                  <>
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    Kopyalandı!
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                    Linki Kopyala
                                  </>
                                )}
                              </button>

                              {/* Share Link Display */}
                              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1">
                                  Paylaşım Linki:
                                </div>
                                <div className="text-sm text-gray-700 font-mono break-all">
                                  {shareUrl}
                                </div>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <svg
                                className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <p className="text-xs text-blue-700">
                                Bu linki arkadaşlarınızla paylaşarak onların da
                                rotanızı görmesini sağlayabilirsiniz.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2024 Edirne Keşif - Tüm hakları saklıdır</p>
          <p className="text-xs text-gray-400 mt-1">
            Edirne'yi keşfetmenin en kolay yolu
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Modal'ın harita üstünde görünmesi için yüksek z-index */
        .leaflet-container {
          z-index: 10 !important;
        }

        @keyframes slide-in-from-bottom {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slide-in-from-bottom 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
