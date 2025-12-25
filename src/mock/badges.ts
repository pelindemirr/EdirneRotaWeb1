import { Badge } from "@/types/badges";

// Örnek rozet verileri - sen buraya kendi rozetlerini ekleyebilirsin
export const allBadges: Badge[] = [
  // =========================
  // MEVCUT ROZETLER (AYNEN)
  // =========================
  {
    id: "first-route",
    name: "İlk Adım",
    description: "İlk rotanı tamamladın!",
    icon: "🎯",
    category: "explorer",
    requirement: {
      type: "route_completion",
      count: 1,
    },
    isUnlocked: false,
    rarity: "common",
  },
  {
    id: "selimiye-visitor",
    name: "Selimiye'nin Efendisi",
    description: "Selimiye Camii'ni ziyaret ettin",
    icon: "🕌",
    category: "culture",
    requirement: {
      type: "place_visit",
      specific: ["selimiye-camii"],
    },
    isUnlocked: false,
    rarity: "rare",
  },
  {
    id: "five-routes",
    name: "Deneyimli Gezgin",
    description: "5 farklı rota tamamladın",
    icon: "🗺️",
    category: "explorer",
    requirement: {
      type: "route_completion",
      count: 5,
    },
    isUnlocked: false,
    rarity: "rare",
  },

  // =========================
  // YENİ – KOLAY TAMAMLANAN
  // =========================
  {
    id: "first-place",
    name: "Keşfe Başladın",
    description: "İlk tarihi mekanı ziyaret ettin",
    icon: "📍",
    category: "explorer",
    requirement: {
      type: "place_visit",
      count: 1,
    },
    isUnlocked: false,
    rarity: "common",
  },
  {
    id: "three-places",
    name: "Gezgin Ruh",
    description: "3 farklı mekanı ziyaret ettin",
    icon: "👣",
    category: "explorer",
    requirement: {
      type: "place_visit",
      count: 3,
    },
    isUnlocked: false,
    rarity: "common",
  },

  // =========================
  // KÜLTÜR
  // =========================
  {
    id: "culture-lover",
    name: "Kültür Meraklısı",
    description: "5 tarihi mekanı ziyaret ettin",
    icon: "🏛️",
    category: "culture",
    requirement: {
      type: "place_visit",
      count: 5,
    },
    isUnlocked: false,
    rarity: "rare",
  },

  // =========================
  // YEMEK
  // =========================
  {
    id: "first-food",
    name: "Lezzet Avcısı",
    description: "İlk gastronomi noktasını ziyaret ettin",
    icon: "🍴",
    category: "food",
    requirement: {
      type: "place_visit",
      count: 1,
    },
    isUnlocked: false,
    rarity: "common",
  },
  {
    id: "food-lover",
    name: "Gurme",
    description: "10 farklı gastronomi noktasını ziyaret ettin",
    icon: "🍽️",
    category: "food",
    requirement: {
      type: "place_visit",
      count: 10,
    },
    isUnlocked: false,
    rarity: "epic",
  },

  // =========================
  // UZUN VADE
  // =========================
  {
    id: "ten-routes",
    name: "Usta Gezgin",
    description: "10 rota tamamladın",
    icon: "🚀",
    category: "explorer",
    requirement: {
      type: "route_completion",
      count: 10,
    },
    isUnlocked: false,
    rarity: "epic",
  },
  {
    id: "edirne-master",
    name: "Edirne Ustası",
    description: "50 farklı mekanı keşfettin!",
    icon: "👑",
    category: "special",
    requirement: {
      type: "place_visit",
      count: 50,
    },
    isUnlocked: false,
    rarity: "legendary",
  },
];

// Rozet kazanma kontrolü için yardımcı fonksiyon
export function checkBadgeUnlock(
  badge: Badge,
  userProgress: {
    routesCompleted: number;
    placesVisited: string[];
  }
): boolean {
  switch (badge.requirement.type) {
    case "route_completion":
      return userProgress.routesCompleted >= (badge.requirement.count || 0);

    case "place_visit":
      if (badge.requirement.specific) {
        return badge.requirement.specific.every((place) =>
          userProgress.placesVisited.includes(place)
        );
      }
      return (
        userProgress.placesVisited.length >= (badge.requirement.count || 0)
      );

    default:
      return false;
  }
}
