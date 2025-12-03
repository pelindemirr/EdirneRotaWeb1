"use client";
import React, { useState, useRef, useEffect } from "react";
import { Clock, MapPin, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { upcomingEvents as importedEvents } from "@/data/events";

const UpcomingEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  // Etkinlik kategorileri ve renkleri
  // Mor: Kültürel etkinlikler
  // Kırmızı: Spor
  // Sarı: Gastronomi
  // Yeşil: Doğa
  // Pembe: Sanat
  const categoryColors = {
    kultur: {
      // Kültürel & Tarih
      gradient: "from-purple-50 to-indigo-50",
      seasonBg: "bg-purple-600",
      countdownText: "text-purple-600",
      iconBg: "bg-purple-100",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
      buttonBorder: "border-purple-600 text-purple-600 hover:bg-purple-50",
      iconColor: "text-purple-600",
      dateColor: "bg-purple-500",
    },
    spor: {
      // Spor Etkinlikleri
      gradient: "from-red-50 to-orange-50",
      seasonBg: "bg-red-600",
      countdownText: "text-red-600",
      iconBg: "bg-red-100",
      buttonBg: "bg-red-600 hover:bg-red-700",
      buttonBorder: "border-red-600 text-red-600 hover:bg-red-50",
      iconColor: "text-red-600",
      dateColor: "bg-red-500",
    },
    gastronomi: {
      // Yemek & Gastronomi
      gradient: "from-amber-50 to-yellow-50",
      seasonBg: "bg-amber-600",
      countdownText: "text-amber-600",
      iconBg: "bg-amber-100",
      buttonBg: "bg-amber-600 hover:bg-amber-700",
      buttonBorder: "border-amber-600 text-amber-600 hover:bg-amber-50",
      iconColor: "text-amber-600",
      dateColor: "bg-amber-500",
    },
    doga: {
      // Doğa & Tarım
      gradient: "from-green-50 to-emerald-50",
      seasonBg: "bg-green-600",
      countdownText: "text-green-600",
      iconBg: "bg-green-100",
      buttonBg: "bg-green-600 hover:bg-green-700",
      buttonBorder: "border-green-600 text-green-600 hover:bg-green-50",
      iconColor: "text-green-600",
      dateColor: "bg-green-500",
    },
    sanat: {
      // Sanat & Eğlence
      gradient: "from-pink-50 to-rose-50",
      seasonBg: "bg-pink-600",
      countdownText: "text-pink-600",
      iconBg: "bg-pink-100",
      buttonBg: "bg-pink-600 hover:bg-pink-700",
      buttonBorder: "border-pink-600 text-pink-600 hover:bg-pink-50",
      iconColor: "text-pink-600",
      dateColor: "bg-pink-500",
    },
  };

  // events.ts'den gelen verileri rawEvents formatına dönüştür
  const rawEvents = importedEvents.map((event) => {
    // Tarih parse
    const [day, monthName, year] = event.date.split(" ");
    const monthMap: { [key: string]: string } = {
      Ocak: "OCA",
      Şubat: "ŞUB",
      Mart: "MAR",
      Nisan: "NIS",
      Mayıs: "MAY",
      Haziran: "HAZ",
      Temmuz: "TEM",
      Ağustos: "AGU",
      Eylül: "EYL",
      Ekim: "EKI",
      Kasım: "KAS",
      Aralık: "ARA",
    };
    const monthMapISO: { [key: string]: string } = {
      Ocak: "01",
      Şubat: "02",
      Mart: "03",
      Nisan: "04",
      Mayıs: "05",
      Haziran: "06",
      Temmuz: "07",
      Ağustos: "08",
      Eylül: "09",
      Ekim: "10",
      Kasım: "11",
      Aralık: "12",
    };

    // Icon belirleme
    const iconMap: { [key: string]: string } = {
      kultur: "🌟",
      spor: "⚽",
      gastronomi: "🍽️",
      sanat: "🎭",
    };

    return {
      id: event.id,
      category: event.category,
      eventDate: `${year}-${monthMapISO[monthName]}-${day.padStart(2, "0")}`,
      date: { day: day, month: monthMap[monthName] || "---" },
      icon: iconMap[event.category] || "📅",
      title: event.title,
      subtitle:
        event.category === "kultur"
          ? "Kültürel Etkinlik"
          : event.category === "spor"
          ? "Spor Etkinliği"
          : event.category === "gastronomi"
          ? "Gastronomi"
          : event.category === "sanat"
          ? "Sanat Etkinliği"
          : "Etkinlik",
      description: event.description,
      dateRange: `${event.date}, ${event.time}`,
      location: event.location,
      image: event.image,
    };
  });

  // Geri sayım hesaplama fonksiyonu
  const calculateCountdown = (eventDate: string) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "GEÇMİŞ ETKİNLİK";
    if (diffDays === 0) return "BUGÜN";
    if (diffDays === 1) return "YARIN";
    if (diffDays <= 7) return `${diffDays} GÜN KALDI`;
    if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} HAFTA KALDI`;
    }
    if (diffDays <= 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} AY KALDI`;
    }
    return "YAKINDA";
  };

  // Olayları tarihe göre sırala ve renk kategorilerini ekle
  const events = rawEvents
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    )
    .map((event) => ({
      ...event,
      ...categoryColors[event.category as keyof typeof categoryColors],
      countdown: calculateCountdown(event.eventDate),
    }));

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, itemsToShow]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= events.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, events.length - itemsToShow) : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 ">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-100 bg-orange-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
            Yaklaşan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
              Etkinlikler
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Edirne'de düzenlenecek özel etkinlikler ve festivaller
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white hover:bg-gray-50 text-gray-700 p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border-2 border-gray-200 shadow-lg group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white hover:bg-gray-50 text-gray-700 p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border-2 border-gray-200 shadow-lg group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Slider */}
          <div className="overflow-hidden" ref={sliderRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsToShow)
                }%)`,
              }}
            >
              {events.map((event, index: number) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 px-2 md:px-4 py-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div
                    className={`group bg-gradient-to-br ${
                      event.gradient
                    } rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 ${event.seasonBg
                      .replace("bg-", "border-")
                      .replace("-600", "-200")} hover:${event.seasonBg
                      .replace("bg-", "border-")
                      .replace("-600", "-400")} h-full flex flex-col`}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <div
                          className={`bg-white/90 backdrop-blur-sm ${event.countdownText} px-3 py-1 rounded-lg text-xs font-bold shadow-lg`}
                        >
                          ⏰ {event.countdown}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 z-10">
                        <div
                          className={`${event.dateColor} text-white w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-lg`}
                        >
                          <span className="text-2xl font-bold">
                            {event.date.day}
                          </span>
                          {event.date.month && (
                            <span className="text-xs">{event.date.month}</span>
                          )}
                        </div>
                      </div>
                      <div
                        className="h-48 md:h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url('${event.image}')` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={`w-12 h-12 ${event.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-2xl">{event.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {event.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed text-sm line-clamp-3">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock
                            className={`w-4 h-4 mr-2 ${event.iconColor}`}
                          />
                          {event.dateRange}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin
                            className={`w-4 h-4 mr-2 ${event.iconColor}`}
                          />
                          {event.location}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <button
                          className={`w-full ${event.buttonBg} text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors`}
                        >
                          Detaylar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(events.length / itemsToShow),
            }).map((_, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index * itemsToShow)}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / itemsToShow) === index
                    ? "w-8 h-2 bg-red-600"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tüm Etkinlikleri Gör */}
        <div className="text-center mt-12">
          <a href="/etkinlikler">
            <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center mx-auto gap-2">
              <Award className="w-4 h-4 md:w-5 md:h-5" />
              Tüm Etkinlik Takvimi
              <span className="ml-1">→</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
