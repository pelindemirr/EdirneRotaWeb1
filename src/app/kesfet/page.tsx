import {
  MapPin,
  Clock,
  Star,
  Heart,
  Calendar,
  Users,
  Mountain,
  Building2,
  Utensils,
  Landmark,
  Award,
  Camera,
} from "lucide-react";
import Header from "@/components/layout/Header";

// Footer
const Footer = () => (
  <div className="bg-gray-900 text-white p-8 text-center">
    <p className="text-sm">© 2024 Edirne Gezgin - Tüm hakları saklıdır.</p>
  </div>
);

export default function KesfetPage() {
  const historicalPlaces = [
    {
      id: 1,
      name: "Selimiye Camii",
      icon: "🕌",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
      category: "Tarihi",
      categoryColor: "bg-red-600",
      rating: 4.9,
      reviews: 3240,
      description:
        "Mimar Sinan'ın ustalık eseri kabul edilen Selimiye Camii, 1575 yılında tamamlanmış olup UNESCO Dünya Mirası listesindedir. 70.9 metrelik ince minareleri ve kusursuz akustiğiyle Osmanlı mimarisinin zirvesi olarak kabul edilir.",
      highlights: [
        "UNESCO Dünya Mirası",
        "Mimar Sinan'ın Ustalık Eseri",
        "70.9 m Minareler",
      ],
      mapsUrl:
        "https://www.google.com/maps/place/Selimiye+Camii/@41.6781067,26.5567089,17z/data=!4m14!1m7!3m6!1s0x14b32f75c6afb395:0x4575bc141db6227b!2sSelimiye+Camii!8m2!3d41.6781107!4d26.5591551!16zL20vMDV6NW10!3m5!1s0x14b32f75c6afb395:0x4575bc141db6227b!8m2!3d41.6781107!4d26.5591551!16zL20vMDV6NW10?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      id: 2,
      name: "Eski Camii",
      icon: "🏛️",
      image:
        "https://images.unsplash.com/photo-1564769610726-5c4b90864c3e?w=800&h=600&fit=crop",
      category: "Tarihi",
      categoryColor: "bg-red-600",
      rating: 4.7,
      reviews: 1850,
      description:
        "Edirne'nin en eski selatin camilerinden biri olan Eski Camii, 1403–1414 yılları arasında inşa edilmiştir. İç duvarlarındaki büyük hat yazıları, hattat Şeyh Hamdullah ve diğer ünlü hattatların eserleridir.",
      highlights: [
        "Anıtsal Hat Yazıları",
        "Erken Osmanlı Mimarisi",
        "Ulu Cami Geleneği",
      ],
      mapsUrl:
        "https://www.google.com/maps/place/Eski+Cami/@41.6767248,26.55314,17z/data=!3m1!4b1!4m6!3m5!1s0x14b32f77943fffff:0x12a41f493b010bd1!8m2!3d41.6767208!4d26.5557149!16s%2Fm%2F05znh84?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      id: 3,
      name: "Edirne Sarayı",
      icon: "🏰",
      image:
        "https://images.unsplash.com/photo-1555992336-fb0d29498889?w=800&h=600&fit=crop",
      category: "Tarihi",
      categoryColor: "bg-red-600",
      rating: 4.6,
      reviews: 2120,
      description:
        "II. Murad tarafından 1450'lerde yapımına başlanan Saray-ı Cedid-i Amire, Osmanlı padişahlarının uzun yıllar kullandığı önemli saray komplekslerinden biridir. Tunca Nehri kıyısındaki sarayda bugün kazı çalışmaları devam etmektedir.",
      highlights: [
        "Osmanlı Saray Kompleksi",
        "Tunca Nehri Manzarası",
        "Arkeolojik Alan",
      ],
      mapsUrl: "https://www.google.com/maps/place/Meriç+Köprüsü/",
    },
    {
      id: 4,
      name: "Kırkpınar Güreş Alanı",
      icon: "🤼",
      image:
        "https://images.unsplash.com/photo-1571037537669-c1deb8a37a3c?w=800&h=600&fit=crop",
      category: "Kültür",
      categoryColor: "bg-rose-600",
      rating: 4.8,
      reviews: 1560,
      description:
        "Dünyanın en eski sürekli düzenlenen spor etkinliği olan Kırkpınar Yağlı Güreşleri, 14. yüzyıldan beri yapılmaktadır. 2024 yılı itibarıyla 663. yılı kutlanmıştır. UNESCO Somut Olmayan Kültürel Miras listesinde yer alır.",
      highlights: [
        "663 Yıllık Gelenek",
        "UNESCO Kültürel Mirası",
        "Dünyanın En Eski Yağlı Güreşi",
      ],
    },
    {
      id: 5,
      name: "Meriç Nehri",
      icon: "🌊",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Doğa",
      categoryColor: "bg-teal-600",
      rating: 4.5,
      reviews: 980,
      description:
        "Edirne; Meriç, Tunca ve Arda nehirlerinin birleştiği eşsiz bir coğrafyada yer alır. Meriç Nehri kıyısı, yürüyüş yolları, tarihi köprüleri ve gün batımı manzarasıyla şehrin en huzurlu noktalarından biridir.",
      highlights: [
        "Tarihi Meriç Köprüsü",
        "Gün Batımı Manzarası",
        "Doğa Yürüyüşü",
      ],
    },
    {
      id: 6,
      name: "Edirne Lezzetleri",
      icon: "🍽️",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      category: "Gastronomi",
      categoryColor: "bg-amber-600",
      rating: 4.9,
      reviews: 2840,
      description:
        "Edirne denince ilk akla gelen lezzetler arasında tava ciğeri, badem ezmesi, peynir helvası ve meşhur Edirne beyaz peyniri bulunur. Şehir, gastronomi açısından Türkiye'nin en karakteristik mutfaklarından birine sahiptir.",
      highlights: [
        "Tava Ciğeri",
        "Edirne Beyaz Peyniri",
        "Peynir Helvası",
        "Badem Ezmesi",
      ],
    },
  ];

  const categories = [
    {
      name: "Tarihi Yapılar",
      icon: "🏛️",
      count: 15,
      color: "from-red-600 to-red-700",
    },
    {
      name: "Doğal Alanlar",
      icon: "🌳",
      count: 8,
      color: "from-emerald-600 to-teal-600",
    },
    {
      name: "Lezzetler",
      icon: "🍽️",
      count: 25,
      color: "from-amber-600 to-orange-600",
    },
    {
      name: "Kültür & Sanat",
      icon: "🎭",
      count: 12,
      color: "from-rose-600 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7c0a1a] via-[#a01224] to-[#36040c] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent)]"></div>

        {/* Sağ üst ışık */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"></div>

        {/* Sol alt bordo */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/25 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-6">
            <span className="bg-white/10 backdrop-blur-sm text-white px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20">
              Tarihin Kalbi, Kültürün Beşiği
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Edirne'yi Keşfedin
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
            UNESCO Dünya Mirası Selimiye Camii'nden asırlık Kırkpınar
            geleneğine, Osmanlı mimarisinden eşsiz lezzetlere kadar Edirne'nin
            tüm güzelliklerini keşfedin.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl text-white hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold mb-1">663</div>
              <div className="text-sm text-white/90 font-medium">
                Yıllık Gelenek
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl text-white hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold mb-1">UNESCO</div>
              <div className="text-sm text-white/90 font-medium">
                Dünya Mirası
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edirne Hakkında */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-3xl shadow-xl p-8 md:p-12 border border-red-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                    Tarih & Kültür
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Osmanlı'nın Parlak Başkenti
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Edirne, yüzyıllar boyunca Osmanlı'nın en önemli kültür
                  merkezlerinden biri olmuş; mimarisi, gelenekleri ve stratejik
                  konumuyla tarihte özel bir yer edinmiştir. Şehrin siluetine
                  damga vuran
                  <strong className="text-red-600"> Selimiye Camii </strong>
                  ise yalnızca bir ibadet mekânı değil, aynı zamanda dünya
                  mimarlık tarihinin en değerli eserlerinden biridir.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed">
                  Meriç kıyılarının huzurlu atmosferi, tarihi köprülerin zarif
                  duruşu ve her mevsim canlı kültür hayatı Edirne’yi benzersiz
                  kılar. Şehir, aynı zamanda gelenekleriyle de ünlüdür;
                  asırlardır devam eden
                  <strong className="text-red-600">
                    {" "}
                    Kırkpınar Yağlı Güreşleri{" "}
                  </strong>
                  ile dünyaya köklü bir spor mirası sunar.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border-2 border-red-100 shadow-lg hover:shadow-xl transition-all hover:border-red-300">
                  <Award className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    UNESCO Mirası
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Selimiye Camii dünya çapında tanınan bir mimari şaheser
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-red-100 shadow-lg hover:shadow-xl transition-all hover:border-red-300">
                  <Building2 className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Osmanlı Başkenti
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    1361–1453 yılları arasında imparatorluğun merkezi
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-amber-100 shadow-lg hover:shadow-xl transition-all hover:border-amber-300">
                  <Users className="w-12 h-12 text-amber-600 mb-4" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    663 Yıl
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Kırkpınar güreş geleneğinin tarihi
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-teal-100 shadow-lg hover:shadow-xl transition-all hover:border-teal-300">
                  <Mountain className="w-12 h-12 text-teal-600 mb-4" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    3 Nehir
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Meriç, Tunca ve Arda'nın buluşma noktası
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mutlaka Görülmesi Gerekenler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                Önerilen Yerler
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mutlaka Görülmesi Gerekenler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Edirne'nin sembol haline gelmiş tarihi ve kültürel durakları
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalPlaces.map((place) => (
              <div
                key={place.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${place.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`${place.categoryColor} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl`}
                    >
                      {place.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl filter drop-shadow-lg">
                      {place.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {place.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="font-bold text-gray-900 text-sm">
                        {place.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({place.reviews.toLocaleString()} değerlendirme)
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {place.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Konum
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
