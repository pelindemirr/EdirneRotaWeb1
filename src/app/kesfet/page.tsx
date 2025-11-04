import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function KesfetPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-purple-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Edirne'yi Keşfedin
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Tarihi yapılardan doğal güzelliklere, lezzetlerden festivallere
            kadar Edirne'nin tüm harikalarını keşfedin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
              Tarihi Yerler
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
              Doğal Alanlar
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
              Lezzetler
            </button>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Yerler */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Öne Çıkan Yerler
            </h2>
            <p className="text-xl text-gray-600">
              Edirne'nin en popüler turistik mekanları
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop')",
                }}
              >
                <div className="h-full bg-black/30 flex items-end">
                  <div className="p-4 text-white">
                    <span className="bg-blue-500 px-2 py-1 rounded text-sm">
                      Tarihi
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Selimiye Camii
                </h3>
                <p className="text-gray-600 mb-4">
                  Mimar Sinan'ın şaheser eseri olan UNESCO Dünya Mirası
                  listesindeki bu muhteşem cami.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ⭐ 4.8 (2,340 değerlendirme)
                  </span>
                  <button className="text-teal-600 hover:text-teal-700 font-semibold">
                    Detaylar →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop')",
                }}
              >
                <div className="h-full bg-black/30 flex items-end">
                  <div className="p-4 text-white">
                    <span className="bg-green-500 px-2 py-1 rounded text-sm">
                      Doğa
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Saroz Körfezi
                </h3>
                <p className="text-gray-600 mb-4">
                  Temiz plajları ve berrak sularıyla Trakya'nın gizli cenneti
                  olan körfez.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ⭐ 4.6 (1,820 değerlendirme)
                  </span>
                  <button className="text-teal-600 hover:text-teal-700 font-semibold">
                    Detaylar →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1571037537669-c1deb8a37a3c?w=400&h=300&fit=crop')",
                }}
              >
                <div className="h-full bg-black/30 flex items-end">
                  <div className="p-4 text-white">
                    <span className="bg-orange-500 px-2 py-1 rounded text-sm">
                      Kültür
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Kırkpınar Güreş Alanı
                </h3>
                <p className="text-gray-600 mb-4">
                  658 yıllık geleneği sürdüren dünyanın en eski spor
                  müsabakasının merkezi.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ⭐ 4.5 (980 değerlendirme)
                  </span>
                  <button className="text-teal-600 hover:text-teal-700 font-semibold">
                    Detaylar →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Kategoriler
            </h2>
            <p className="text-xl text-gray-600">
              İlgi alanınıza göre keşfedin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-center text-white group-hover:shadow-lg transition-all group-hover:scale-105">
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold mb-2">Tarihi Yapılar</h3>
                <p className="text-blue-100 text-sm">12 lokasyon</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-8 text-center text-white group-hover:shadow-lg transition-all group-hover:scale-105">
                <div className="text-5xl mb-4">🌊</div>
                <h3 className="text-xl font-bold mb-2">Doğal Alanlar</h3>
                <p className="text-green-100 text-sm">8 lokasyon</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg p-8 text-center text-white group-hover:shadow-lg transition-all group-hover:scale-105">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-xl font-bold mb-2">Lezzetler</h3>
                <p className="text-yellow-100 text-sm">25 restoran</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 text-center text-white group-hover:shadow-lg transition-all group-hover:scale-105">
                <div className="text-5xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-2">Kültür & Sanat</h3>
                <p className="text-purple-100 text-sm">6 mekan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
