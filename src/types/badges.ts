// Rozet tipleri ve sistemi için type tanımlamaları

export type BadgeCategory =
  | "explorer"
  | "culture"
  | "food"
  | "nature"
  | "photographer"
  | "special";

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: {
    type: "route_completion" | "place_visit" | "special_event";
    count?: number;
    specific?: string[]; // Belirli yerler veya rotalar
  };
  isUnlocked: boolean;
  unlockedAt?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
};

export type CompletedRoute = {
  id: string;
  routeName: string;
  completedAt: Date;
  places: string[];
  duration: number; // dakika cinsinden
  earnedBadges: string[]; // Badge ID'leri
};

export type UserProgress = {
  userId: string;
  totalRoutesCompleted: number;
  totalPlacesVisited: number;
  badges: Badge[];
  completedRoutes: CompletedRoute[];
  favoritePlace: string[];
};
