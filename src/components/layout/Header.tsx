"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  LogOut,
  ChevronDown,
  Bookmark,
  Camera,
  Menu,
  X,
  LogIn,
  DollarSign,
  UserPlus,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import CharacterSelectModal from "../CharacterSelectModal";
function Header() {
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [showRouteButton, setShowRouteButton] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [eurToTry, setEurToTry] = useState<string>("...");
  const [weather, setWeather] = useState<{
    temp: number;
    desc: string;
    icon: string;
    city: string;
  } | null>(null);
  const { isLoggedIn, user, logout, isFirstLogin } = useAuth();

  // ECB API'sinden EUR/TRY kurunu çek
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("/api/exchange-rate");
        const data = await response.json();

        if (data.rate) {
          setEurToTry(data.rate);
        } else {
          setEurToTry("--");
        }
      } catch (error) {
        console.error("Döviz kuru alınamadı:", error);
        setEurToTry("--");
      }
    };

    fetchExchangeRate();
    // Her 1 saatte bir güncelle
    const interval = setInterval(fetchExchangeRate, 3600000);
    return () => clearInterval(interval);
  }, []);

  // localStorage'dan karakter tipini oku
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCharacter = localStorage.getItem("selectedCharacter");
      if (savedCharacter) {
        setSelectedCharacter(savedCharacter);
      }
    }
  }, []);

  // Show character modal only once after login
  useEffect(() => {
    if (isLoggedIn && typeof window !== "undefined") {
      const alreadyShown = localStorage.getItem("characterModalShown");
      if (!alreadyShown) {
        setShowCharacterModal(true);
        localStorage.setItem("characterModalShown", "true");
      }
    }
  }, [isLoggedIn]);

  // Hava durumu verisini çek
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        const data = await response.json();
        if (data.temp) {
          setWeather(data);
        } else {
          setWeather(null);
        }
      } catch (error) {
        setWeather(null);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 7200000); // 2 saatte bir güncelle
    return () => clearInterval(interval);
  }, []);

  const handleCharacterSelect = (type: string) => {
    setSelectedCharacter(type);
    setShowRouteButton(true);
    // localStorage'a kaydet
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCharacter", type);
    }
  };

  const handleShowRoute = () => {
    setShowCharacterModal(false);
    setShowRouteButton(false);
    // Burada karakter tipine göre rota önerisi gösterilebilir veya yönlendirme yapılabilir
  };
  const pathname = usePathname();
  const rotaPlanlaHref = isLoggedIn ? "/rota-planla" : "/rota-planla/guest";
  const isActive = (href: string) => {
    if (href === "/rota-planla" && pathname.startsWith("/rota-planla"))
      return true;
    return pathname === href;
  };
  return (
    <>
      {/* Character Selection Modal */}
      {showCharacterModal && (
        <CharacterSelectModal
          selectedCharacter={selectedCharacter}
          onSelect={handleCharacterSelect}
          onShowRoute={handleShowRoute}
          showRouteButton={showRouteButton}
        />
      )}
      <header
        className={`bg-white shadow-lg sticky top-0 z-50 border-b border-red-100 ${
          showCharacterModal ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
              >
                <div className="relative scale-150 group-hover:scale-[1.35] transition-transform duration-300 ">
                  <Image
                    src="/assets/images/logoirems.png"
                    alt="Edirne Rota Logo"
                    width={90}
                    height={90}
                    className="w-20 h-20"
                    priority
                  />
                </div>
              </a>
            </div>

            <nav className="hidden lg:flex items-center space-x-10">
              <a
                href={rotaPlanlaHref}
                className={`transition-all duration-300 font-semibold text-lg hover:scale-105 relative group px-2 py-1 rounded-lg ${
                  isActive(rotaPlanlaHref)
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                Rota Planla
                {isActive(rotaPlanlaHref) && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full"></span>
                )}
              </a>
              <a
                href="/kesfet"
                className={`transition-all duration-300 font-semibold text-lg hover:scale-105 relative group px-2 py-1 rounded-lg ${
                  isActive("/kesfet")
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                Keşfet
                {isActive("/kesfet") && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full"></span>
                )}
              </a>
              <a
                href="/etkinlikler"
                className={`transition-all duration-300 font-semibold text-lg hover:scale-105 relative group px-2 py-1 rounded-lg ${
                  isActive("/etkinlikler")
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                Etkinlikler
                {isActive("/etkinlikler") && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full"></span>
                )}
              </a>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-red-200 h-13 min-w-[100px] items-center">
                  <span className="text-sm font-bold">€1 =</span>
                  <span className="font-bold text-lg text-gray-600">
                    ₺{eurToTry}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-red-200 h-13 items-center">
                  {/* Hava durumu iconu ve derece */}
                  {weather ? (
                    <>
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-gray-300 shadow-lg mr-2">
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                          alt={weather.desc}
                          className="h-10 w-10"
                          title={weather.desc}
                        />
                      </span>
                      <span className="font-semibold text-lg">
                        {weather.temp}°C
                      </span>
                      <span className="text-xs text-red-600 font-semibold">
                        {weather.city}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-yellow-300 shadow-lg mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="5" fill="#FACC15" />
                        </svg>
                      </span>
                      <span className="font-semibold text-lg">--°C</span>
                      <span className="text-xs text-gray-500 font-semibold">
                        Edirne
                      </span>
                    </>
                  )}
                </div>
              </div>

              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                    {selectedCharacter && (
                      <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-xs font-semibold text-gray-700 border border-gray-200">
                        {selectedCharacter}
                      </span>
                    )}
                    <ChevronDown size={16} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-white text-black rounded-xl shadow-xl border border-red-200 py-2 z-50 flex flex-col items-center">
                      <div className="px-3 py-3 w-full text-center">
                        <p className="font-bold text-red-600">Hoşgeldiniz</p>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="w-5/6 text-left px-4 py-2 hover:bg-red-100 flex items-center space-x-3 rounded-lg"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Profilim</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="w-5/6 text-left px-4 py-2 hover:bg-red-100 flex items-center space-x-3  rounded-lg"
                      >
                        <Bookmark className="w-4 h-4 text-gray-500" />
                        <span>Favori Yerler</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="w-5/6 text-left px-4 py-2 hover:bg-red-100 flex items-center space-x-3 rounded-lg"
                      >
                        <Camera className="w-4 h-4 text-gray-500" />
                        <span>Fotoğraf Galerim</span>
                      </Link>
                      <div className=" mt-2 pt-2 w-5/6">
                        <button
                          onClick={logout}
                          className=" border bg-red-500 w-full text-center font-bold px-4 py-2 hover:bg-red-400 text-[#FFFFFF] rounded-lg"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-5">
                  <Link
                    href="/auth/login"
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <LogIn size={18} />
                    <span>Giriş</span>
                  </Link>
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-700 hover:bg-red-50 hover:text-red-600 p-3 rounded-xl transition-all duration-300"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-6 pb-6 border-t border-red-100 pt-6">
              <nav className="flex flex-col space-y-6">
                <a
                  href="/rota-planla"
                  className="text-gray-700 hover:text-red-600 transition-colors font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-50"
                >
                  Rota Planla
                </a>
                <a
                  href="/kesfet"
                  className="text-gray-700 hover:text-red-600 transition-colors font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-50"
                >
                  Keşfet
                </a>
                <a
                  href="/etkinlikler"
                  className="text-gray-700 hover:text-red-600 transition-colors font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-50"
                >
                  Etkinlikler
                </a>

                <div className="flex flex-col space-y-3 pt-4">
                  <Link
                    href="/auth/login"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 w-full shadow-lg hover:shadow-xl text-center"
                  >
                    Giriş Yap
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
