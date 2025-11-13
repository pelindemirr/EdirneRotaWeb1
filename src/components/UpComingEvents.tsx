"use client";
import React, { useState, useRef, useEffect } from "react";
import { Clock, MapPin, Award, ChevronLeft, ChevronRight } from "lucide-react";

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

  const rawEvents = [
    {
      id: 1,
      category: "kultur",
      eventDate: "2025-11-25", // 25 Kasım 2025
      date: { day: "25", month: "KAS" },
      icon: "🌟",
      title: "Edirne'nin Kurtuluşu Töreni",
      subtitle: "Resmi Tören",
      description:
        "Edirne'nin düşman işgalinden kurtuluşunun yıl dönümü. Belediye tarafından düzenlenen resmi tören, anma etkinlikleri ve konserler.",
      dateRange: "25 Kasım 2025",
      location: "Selimiye Camii ve Atatürk Anıtı",
      image: "/assets/images/upcoming/kurtulus.png",
    },
    {
      id: 2,
      category: "kultur",
      eventDate: "2026-01-26", // 26 Ocak 2026
      date: { day: "26", month: "OCA" },
      icon: "🎃",
      title: "Bocuk Gecesi",
      subtitle: "Geleneksel Kutlama",
      description:
        "Trakya'nın en eski Balkan geleneklerinden biri olan Bocuk Gecesi, kışın en soğuk anını simgeler. 'Bocuk' adlı kötücül varlıktan korunmak için evlerde mutlaka kabak tatlısı pişirilir. Gecenin en eğlenceli anı ise beyaz çarşaflar giyip yüzlerini boyayan gençlerin, kapıları çalarak köylüleri tatlı bir korkuyla korkutmasıdır. Bin yıllık bu gelenek, Keşan Çamlıca'da bir kış festivali coşkusuyla yaşatılır.",
      dateRange: "25-26 Ocak 2026",
      location: "Keşan, Çamlıca Köyü",
      image: "/assets/images/upcoming/bocuk.png", // Yerel: Bocuk Gecesi
    },
    {
      id: 3,
      category: "kultur",
      eventDate: "2026 05-10", // 10 Mayıs 2025
      date: { day: "5", month: "MAY" },
      icon: "🎪",
      title: "Kakava Şenliği",
      subtitle: "Roman Kültürü",
      description:
        "Roman halkının geleneksel bahar bayramı. Renkli kostümler, müzik, dans gösterileri ve kültürel etkinlikler. Sarayiçi'nde coşkulu kutlamalar.",
      dateRange: "10-11 Mayıs 2026",
      location: "Sarayiçi Mevkii",
      image: "/assets/images/upcoming/kakava.jpg", // Yerel: Kakava Şenliği
    },
    {
      id: 4,
      category: "spor",
      eventDate: "2026-06-28", // 28 Haziran 2025
      date: { day: "28", month: "HAZ" },
      icon: "🤼",
      title: "Kırkpınar Yağlı Güreşleri",
      subtitle: "660. Yıl Özel",
      description:
        "Dünyanın en eski spor organizasyonu. 3 gün sürecek güreş müsabakaları, kültür etkinlikleri ve özel gösteriler.",
      dateRange: "28-30 Haziran 2026",
      location: "Sarayiçi / Kırkpınar Meydanı",
      image: "/assets/images/upcoming/kirkpinar.jpg", // Yerel: Kırkpınar Yağlı Güreşleri
    },
    {
      id: 5,
      category: "spor",
      eventDate: "2025-11-16", // 16 Kasım 2025
      date: { day: "16", month: "KAS" },
      icon: "⚽",
      title: "Edirnespor vs 1926 Polatlı Belediye Spor",
      subtitle: "Futbol Maçı",
      description:
        "Edirnespor'un 3. Lig normal sezonunda 1926 Polatlı Belediye Spor ile karşılaşacağı önemli iç saha maçı. Tüm Edirne halkı davetlidir.",
      dateRange: "16 Kasım 2025, 15:00",
      location: "İç Saha (Edirne)",
      image: "/assets/images/upcoming/mac.png",
    },
    {
      id: 6,
      category: "sanat",
      eventDate: "2025-11-10", // 10 Kasım 2025
      date: { day: "10", month: "KAS" },
      icon: "🎭",
      title: "ATA'YA SAYGI Sergisi",
      subtitle: "Sergi",
      description:
        "Edirneli sanatkar Radife OT, geleneksel Sim Sırma Sanatı'nı (Divai İşi tekniğiyle) kullanarak, geçmişimizin izlerini ve Ulu Önder Mustafa Kemal Atatürk'e duyulan sonsuz minnettarlığı bir araya getiriyor. Sanat, emek ve vefanın buluştuğu bu özel sergi, derin bir saygı duruşudur.",
      dateRange: "10-14 Kasım 2025",
      location: "Devecihan Kültür Merkezi Hayri Çizel Sergi Salonu",
      image: "/assets/images/upcoming/sergi.png", // Yerel: Ata'ya Saygı Sergisi
    },
    {
      id: 8,
      category: "sanat",
      eventDate: "2025-11-18", // 18 Kasım 2025
      date: { day: "18", month: "KAS" },
      icon: "📸",
      title: "Edirne Çarşılarına Fotoğraflarla Sosyolojik Bakış",
      subtitle: "Fotoğraf Sergisi",
      description:
        "Edirne Belediyesi'nin düzenlediği özel fotoğraf sergisi. Edirne'nin tarihi çarşılarının sosyolojik açıdan incelendiği, fotoğraflarla belgelendiği bu sergi, şehrin kültürel dokusunu yansıtıyor.",
      dateRange: "18 Kasım 2025",
      location: "Atatürk Kültür Merkezi",
      image: "/assets/images/upcoming/sergibelediye.png", // Görsel daha sonra eklenecek
    },
    {
      id: 9,
      category: "sanat",
      eventDate: "2025-11-13", // 13 Kasım 2025 (Çarşamba)
      date: { day: "13", month: "KAS" },
      icon: "🎨",
      title: "Obje Boyama Atölyesi",
      subtitle: "Atölye - Hafta İçi",
      description:
        "Her gün 16:00-18:00 arası düzenlenen yaratıcı obje boyama atölyesi. Öğrencilere özel 50 TL indirim fırsatıyla! Sanatsal yeteneğinizi keşfedin ve eğlenceli vakit geçirin.",
      dateRange: "Her Gün 16:00-18:00 (Hafta İçi)",
      location: "Edirne Oda Sahnesi",
      image: "/assets/images/upcoming/objeatolyesii.jpeg", // Görsel daha sonra eklenecek
      note: "🎓 Öğrencilere 50 TL İndirim",
    },
    {
      id: 10,
      category: "sanat",
      eventDate: "2025-11-16", // 16 Kasım 2025 (Cumartesi)
      date: { day: "16", month: "KAS" },
      icon: "🎨",
      title: "Obje Boyama Atölyesi",
      subtitle: "Atölye - Hafta Sonu",
      description:
        "Cumartesi ve Pazar günleri 14:00-18:00 arası düzenlenen yaratıcı obje boyama atölyesi. Hafta sonu ailenizle veya arkadaşlarınızla keyifli saatler geçirin. Öğrencilere özel 50 TL indirim!",
      dateRange: "Cumartesi & Pazar 14:00-18:00",
      location: "Edirne Oda Sahnesi",
      image: "/assets/images/upcoming/objeatolyesii.jpeg", // Görsel daha sonra eklenecek
      note: "🎓 Öğrencilere 50 TL İndirim",
    },
    {
      id: 11,
      category: "sanat",
      eventDate: "2025-11-29", // 29 Kasım 2025
      date: { day: "29", month: "KAS" },
      icon: "🎭",
      title: "İçimizdeki Şeytan",
      subtitle: "Tiyatro Oyunu",
      description:
        "Unutulmaz bir tiyatro deneyimi için hazır olun! İçimizdeki Şeytan, insan doğasının karanlık yönlerini derinlemesine işleyen, sürükleyici bir performans sunuyor. Profesyonel oyuncu kadrosu ve etkileyici sahneleme ile unutulmaz bir akşam geçirin.",
      dateRange: "29 Kasım 2025, 19:30",
      location: "Atatürk Kültür Merkezi",
      image: "/assets/images/upcoming/icimizdekiseytan.jpeg", // Görsel daha sonra eklenecek
    },
    {
      id: 7,
      category: "gastronomi",
      eventDate: "2025-09-10", // 10 Eylül 2025
      date: { day: "10", month: "EYL" },
      icon: "🍽️",
      title: "Edirne Gastronomi Festivali",
      subtitle: "Gastronomi",
      description:
        "Edirne'nin meşhur tava ciğeri ustalarının yarıştığı lezzet festivali. Tadım standları, yarışmalar ve canlı müzik.",
      dateRange: "10-11 Eylül 2025",
      location: "Saraçlar Caddesi",
      image: "/assets/images/upcoming/gastronomi.png", // Yerel: Edirne Gastronomi Festivali
    },
  ];

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
                        {event.note && (
                          <div
                            className={`mt-2 p-2 rounded-lg ${
                              event.iconBg
                            } border-2 ${event.seasonBg
                              .replace("bg-", "border-")
                              .replace("-600", "-200")}`}
                          >
                            <p
                              className={`text-xs font-semibold ${event.iconColor} text-center`}
                            >
                              {event.note}
                            </p>
                          </div>
                        )}
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
          <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center mx-auto gap-2">
            <Award className="w-4 h-4 md:w-5 md:h-5" />
            Tüm Etkinlik Takvimi
            <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
