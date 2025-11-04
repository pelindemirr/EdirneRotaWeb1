"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";
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

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

import { places, Place } from "@/mock/places";
import { SortableRouteItem } from "./SortableRouteItem";

export default function RotaPlanlaPage() {
  const [showClearModal, setShowClearModal] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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

  {
    /* Toplam Rota Özeti - Modern ve profesyonel kutu */
  }
  {
    routeInfo &&
      (() => {
        const distanceKm = (routeInfo.distance / 1000).toFixed(2);
        const durationMin = Math.round(routeInfo.duration / 60);
        const durationHrs = Math.floor(durationMin / 60);
        const durationRemainingMin = durationMin % 60;
        return (
          <div className="mt-3 flex flex-col gap-1 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Route className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-700 text-sm">
                Toplam Rota Özeti
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <span>Mesafe:</span>
              <span className="font-bold text-blue-700">{distanceKm} km</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <span>Süre:</span>
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
      })();
  }
  const fetchRealRoute = async (places: Place[]) => {
    if (places.length < 2) {
      setRouteCoordinates([]);
      setRouteInfo(null);
      return;
    }

    setIsLoadingRoute(true);
    try {
      const coords = places.map((p) => `${p.lng},${p.lat}`).join(";");
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
      }
    } catch (error) {
      console.error("Rota çizimi başarısız:", error);
      setRouteCoordinates(places.map((p) => [p.lat, p.lng]));
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
      const routeData = {
        name: "Edirne Rotam",
        date: new Date().toISOString(),
        places: selectedPlaces,
      };
      const res = await fetch("/api/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routeData),
      });
      const { id } = await res.json();
      const shareLink = `${window.location.origin}/r/${id}`;
      setShareUrl(shareLink);
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
      if (categoryFilter === "Favorilerim") {
        return favorites.includes(p.id);
      }
      if (categoryFilter === "Popüler") return p.popular;
      if (categoryFilter && categoryFilter !== "Tüm Mekanlar") {
        return p.category === categoryFilter;
      }
      return true;
    })
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

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
            {isMounted ? (
              <MapContainer
                key="main-map"
                center={[41.6772, 26.555]}
                zoom={13}
                className="w-full"
                style={{ height: "calc(100% - 42px)" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {selectedPlaces.map((place) => (
                  <Marker key={place.id} position={[place.lat, place.lng]}>
                    <Popup>
                      <div className="font-semibold text-center">
                        <span className="text-2xl">{place.icon}</span>
                        <br />
                        {place.name}
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {routeCoordinates.length > 1 && (
                  <Polyline
                    positions={routeCoordinates}
                    color="#ef4444"
                    weight={4}
                    opacity={0.8}
                  />
                )}
              </MapContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <div className="text-gray-500 animate-pulse">
                  Harita yükleniyor...
                </div>
              </div>
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
                    className="w-full bg-gray-500 hover:bg-gray-700 text-white-700 py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center justify-center gap-2 text-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Temizle
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
                      onClick={saveRoute}
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
                    {saveSuccess && shareUrl && (
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow flex flex-col items-center animate-in slide-in-from-bottom">
                        <div className="text-green-700 font-semibold mb-2">
                          Rota başarıyla kaydedildi!
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <button
                            onClick={shareOnWhatsApp}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
                          >
                            📲 WhatsApp ile Paylaş
                          </button>
                          <button
                            onClick={handleCopy}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
                          >
                            {copySuccess ? "Kopyalandı!" : "🔗 Linki Kopyala"}
                          </button>
                        </div>
                        <div className="flex flex-col items-center mt-2 p-3 bg-white rounded-lg border border-gray-100">
                          <QRCodeCanvas value={shareUrl} size={100} />
                          <span className="text-xs text-gray-500 mt-1">
                            QR ile paylaş
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-500 mt-2">
                          Linki arkadaşlarınla paylaşabilirsin.
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
