import { Badge } from "@/types/badges";

// Örnek rozet verileri - sen buraya kendi rozetlerini ekleyebilirsin
export const allBadges: Badge[] = [
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
  {
    id: "food-lover",
    name: "Gurme",
    description: "Tüm gastronomi noktalarını ziyaret ettin",
    icon: "🍽️",
    category: "food",
    requirement: {
      type: "place_visit",
      count: 10,
    },
    isUnlocked: false,
    rarity: "epic",
  },
  {
    id: "edirne-master",
    name: "Edirne Ustası",
    description: "Tüm tarihi mekanları keşfettin!",
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
