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
function Header() {
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [showRouteButton, setShowRouteButton] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout, isFirstLogin } = useAuth();
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

  const handleCharacterSelect = (type: string) => {
    setSelectedCharacter(type);
    setShowRouteButton(true);
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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {/* Blurred overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            style={{ zIndex: 1 }}
          />
          {/* Modal content */}
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-fadeIn">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 mb-4 shadow-lg">
              <span role="img" aria-label="character" className="text-3xl">
                🧭
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-red-700">
              Karakter Tipini Seç
            </h2>
            <p className="mb-6 text-gray-600 text-center">
              Sana en uygun rotayı önerebilmemiz için lütfen bir karakter tipi
              seç:
            </p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => handleCharacterSelect("Maceracı")}
                className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                  selectedCharacter === "Maceracı"
                    ? "bg-red-600 text-white border-red-700 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                Maceracı
              </button>
              <button
                onClick={() => handleCharacterSelect("Kültür Meraklısı")}
                className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                  selectedCharacter === "Kültür Meraklısı"
                    ? "bg-red-600 text-white border-red-700 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                Kültür Meraklısı
              </button>
              <button
                onClick={() => handleCharacterSelect("Gurme")}
                className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                  selectedCharacter === "Gurme"
                    ? "bg-red-600 text-white border-red-700 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                Gurme
              </button>

              <button
                onClick={() => handleCharacterSelect("Doğa Sever")}
                className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                  selectedCharacter === "Doğa Sever"
                    ? "bg-red-600 text-white border-red-700 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                Doğa Sever
              </button>
              <button
                onClick={() => handleCharacterSelect("Fotoğrafçı")}
                className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                  selectedCharacter === "Fotoğrafçı"
                    ? "bg-red-600 text-white border-red-700 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                Fotoğrafçı
              </button>

              <button
                onClick={() => handleCharacterSelect("Sanatsever")}
                className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                  selectedCharacter === "Sanatsever"
                    ? "bg-red-600 text-white border-red-700 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                Sanatsever
              </button>
            </div>
            {showRouteButton && (
              <button
                onClick={handleShowRoute}
                className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold shadow-lg hover:from-red-700 hover:to-yellow-600 transition text-lg"
              >
                Rota Gör
              </button>
            )}
          </div>
        </div>
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
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/assets/images/logo1.png"
                    alt="Edirne Rota Logo"
                    width={48}
                    height={48}
                    className="w-20 h-20 "
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
              <a
                href="/iletisim"
                className={`transition-all duration-300 font-semibold text-lg hover:scale-105 relative group px-2 py-1 rounded-lg ${
                  isActive("/iletisim")
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                İletişim
                {isActive("/iletisim") && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full"></span>
                )}
              </a>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <DollarSign size={16} />
                  <span className="font-semibold">₺</span>
                  <span className="font-bold">1 = £2.50</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  {/* Hava durumu iconu ve derece */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="5" fill="#FACC15" />
                  </svg>
                  <span className="font-semibold">22°C</span>
                  <span className="text-xs text-gray-500">Edirne</span>
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
                      <button className="w-5/6 text-left px-4 py-2 hover:bg-red-100 flex items-center space-x-3  rounded-lg">
                        <Bookmark className="w-4 h-4 text-gray-500" />
                        <span>Favori Yerler</span>
                      </button>
                      <button className="w-5/6 text-left px-4 py-2 hover:bg-red-100 flex items-center space-x-3 rounded-lg">
                        <Camera className="w-4 h-4 text-gray-500" />
                        <span>Fotoğraf Galerim</span>
                      </button>
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
                <a
                  href="/iletisim"
                  className="text-gray-700 hover:text-red-600 transition-colors font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-50"
                >
                  İletişim
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
