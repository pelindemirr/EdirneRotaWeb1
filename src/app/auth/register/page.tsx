"use client";

import { useState, useEffect } from "react";
import { register as registerApi } from "@/utils/api/auth";
import { useRegisterStore } from "@/stores/registerStore";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  MapPin,
  Camera,
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

export default function EnhancedRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [currentSpot, setCurrentSpot] = useState(0);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [showKvkkModal, setShowKvkkModal] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpot((prev) => (prev + 1) % hiddenSpots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const registerStore = useRegisterStore();
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!formData.name.trim()) {
      setError("Lütfen adınızı girin!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır!");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler uyuşmuyor!");
      setIsLoading(false);
      return;
    }

    if (!kvkkAccepted) {
      setError("KVKK metnini kabul etmelisiniz!");
      setIsLoading(false);
      return;
    }

    // API'ye istek at
    try {
      const result = await registerApi(
        formData.name,
        formData.email,
        formData.password
      );
      if (result.status === 200) {
        registerStore.register(formData.name, formData.email);
        setIsLoading(false);
        router.push("/auth/login");
      } else {
        setError(result.message || "Kayıt başarısız!");
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
              <h1 className="text-5xl font-black bg-gradient-to-r from-red-600 via-red-300 to-red-200 bg-clip-text text-transparent">
                Edirne'nin
              </h1>
              <h2 className="text-4xl font-black bg-gradient-to-r from-red-600 via-red-300 to-red-900 bg-clip-text text-transparent">
                Gizli Rotaları
              </h2>
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
                  {hiddenSpots.map((spot, index) => (
                    <div key={index} className="min-w-full px-2">
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
                  onClick={() =>
                    setCurrentSpot(
                      (prev) =>
                        (prev - 1 + hiddenSpots.length) % hiddenSpots.length
                    )
                  }
                  className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-700" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {hiddenSpots.map((_, index) => (
                    <button
                      key={index}
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
                  onClick={() =>
                    setCurrentSpot((prev) => (prev + 1) % hiddenSpots.length)
                  }
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

          {/* Right Side - Register Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Title */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                Hesap Oluştur
              </h1>
              <p className="text-slate-600 font-semibold">
                Yeni maceranız başlıyor
              </p>
            </div>

            {/* Register Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-300 p-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Aramıza Katılın
                </h3>
                <p className="text-[#FFFFFA] text-sm font-semibold">
                  Ücretsiz hesap oluşturun
                </p>
              </div>

              <div className="p-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✕</span>
                    </div>
                    <span className="text-xs font-medium">{error}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-3">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Adınız Soyadınız
                    </label>
                    <div className="relative">
                      <User
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                          focusedField === "name"
                            ? "text-red-600"
                            : "text-slate-400"
                        }`}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                        placeholder="Ad Soyad"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
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
                        className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                        placeholder="E-posta giriniz"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
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
                        className="w-full pl-10 pr-10 py-2 text-sm bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                        placeholder="Şifre giriniz"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Şifre Tekrarı
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                          focusedField === "confirmPassword"
                            ? "text-red-600"
                            : "text-slate-400"
                        }`}
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField("")}
                        className="w-full pl-10 pr-10 py-2 text-sm bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                        placeholder="Şifrenizi tekrar girin"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* KVKK Checkbox */}
                  <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      id="kvkk"
                      checked={kvkkAccepted}
                      onChange={(e) => setKvkkAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-red-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-red-500 cursor-pointer"
                    />
                    <label htmlFor="kvkk" className="text-xs text-slate-700">
                      <button
                        type="button"
                        onClick={() => setShowKvkkModal(true)}
                        className="text-red-600 hover:text-red-700 font-semibold underline"
                      >
                        KVKK
                      </button>{" "}
                      metnini okudum ve kabul ediyorum.
                    </label>
                  </div>

                  {/* E-posta Bildirimi Onayı */}
                  <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                    <input
                      type="checkbox"
                      id="emailConsent"
                      checked={emailConsent}
                      onChange={(e) => setEmailConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-red-600 border-2 border-red-300 rounded focus:ring-2 focus:ring-red-500 cursor-pointer"
                    />
                    <label
                      htmlFor="emailConsent"
                      className="text-xs text-slate-700 cursor-pointer"
                    >
                      Yeni etkinlikler ve kampanyalar hakkında bilgilendirme
                      almak istiyorum.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 disabled:from-slate-400 disabled:to-slate-500 text-white py-2.5 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none mt-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Oluşturuluyor...
                      </div>
                    ) : (
                      "Hesap Oluştur"
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="mt-4 text-center">
                  <p className="text-slate-600 text-xs mb-1">
                    Zaten hesabınız var mı?
                  </p>
                  <button
                    className="text-red-600 hover:text-red-700 font-bold text-xs transition-colors duration-300"
                    onClick={() => router.push("/auth/login")}
                  >
                    Giriş Yap
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-3 text-center text-slate-500 text-[10px]">
              <button className="hover:text-slate-700 transition-colors">
                Gizlilik Politikası
              </button>
              <span className="mx-2">•</span>
              <button className="hover:text-slate-700 transition-colors">
                Kullanım Koşulları
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KVKK Modal */}
      {showKvkkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-400 p-6 text-white">
              <h3 className="text-2xl font-bold">KVKK Aydınlatma Metni</h3>
              <p className="text-sm text-red-50 mt-1">
                Kişisel Verilerin Korunması Kanunu
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="space-y-4 text-slate-700">
                <p className="text-sm leading-relaxed">
                  <strong className="text-slate-900">Veri Sorumlusu:</strong>{" "}
                  Edirne Rota Web platformu olarak, 6698 sayılı Kişisel
                  Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu
                  sıfatıyla hareket etmekteyiz.
                </p>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    1. Toplanan Kişisel Veriler
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Platformumuza üye olurken ad-soyad, e-posta adresi ve şifre
                    bilgileriniz toplanmaktadır. Ayrıca platform kullanımınız
                    sırasında rota tercihleri, favori mekanlar ve konum
                    bilgileri işlenebilir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    2. Verilerin İşlenme Amacı
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Kişisel verileriniz; hesap oluşturma, kimlik doğrulama,
                    platformun sunduğu hizmetlerden yararlanmanızı sağlama,
                    kişiselleştirilmiş rota önerileri sunma, iletişim kurma ve
                    yasal yükümlülüklerin yerine getirilmesi amaçlarıyla
                    işlenmektedir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    3. Verilerin Aktarılması
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Kişisel verileriniz, yukarıda belirtilen amaçların
                    gerçekleştirilmesi için gerekli olduğu ölçüde ve KVKK'ya
                    uygun şekilde üçüncü kişilerle paylaşılabilir. Verileriniz
                    yurt dışına aktarılmaz.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    4. Haklarınız
                  </h4>
                  <p className="text-sm leading-relaxed">
                    KVKK'nın 11. maddesi uyarınca, kişisel verilerinizin işlenip
                    işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme
                    amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme,
                    yurt içinde/dışında aktarıldığı üçüncü kişileri bilme,
                    eksik/yanlış işlenmişse düzeltilmesini isteme, ilgili
                    mevzuatta öngörülen şartlar çerçevesinde silinmesini/yok
                    edilmesini isteme, yapılan işlemlerin aktarıldığı üçüncü
                    kişilere bildirilmesini isteme, münhasıran otomatik
                    sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonuç
                    doğmasına itiraz etme ve kanuna aykırı işlenmesi sebebiyle
                    zarara uğramanız hâlinde zararın giderilmesini talep etme
                    haklarına sahipsiniz.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    5. İletişim
                  </h4>
                  <p className="text-sm leading-relaxed">
                    KVKK kapsamındaki taleplerinizi, kimlik teyidinizi sağlayan
                    belgelerle birlikte platformumuz üzerinden veya
                    info@edirnerota.com adresine iletebilirsiniz.
                  </p>
                </div>

                <p className="text-xs text-slate-500 mt-6 italic">
                  Son güncelleme: 13 Kasım 2025
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setKvkkAccepted(true);
                  setShowKvkkModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Kabul Ediyorum
              </button>
              <button
                onClick={() => setShowKvkkModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
