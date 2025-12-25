"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { login as loginApi } from "@/utils/api/auth";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  MapPin,
  Landmark,
  Route,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const hiddenSpots = [
  {
    id: 1,
    name: "Saroz Körfezi",
    desc: "Sakin koylarıyla Edirne'nin gizli sahili.",
    icon: "🏖️",
    color: "from-blue-500 to-cyan-500",
    image: "saroz.jpg",
  },
  {
    id: 2,
    name: "Gala Gölü Milli Parkı",
    desc: "Kuş sesleriyle dolu doğa rotası.",
    icon: "🦢",
    color: "from-emerald-500 to-teal-500",
    image: "galagolu.png",
  },
  {
    id: 3,
    name: "Enez Antik Kenti",
    desc: "Tarihle iç içe deniz manzarası.",
    icon: "🏛️",
    color: "from-amber-500 to-orange-500",
    image: "enezkalesi.jpg",
  },
  {
    id: 4,
    name: "Batık Gemiler (Saroz)",
    desc: "Dalgıçlar için büyüleyici su altı dünyası.",
    icon: "⚓",
    color: "from-indigo-500 to-purple-500",
    image: "batikgemi.jpg",
  },
  {
    id: 5,
    name: "Meriç Nehri Kıyısı",
    desc: "Doğanın sesiyle huzurlu yürüyüş rotası.",
    icon: "🌊",
    color: "from-sky-500 to-blue-500",
    image: "meric.jpg",
  },
  {
    id: 6,
    name: "Lavanta Bahçeleri ",
    desc: "Mor tarlalar içinde fotoğraf molası.",
    icon: "🏘️",
    color: "from-rose-500 to-pink-500",
    image: "lavanta2.jpg",
  },
];

export default function EnhancedLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  // Navigation handlers
  const handleRegisterRedirect = () => {
    window.location.href = "/auth/register";
  };
  const handleHomeRedirect = () => {
    window.location.href = "/";
  };
  const handleLoginRedirect = () => {
    window.location.href = "/auth/login";
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [currentSpot, setCurrentSpot] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpot((prev) => (prev + 1) % hiddenSpots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginApi(formData.email, formData.password);
      if (result.status === 200) {
        // Başarılı giriş
        login({ id: "1", name: formData.email, email: formData.email }); // id ve name backend'den gelirse güncellenmeli
        localStorage.removeItem("characterModalShown");
        setIsLoading(false);
        router.push("/");
      } else {
        setError(result.message || "Giriş başarısız!");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const nextSpot = () => {
    setCurrentSpot((prev) => (prev + 1) % hiddenSpots.length);
  };

  const prevSpot = () => {
    setCurrentSpot(
      (prev) => (prev - 1 + hiddenSpots.length) % hiddenSpots.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"></div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Back Button */}
      <button
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200 shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 group"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-4 w-4 text-slate-700 group-hover:text-indigo-600 transition-colors" />
        <span className="text-slate-700 font-medium text-sm">Ana Sayfa</span>
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Animated Carousel */}
          <div className="hidden lg:block space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 via-red-300 to-red-200 bg-clip-text text-transparent">
                Edirne'nin Gizli Rotaları
              </h1>
              <h2 className="text-4xl font-black bg-gradient-to-r from-red-600 via-red-300 to-red-900 bg-clip-text text-transparent"></h2>
              <p className="text-slate-600 text-lg">
                Keşfedilmemiş güzellikleri sizin için derledik
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSpot * 100}%)` }}
                >
                  {hiddenSpots.map((spot) => (
                    <div key={spot.id} className="min-w-full px-2">
                      <div
                        className={
                          "p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center bg-white"
                        }
                      >
                        {/* Spot Image */}
                        <img
                          src={`/assets/images/login/${spot.image}`}
                          alt={spot.name}
                          className="w-full max-w-[480px] h-66 object-cover rounded-2xl mb-2 border-2 border-slate-200 shadow-lg"
                          style={{ background: "#f3f4f6" }}
                        />

                        <div className="relative z-10 text-center">
                          <div className="text-2xl mb-2">{spot.icon}</div>
                          <h3 className="text-xl font-bold mb-2 text-slate-800">
                            {spot.name}
                          </h3>
                          <p className="text-slate-600 text-base leading-relaxed">
                            {spot.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevSpot}
                  className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-700" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {hiddenSpots.map((spot, index) => (
                    <button
                      key={spot.id}
                      onClick={() => setCurrentSpot(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSpot
                          ? "w-8 h-3 bg-gray-600"
                          : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSpot}
                  className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ChevronRight className="h-5 w-5 text-slate-700" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gray-600 to-red-300 transition-all duration-300"
                  style={{
                    width: `${((currentSpot + 1) / hiddenSpots.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Title */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Edirne Rota
              </h1>
              <p className="text-slate-600 font-semibold">
                Gizli rotaları keşfedin
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden pt-0">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-300 p-3 text-center">
                <h3 className="text-xl font-bold text-white mb-1">
                  Hoş Geldiniz
                </h3>
                <p className="text-[#FFFFFA] text-s font-semibold">
                  Rotalarınıza devam edin
                </p>
              </div>

              <div className="p-8">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          focusedField === "email"
                            ? "text-red-600"
                            : "text-slate-400"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-gray-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                        placeholder="e-posta adresinizi giriniz"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          focusedField === "password"
                            ? "text-red-600"
                            : "text-slate-400"
                        }`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-gray-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                        placeholder="sifrenizi giriniz"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-white-400 to-red-600 hover:from-red-500 hover:to-white-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none mt-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Giriş Yapılıyor...
                      </div>
                    ) : (
                      "Giriş Yap"
                    )}
                  </button>
                </div>

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-slate-600 text-sm mb-2">
                    Hesabınız yok mu?
                  </p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 scale-105 font-bold text-sm transition-colors duration-300"
                    onClick={handleRegisterRedirect}
                  >
                    Yeni Hesap Oluştur
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-4 text-center text-slate-500 text-xs">
              <button
                className="hover:text-slate-700 transition-colors"
                onClick={() => router.push("/auth/forgot-password")}
              >
                Şifremi Unuttum
              </button>
              <span className="mx-2">•</span>
              <button className="hover:text-slate-700 transition-colors">
                Yardım
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
