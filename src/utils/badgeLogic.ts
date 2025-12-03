// src/utils/badgeLogic.ts
import { UserRoute } from "./userRoutes";

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number; // Kaç rota tamamlanınca kazanılır
};

export const badgeList: Badge[] = [
  {
    id: "first-route",
    name: "İlk Adım",
    description: "İlk rotanı tamamladın!",
    icon: "🎯",
    requirement: 1,
  },
  {
    id: "five-routes",
    name: "Deneyimli Gezgin",
    description: "5 rota tamamladın!",
    icon: "🗺️",
    requirement: 5,
  },
  {
    id: "ten-routes",
    name: "Usta Kaşif",
    description: "10 rota tamamladın!",
    icon: "🏆",
    requirement: 10,
  },
];

// Tamamlanan rotalara göre kazanılan rozetleri döndür
export function getEarnedBadges(routes: UserRoute[]): Badge[] {
  const completedCount = routes.filter((r) => r.completed).length;
  return badgeList.filter((badge) => completedCount >= badge.requirement);
}
