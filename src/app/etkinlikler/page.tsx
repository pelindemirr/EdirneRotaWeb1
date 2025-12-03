"use client";

import { useState } from "react";
import { Clock, MapPin, Calendar, ChevronRight, Search } from "lucide-react";
import { upcomingEvents, pastEvents, Event } from "@/mock/events";
import Header from "@/components/layout/Header";

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-400">
          © 2025 Edirne Rehberi. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

export default function EtkinliklerPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories = [
    {
      id: "all",
      name: "Tümü",
      color: "bg-gradient-to-r from-slate-700 to-slate-600",
      icon: "🎯",
    },
    {
      id: "kultur",
      name: "Kültür & Sanat",
      color: "bg-gradient-to-r from-purple-600 to-indigo-600",
      icon: "🌟",
    },
    {
      id: "spor",
      name: "Spor",
      color: "bg-gradient-to-r from-red-600 to-orange-600",
      icon: "⚽",
    },
    {
      id: "gastronomi",
      name: "Gastronomi",
      color: "bg-gradient-to-r from-amber-600 to-yellow-600",
      icon: "🍽️",
    },
    {
      id: "sanat",
      name: "Sanat & Eğlence",
      color: "bg-gradient-to-r from-pink-600 to-rose-600",
      icon: "🎭",
    },
  ];

  const events = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (category: string) => {
    const categoryMap: { [key: string]: { color: string; label: string } } = {
      kultur: {
        color:
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg",
        label: "Kültür & Sanat",
      },
      spor: {
        color:
          "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg",
        label: "Spor",
      },
      gastronomi: {
        color:
          "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg",
        label: "Gastronomi",
      },
      sanat: {
        color:
          "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg",
        label: "Sanat & Eğlence",
      },
    };
    return (
      categoryMap[category] || {
        color:
          "bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-lg",
        label: category,
      }
    );
  };

  const createGoogleCalendarUrl = (event: Event) => {
    const dateStr = event.date;
    const timeStr = event.time;

    const monthMap: { [key: string]: string } = {
      Ocak: "01",
      Kasım: "11",
      Aralık: "12",
      Haziran: "06",
    };

    const parts = dateStr.split(" ");
    const day = parts[0].padStart(2, "0");
    const month = monthMap[parts[1]] || "01";
    const year = parts[2];

    const [hours, minutes] = timeStr.split(":");

    const startDate = `${year}${month}${day}T${hours.padStart(
      2,
      "0"
    )}${minutes.padStart(2, "0")}00Z`;

    const endHour = String(parseInt(hours) + 2).padStart(2, "0");
    const endDate = `${year}${month}${day}T${endHour}${minutes.padStart(
      2,
      "0"
    )}00Z`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${startDate}/${endDate}`,
      details: `${event.description}\n\nLokasyon: ${event.location}`,
      location: event.location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-gray-50 relative"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(209, 213, 219, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(209, 213, 219, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      >
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-red-900/90 to-orange-900/80 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Edirne Etkinlik <br /> Takvimi
            </h1>
            <p className="text-2xl font-bold text-orange-300/90 max-w-2xl mx-auto">
              "Kadim Şehrin Rotası"
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 -mt-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-2 flex gap-2">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white shadow-lg shadow-slate-500/30"
                  : "text-gray-600 hover:bg-gray-100/70"
              }`}
            >
              📅 Yaklaşan Etkinlikler ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white shadow-lg shadow-slate-500/30"
                  : "text-gray-600 hover:bg-gray-100/70"
              }`}
            >
              ⏱️ Geçmiş Etkinlikler ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                <input
                  type="text"
                  placeholder="Etkinlik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-black pl-12 pr-4 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-slate-700 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? `${cat.color} text-white shadow-lg shadow-black/20 scale-105`
                        : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Etkinlik Bulunamadı
              </h3>
              <p className="text-gray-600">
                Arama kriterlerinize uygun etkinlik bulunmamaktadır.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const badge = getCategoryBadge(event.category);
                return (
                  <div
                    key={event.id}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50 hover:border-slate-300"
                  >
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`${badge.color} px-3 py-1 rounded-full text-xs font-semibold`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      {activeTab === "past" && (
                        <div className="absolute top-4 right-4 bg-gray-800/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Tamamlandı
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-slate-700" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-slate-700" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-slate-700" />
                          {event.location}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {activeTab === "upcoming" && (
                          <a
                            href={createGoogleCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white border-2 border-slate-700 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                          >
                            <Calendar className="w-4 h-4" />
                            Takvime Ekle
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="w-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 hover:from-slate-900 hover:via-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-slate-800/30"
                        >
                          Detayları Gör
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Footer />

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              <div className="relative h-56">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-t-3xl" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <span className="text-xl text-gray-800">×</span>
                </button>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`${
                      getCategoryBadge(selectedEvent.category).color
                    } px-3 py-1.5 rounded-full text-xs font-semibold`}
                  >
                    {getCategoryBadge(selectedEvent.category).label}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Event Info Grid */}
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-slate-700" />
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Tarih
                      </span>
                    </div>
                    <p className="text-slate-900 font-semibold text-sm">
                      {selectedEvent.date}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-700" />
                      <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                        Saat
                      </span>
                    </div>
                    <p className="text-orange-900 font-semibold text-sm">
                      {selectedEvent.time}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-red-700" />
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                        Konum
                      </span>
                    </div>
                    <p className="text-red-900 font-semibold text-xs">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    Etkinlik Detayları
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Additional Info based on category */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-lg">ℹ️</span>
                    Önemli Bilgiler
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {selectedEvent.category === "spor" && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>
                            Etkinlik ücretsizdir, ancak bazı özel alanlar için
                            bilet gerekebilir.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>
                            Güncel hava durumuna göre etkinlik saatleri
                            değişebilir.
                          </span>
                        </li>
                      </>
                    )}
                    {selectedEvent.category === "kultur" && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>Tören ve kutlamalar halka açıktır.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>
                            Resmi protokol ve vatandaşlar katılabilir.
                          </span>
                        </li>
                      </>
                    )}
                    {selectedEvent.category === "sanat" && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">•</span>
                          <span>
                            Etkinlik öncesi bilet satışı yapılmaktadır.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">•</span>
                          <span>
                            Erken rezervasyon önerilir, kontenjan sınırlıdır.
                          </span>
                        </li>
                      </>
                    )}
                    {selectedEvent.category === "gastronomi" && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span>
                            Tadım seansları ve workshop'lar düzenlenecektir.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span>Yerel lezzetleri deneme fırsatı.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {activeTab === "upcoming" && (
                    <a
                      href={createGoogleCalendarUrl(selectedEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white border-2 border-slate-700 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <Calendar className="w-4 h-4" />
                      Takvime Ekle
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 hover:from-slate-900 hover:via-slate-800 hover:to-slate-900 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-slate-800/30"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
