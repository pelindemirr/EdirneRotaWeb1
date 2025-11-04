import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function EtkinliklerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-800 to-pink-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Edirne Etkinlikleri
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Yıl boyunca düzenlenen festivaller, kültürel etkinlikler ve özel
            organizasyonları kaçırmayın. Edirne'nin canlı kültür hayatına
            katılın.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Yaklaşan Etkinlikler
          </button>
        </div>
      </section>

      {/* Öne Çıkan Etkinlikler */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Öne Çıkan Etkinlikler
            </h2>
            <p className="text-xl text-gray-600">
              Bu ay kaçırmamanız gereken etkinlikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1571037537669-c1deb8a37a3c?w=400&h=300&fit=crop')",
                }}
              >
                <div className="h-full bg-black/40 flex items-start justify-between p-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Yakında
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    Haziran 2025
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Kırkpınar Yağlı Güreş Festivali
                </h3>
                <p className="text-gray-600 mb-4">
                  658 yıllık geleneği sürdüren dünyanın en eski spor müsabakası.
                  Tarihi Kırkpınar alanında.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    📅 25-28 Haziran
                    <br />
                    📍 Kırkpınar Alanı
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-semibold">
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
                    "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop')",
                }}
              >
                <div className="h-full bg-black/40 flex items-start justify-between p-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Devam Ediyor
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    Ekim 2025
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Edirne Müzik Festivali
                </h3>
                <p className="text-gray-600 mb-4">
                  Klasik müzikten modern performanslara kadar geniş bir
                  yelpazede müzik dinletileri.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    📅 15-22 Ekim
                    <br />
                    📍 Çeşitli Mekanlar
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-semibold">
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
                    "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop')",
                }}
              >
                <div className="h-full bg-black/40 flex items-start justify-between p-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Özel
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    Kasım 2025
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Edirne Lezzet Festivali
                </h3>
                <p className="text-gray-600 mb-4">
                  Geleneksel Edirne mutfağından modern yorumlara kadar lezzet
                  dolu bir festival.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    📅 12-15 Kasım
                    <br />
                    📍 Tarihi Çarşı
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-semibold">
                    Detaylar →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Etkinlik Kategorileri */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Etkinlik Kategorileri
            </h2>
            <p className="text-xl text-gray-600">
              İlgi alanınıza göre etkinlik keşfedin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-center text-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold mb-2">Kültür & Sanat</h3>
              <p className="text-red-100 text-sm">Tiyatro, sergi, konser</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-center text-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold mb-2">Müzik</h3>
              <p className="text-blue-100 text-sm">Konserler, festivaller</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-center text-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">⚽</div>
              <h3 className="text-xl font-bold mb-2">Spor</h3>
              <p className="text-blue-100 text-sm">Güreş, futbol, atletizm</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-center text-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold mb-2">Gastronomi</h3>
              <p className="text-purple-100 text-sm">Lezzet festivalleri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Yaklaşan Etkinlikler Takvimi */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Etkinlik Takvimi
            </h2>
            <p className="text-xl text-gray-600">
              Bu ay ve gelecek ay programı
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Bu Ay</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">15</div>
                      <div className="text-sm text-gray-500">EKİM</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Selimiye Camii Özel Turu
                      </h4>
                      <p className="text-sm text-gray-600">
                        Rehberli geziler - 14:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">20</div>
                      <div className="text-sm text-gray-500">EKİM</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Edirne Fotoğraf Yarışması
                      </h4>
                      <p className="text-sm text-gray-600">
                        Kültür Merkezi - Tüm gün
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Gelecek Ay
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        12
                      </div>
                      <div className="text-sm text-gray-500">KASIM</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Lezzet Festivali
                      </h4>
                      <p className="text-sm text-gray-600">
                        Tarihi Çarşı - 4 gün
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        25
                      </div>
                      <div className="text-sm text-gray-500">KASIM</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Geleneksel El Sanatları Sergisi
                      </h4>
                      <p className="text-sm text-gray-600">
                        Müze kompleksi - 1 hafta
                      </p>
                    </div>
                  </div>
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
