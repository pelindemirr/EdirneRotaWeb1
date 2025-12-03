// Etkinlik tipi tanımı
export interface Event {
  id: number;
  category: "kultur" | "spor" | "gastronomi" | "sanat" | "doga";
  date: string;
  title: string;
  description: string;
  location: string;
  image: string;
  time: string;
}

// Yaklaşan Etkinlikler
export const upcomingEvents: Event[] = [
  {
    id: 1,
    category: "kultur",
    date: "25 Kasım 2025",
    title: "Edirne'nin Kurtuluşu Töreni",
    description:
      "Edirne'nin düşman işgalinden kurtuluşunun yıl dönümü. Resmi tören ve anma etkinlikleri.",
    location: "Selimiye Camii ve Atatürk Anıtı",
    image: "/assets/images/upcoming/kurtulus.png",
    time: "10:00",
  },
  {
    id: 2,
    category: "sanat",
    date: "29 Kasım 2025",
    title: "İçimizdeki Şeytan",
    description:
      "Tiyatro oyunu. İnsan doğasının karanlık yönlerini işleyen etkileyici bir performans.",
    location: "Atatürk Kültür Merkezi",
    image: "/assets/images/upcoming/icimizdekiseytan.jpeg",
    time: "19:30",
  },
  {
    id: 3,
    category: "kultur",
    date: "26 Ocak 2026",
    title: "Bocuk Gecesi",
    description:
      "Trakya'nın en eski Balkan geleneklerinden biri. Geleneksel kutlama ve festivaller.",
    location: "Keşan, Çamlıca Köyü",
    image: "/assets/images/upcoming/bocuk.png",
    time: "18:00",
  },
  {
    id: 4,
    category: "spor",
    date: "28 Haziran 2026",
    title: "Kırkpınar Yağlı Güreşleri",
    description:
      "660. yıl özel. Dünyanın en eski spor organizasyonu. 3 gün sürecek güreş müsabakaları.",
    location: "Sarayiçi / Kırkpınar Meydanı",
    image: "/assets/images/upcoming/kirkpinar.jpg",
    time: "09:00",
  },
];

// Geçmiş Etkinlikler
export const pastEvents: Event[] = [
  {
    id: 1,
    category: "sanat",
    date: "10 Kasım 2025",
    title: "ATA'YA SAYGI Sergisi",
    description:
      "Geleneksel Sim Sırma Sanatı sergisi. Mustafa Kemal Atatürk'e saygı duruşu.",
    location: "Devecihan Kültür Merkezi",
    image: "/assets/images/upcoming/sergi.png",
    time: "10:00",
  },
  {
    id: 2,
    category: "sanat",
    date: "13 Kasım 2025",
    title: "Obje Boyama Atölyesi",
    description:
      "Yaratıcı obje boyama atölyesi. Sanatsal yeteneğinizi keşfedin.",
    location: "Edirne Oda Sahnesi",
    image: "/assets/images/upcoming/objeatolyesii.jpeg",
    time: "16:00",
  },
  {
    id: 3,
    category: "spor",
    date: "16 Kasım 2025",
    title: "Edirnespor vs 1926 Polatlı Belediye Spor",
    description: "3. Lig normal sezonu iç saha maçı. Heyecan dolu 90 dakika.",
    location: "İç Saha (Edirne)",
    image: "/assets/images/upcoming/mac.png",
    time: "15:00",
  },
];
