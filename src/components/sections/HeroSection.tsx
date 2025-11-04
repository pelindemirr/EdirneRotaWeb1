"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Navigation } from "lucide-react";

const heroImages = {
  meric: "/assets/images/herosection/meric.jpg",
  selimiye: "/assets/images/herosection/selimiye.jpg",
  mecidiye: "/assets/images/herosection/mecidiye.jpg",
};

const HeroSection = () => {
  const isLoggedIn = false; // Demo için
  const user = { name: "Kullanıcı" };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRouteIcon, setShowRouteIcon] = useState(false);

  const slides = [
    {
      id: 1,
      image: heroImages.meric,
      title: isLoggedIn ? `Hoş Geldin, ${user?.name}!` : "Edirne'yi Keşfet",
      subtitle: isLoggedIn
        ? "Yeni rotalar seni bekliyor"
        : "Tarihi güzellikleri keşfet",
      location: "Meriç Nehri",
      position: "left", // Sol tarafa yerleştir
    },
    {
      id: 2,
      image: heroImages.selimiye,
      title: isLoggedIn ? "Maceraya Devam Et" : "Mimar Sinan'ın Başyapıtı",
      subtitle: isLoggedIn
        ? "Keşfetmeye devam et"
        : "Selimiye Camii'ni ziyaret et",
      location: "Selimiye Camii",
      position: "right",
    },
    {
      id: 3,
      image: heroImages.mecidiye,
      title: isLoggedIn
        ? "Keşfetmeye Devam Et"
        : "Mecidiye Sahilinin Güzelliklerine Kapıl",
      subtitle: isLoggedIn
        ? "Yeni yerler seni çağırıyor"
        : "Mecidiye sahilinin büyüsüne kapıl",
      location: "Mecidiye",
      position: "center",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowRouteIcon(true);

    // Rota simgesini göster
    setTimeout(() => {
      setCurrentSlide(newIndex);
    }, 400);

    // Rota simgesini gizle ve transition'ı bitir
    setTimeout(() => {
      setShowRouteIcon(false);
      setIsTransitioning(false);
    }, 800);
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  };

  // Position'a göre content alignment
  const getPositionClasses = (position: string) => {
    switch (position) {
      case "left":
        return "items-center justify-start md:pl-16 lg:pl-24";
      case "right":
        return "items-center justify-end md:pr-16 lg:pr-24";
      case "center":
      default:
        return "items-center justify-center";
    }
  };

  const getTextAlignment = (position: string) => {
    switch (position) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      case "center":
      default:
        return "text-center";
    }
  };

  return (
    <section className="relative mb-8">
      <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-xl">
        <div className="w-full mx-auto h-full relative">
          {/* Slider Images with Ken Burns Effect and Text Overlay */}
          <div className="relative h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center relative transition-transform duration-[8000ms] ease-out"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transform:
                      index === currentSlide ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {/* Gradient Overlay - Pozisyona göre */}
                  <div
                    className={`absolute inset-0 ${
                      slide.position === "left"
                        ? "bg-gradient-to-r from-black/50 via-black/20 to-transparent"
                        : slide.position === "right"
                        ? "bg-gradient-to-l from-black/60 via-black/30 to-transparent"
                        : "bg-gradient-to-b from-black/40 via-black/20 to-black/40"
                    }`}
                  ></div>

                  {/* Text Overlay on Image */}
                  <div
                    className={`absolute inset-0 flex ${getPositionClasses(
                      slide.position
                    )}`}
                  >
                    <div
                      className={`${getTextAlignment(
                        slide.position
                      )} text-white max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full`}
                    >
                      {/*
                   
                      */}
                    </div>
                    {/* Bottom Right Icon Row  */}
                    <div className="absolute bottom-6 right-20 flex gap-8 items-end z-20">
                      <div className="flex flex-row gap-8 bg-black/30 rounded-2xl px-6 py-3 backdrop-blur-md shadow-lg">
                        <button
                          className="flex flex-col items-center group"
                          title="Kütüphane"
                        >
                          <span className="text-2xl mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <rect
                                x="6"
                                y="4"
                                width="12"
                                height="16"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <line
                                x1="12"
                                y1="4"
                                x2="12"
                                y2="20"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                          <span className="text-xs font-bold tracking-wide text-gray-200 group-hover:text-white">
                            TARİH
                          </span>
                          <span className="block w-8 h-1 bg-gray-400 mt-1 rounded-full"></span>
                        </button>
                        <button
                          className="flex flex-col items-center group"
                          title="Rotalar"
                        >
                          <span className="text-2xl mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <circle
                                cx="6"
                                cy="18"
                                r="3"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <circle
                                cx="18"
                                cy="6"
                                r="3"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <line
                                x1="6"
                                y1="18"
                                x2="18"
                                y2="6"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                          <span className="text-xs font-bold tracking-wide text-gray-200 group-hover:text-white">
                            ROTA
                          </span>
                          <span className="block w-8 h-1 bg-gray-400 mt-1 rounded-full"></span>
                        </button>
                        <button
                          className="flex flex-col items-center group"
                          title="Etkinlik"
                        >
                          <span className="text-2xl mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <rect
                                x="3"
                                y="8"
                                width="18"
                                height="13"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="5"
                                rx="1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                            </svg>
                          </span>
                          <span className="text-xs font-bold tracking-wide text-gray-200 group-hover:text-white">
                            ETKİNLİK
                          </span>
                          <span className="block w-8 h-1 bg-gray-400 mt-1 rounded-full"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Route Icon Animation - Geçişlerde görünür */}
          <div>
            <div className="relative">
              {/* Pulsing Background */}
              <div className="absolute inset-0 bg-orange-500/30 rounded-full animate-ping"></div>

              {/* Icon Container */}
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-6 sm:p-8 rounded-full shadow-2xl">
                <Navigation
                  size={40}
                  className="sm:w-12 sm:h-12 text-white animate-spin"
                  style={{ animationDuration: "2s" }}
                />
              </div>

              <div
                className="absolute -bottom-8 -right-8 w-24 h-24 border-2 border-dashed border-red-400/50 rounded-full animate-spin"
                style={{
                  animationDuration: "4s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
          </div>

          {/* Navigation Arrows - Modern Style - Responsive */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed z-20 group"
          >
            <ChevronLeft
              size={20}
              className="sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform"
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed z-20 group"
          >
            <ChevronRight
              size={20}
              className="sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Progress Bar Indicator - Responsive */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 sm:gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  disabled={isTransitioning}
                  className="group relative disabled:cursor-not-allowed"
                >
                  {/* Background Track */}
                  <div className="w-10 sm:w-12 md:w-16 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Progress Fill */}
                    <div
                      className={`h-full bg-orange-500 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-full duration-[5000ms] ease-linear"
                          : "w-0 duration-300"
                      }`}
                    ></div>
                  </div>

                  {/* Hover Tooltip - Hidden on mobile */}
                  <div className="hidden sm:block absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                      {slides[index].location}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Slide Counter - Responsive */}
          <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-black/30 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 z-20">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
