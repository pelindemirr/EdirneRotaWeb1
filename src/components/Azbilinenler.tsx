"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";

const HiddenGemsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  const hiddenGems = [
    {
      id: 1,
      title: "Pavli Panayırı",
      description:
        "Tarihi Yunanlı mahallesinde gizlenmiş nostaljik panayır alanı. Yılın belirli günlerinde canlanır ve yerel halkın buluşma noktası olur.",
      location: "Kaleiçi Mahallesi",
      image: "/assets/images/azbilinenler/pavli.png",
    },
    {
      id: 2,
      title: "Bocuk Gecesi",
      description:
        "Trakya'nın en eski Balkan geleneklerinden biri olan Bocuk Gecesi, kışın en soğuk anını simgeler. Kabak tatlısı ve korku dolu eğlence!",
      location: "Keşan/Çamlıca",
      image: "/assets/images/upcoming/bocuk.png",
    },
    {
      id: 3,
      title: "Gala Gölü Milli Parkı",
      description: "Kuş sesleriyle dolu doğa rotası.",
      location: "Gala/Enez",
      image: "/assets/images/login/galagolu.png",
    },
    {
      id: 4,
      title: "Enez Antik Kenti",
      description: "Tarihle iç içe deniz manzarası.",
      location: "Enez",
      image: "/assets/images/login/enezkalesi.jpg",
    },

    {
      id: 5,
      title: "Batık Gemiler (Saroz)",
      description: "Dalgıçlar için büyüleyici su altı dünyası.",
      location: "Saroz",
      image: "/assets/images/login/batikgemi.jpg",
    },
    {
      id: 6,
      title: "Trakya Fest",
      description: "Eğlenmek ve yazın tadını çıkarmak için müzik festivali.",
      location: "Danışment ",
      image: "/assets/images/azbilinenler/trakyafest.jpg",
    },
  ];

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
      prev + itemsToShow >= hiddenGems.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, hiddenGems.length - itemsToShow) : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-red-500/20 backdrop-blur-sm text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-red-500/30">
            Gizli Hazineler
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-red-400 mb-6 leading-tight">
            Edirne'nin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
              Bilinmeyen Güzellikleri
            </span>
          </h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Rehberlerin göstermediği, sadece bizim bildiği özel yerler
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white text-black p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-gray-300 group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white text-black  p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-gray-300 group"
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
              {hiddenGems.map((gem) => (
                <div
                  key={gem.id}
                  className="flex-shrink-0 px-2 md:px-4 py-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-red-400 transition-all duration-500 hover:scale-103 hover:shadow hover:shadow-red-500/20 h-full z-10 hover:z-30"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <div
                        className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundImage: `url('${gem.image}')`,
                        }}
                      />
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="mb-3">
                        <span className="block font-bold text-s md:text-2xl text-gray-900 ">
                          {gem.title}
                        </span>
                      </div>
                      <p className="text-gray-500 mb-4 leading-relaxed text-sm line-clamp-3">
                        {gem.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 text-xs md:text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          {gem.location}
                        </span>
                        <button className="text-red-400 hover:text-red-300 font-semibold text-xs md:text-sm flex items-center group/btn">
                          Keşfet
                          <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2 relative z-20">
            {Array.from({
              length: Math.ceil(hiddenGems.length / itemsToShow),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / itemsToShow) === index
                    ? "w-8 h-2 bg-red-500"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tüm Gizli Yerleri Gör */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-red-500/50 flex items-center mx-auto gap-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            Tüm Gizli Yerleri Keşfet
            <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HiddenGemsSlider;
