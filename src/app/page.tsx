import HeroSection from "@/components/sections/HeroSection";
import Azbilinenler from "@/components/Azbilinenler";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UpcomingEvents from "@/components/UpComingEvents";
import HowItWorks from "@/components/HowItWorks";

import { Users, MapPin, Sparkles } from "lucide-react";
import { Clock, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      {/* Uygulamanın Avantajları */}
      <section className="bg-gradient-to-br from-red-50 via-white to-gray-50 py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-1">
              ✨ Neden Edirne Rota?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Edirne'de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
                Unutulmaz Anılar
              </span>{" "}
              Yaşayın
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tarihi dokusu, lezzetli mutfağı ve kültürel zenginliğiyle
              Edirne'yi keşfedin. Size özel rotalarla bu muhteşem şehrin her
              köşesini deneyimleyin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kişiselleştirilmiş Rotalar */}
            <div
              className="group h-full animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group-hover:border-red-400 group-hover:-translate-y-2 h-full flex flex-col transform hover:scale-105">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 group-hover:rotate-6 transition-all duration-500">
                  {/* SVG Icon Placeholder - Replace with your custom SVG */}
                  <span className="text-2xl text-red-600 group-hover:scale-110 transition-transform duration-300">
                    🎯
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  Kişiselleştirilmiş Rotalar
                </h3>

                <p className="text-gray-600 text-base leading-relaxed flex-grow mb-6">
                  İlgi alanlarınız ve zamanınıza göre özel tasarlanmış rotalar.
                  Tarih, kültür, gastronomi veya doğa odaklı deneyimler için
                  ideal güzergahlar.
                </p>

                <button className="text-red-600 hover:text-red-700 text-base font-semibold transition-all duration-300 group-hover:underline hover:translate-x-2 flex items-center">
                  Daha fazlasını görüntüle
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* AI Rehber Asistanı */}
            <div
              className="group h-full animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group-hover:border-red-400 group-hover:-translate-y-2 h-full flex flex-col transform hover:scale-105">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 group-hover:rotate-6 transition-all duration-500">
                  {/* SVG Icon Placeholder - Replace with your custom SVG */}
                  <span className="text-2xl text-red-600 group-hover:scale-110 transition-transform duration-300">
                    🤖
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  AI Rehber Asistanı
                </h3>

                <p className="text-gray-600 text-base leading-relaxed flex-grow mb-6">
                  "Şu köşede ne var?", "En yakın tuvalet nerede?" gibi
                  sorularınızı sormaktan çekinmeyin! 24 saat yanınızdayım, her
                  merakınızı cevaplayacağım.
                </p>

                <button className="text-red-600 hover:text-red-700 text-base font-semibold transition-all duration-300 group-hover:underline hover:translate-x-2 flex items-center">
                  Daha fazlasını görüntüle
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Canlı Hava Durumu & API */}
            <div
              className="group h-full animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group-hover:border-red-400 group-hover:-translate-y-2 h-full flex flex-col transform hover:scale-105">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 group-hover:rotate-6 transition-all duration-500">
                  {/* SVG Icon Placeholder - Replace with your custom SVG */}
                  <span className="text-2xl text-red-600 group-hover:scale-110 transition-transform duration-300">
                    🌤️
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  Canlı Hava Durumu
                </h3>

                <p className="text-gray-600 text-base leading-relaxed flex-grow mb-6">
                  "Bugün güneşli mi?" diye merak ediyor musunuz? Biz de! O
                  yüzden anlık hava durumu takibi yapıyor, size en güzel zamanı
                  yakalayıp gezmeye çıkmanızı öneriyoruz.
                </p>

                <button className="text-red-600 hover:text-red-700 text-base font-semibold transition-all duration-300 group-hover:underline hover:translate-x-2 flex items-center">
                  Daha fazlasını görüntüle
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Başarı Sistemi */}
            <div
              className="group h-full animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group-hover:border-red-400 group-hover:-translate-y-2 h-full flex flex-col transform hover:scale-105">
                <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 group-hover:rotate-6 transition-all duration-500">
                  {/* SVG Icon Placeholder - Replace with your custom SVG */}
                  <span className="text-2xl text-red-600 group-hover:scale-110 transition-transform duration-300">
                    🏆
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  Başarı Sistemi
                </h3>

                <p className="text-gray-600 text-base leading-relaxed flex-grow mb-6">
                  İlk defa Selimiye'ye çıktınız mı? Tebrikler, rozetinizi
                  kazandınız! Arkadaşlarınızla yarışın, kim daha çok yer
                  keşfedecek bakalım!
                </p>

                <button className="text-red-600 hover:text-red-700 text-base font-semibold transition-all duration-300 group-hover:underline hover:translate-x-2 flex items-center">
                  Daha fazlasını görüntüle
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır - Yeni */}
      <div className="py-5 ">
        <HowItWorks />
      </div>

      {/* Yaklaşan Etkinlikler - Yeni */}
      <div className="py-5 bg-white">
        <UpcomingEvents />
      </div>
      <div className="py-5 bg-white mb-5">
        <Azbilinenler />
      </div>

      {/* Sana Özel Edirne Rotaları */}
      <section className="py-5 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
              Sana Özel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
                Edirne Rotaları
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Edirne'nin en güzel yerlerini keşfetmek için uzmanlarımız
              tarafından hazırlanmış özel rotalar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Köprüler ve Nehir Manzaraları Rotası */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                Köprüler
              </div>
              <div className="relative h-64 overflow-hidden">
                <div
                  className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('/assets/images/rotaoneri/köprü.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="bg-red-600 px-2 py-1 rounded-full">
                      📍 3 Durak
                    </span>
                    <span className="bg-gray-800 px-2 py-1 rounded-full">
                      ⏱️ 2 Saat
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-xl mb-4 text-gray-800 group-hover:text-red-700 transition-colors">
                  Köprüler ve Nehir Manzaraları
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tarihi Tunca köprüleri ve nehir kenarında muhteşem manzaralar
                  eşliğinde keyifli bir yürüyüş rotası.
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                    Rota Güzergahı:
                  </h4>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-3 text-sm">
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Meriç Köprüsü
                      </span>
                      <span className="text-red-500 text-lg">→</span>
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Tunca Nehri
                      </span>
                      <span className="text-red-500 text-lg">→</span>
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Fatih Köprüsü
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    Rotayı Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Lezzet Durakları Rotası */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                Lezzet Rotası
              </div>
              <div className="relative h-64 overflow-hidden">
                <div
                  className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('/assets/images/rotaoneri/yemekler.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="bg-red-600 px-2 py-1 rounded-full">
                      🍽️ 3 Mekan
                    </span>
                    <span className="bg-gray-800 px-2 py-1 rounded-full">
                      ⏱️ Tam Gün
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-xl mb-4 text-gray-800 group-hover:text-red-700 transition-colors">
                  Saklı Lezzet Durakları
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Edirne'nin en meşhur ciğer lokantalarından gizli kalmış
                  tatlar, yerel ustalarda geleneksel lezzetler.
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                    Lezzet Güzergahı:
                  </h4>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-sm mb-3">
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Tadım Menemen
                      </span>
                      <span className="text-red-500 text-lg">→</span>
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Ciğerci Niyazi
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Osmanlı Tatlıcısı
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    Rotayı Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Mimar Sinan Rotası */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                Tarihi Rota
              </div>
              <div className="relative h-64 overflow-hidden">
                <div
                  className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('/assets/images/rotaoneri/selimiye.jpg')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="bg-red-600 px-2 py-1 rounded-full">
                      🏛️ 4 Eser
                    </span>
                    <span className="bg-gray-800 px-2 py-1 rounded-full">
                      ⏱️ 3 Saat
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-xl mb-4 text-gray-800 group-hover:text-red-700 transition-colors">
                  Mimar Sinan'ın İzinde Başyapıtlar
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Selimiye Camii ve Mimar Sinan'ın Edirne'deki diğer eserlerini
                  keşfederken tarihe yolculuk yapın.
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                    Tarihi Güzergah:
                  </h4>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-sm mb-3">
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Selimiye Camii
                      </span>
                      <span className="text-red-500 text-lg">→</span>
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Üç Şerefeli
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Eski Camii
                      </span>
                      <span className="text-red-500 text-lg">→</span>
                      <span className="bg-white px-3 py-1 rounded-lg font-medium text-red-700 shadow-sm">
                        Muradiye Camii
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    Rotayı Gör
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
