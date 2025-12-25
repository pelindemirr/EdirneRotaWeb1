// Belirli bir kullanıcıya ait, belirli isimdeki rotaları sil
export function deleteUserRouteByName(userId: string, routeName: string) {
  const data = localStorage.getItem(`userRoutes_${userId}`);
  const allRoutes: UserRoute[] = data ? JSON.parse(data) : [];
  const filtered = allRoutes.filter((r) => r.name !== routeName);
  localStorage.setItem(`userRoutes_${userId}`, JSON.stringify(filtered));
}
// src/utils/userRoutes.ts

export type UserRoute = {
  id: string;
  userId: string;
  name: string;
  places: string[];
  createdAt: string;
  completed: boolean;
};

// Sadece ilgili kullanıcıya ait rotaları getir (userRoutes_{userId})
export function getUserRoutes(userId: string): UserRoute[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(`userRoutes_${userId}`);
  return data ? JSON.parse(data) : [];
}

// Rota ekle (kullanıcıya özel anahtar)
export function addUserRoute(
  userId: string,
  route: Omit<UserRoute, "id" | "createdAt" | "completed" | "userId">
): UserRoute {
  const newRoute: UserRoute = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId,
    name: route.name,
    places: route.places,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  const data = localStorage.getItem(`userRoutes_${userId}`);
  const allRoutes: UserRoute[] = data ? JSON.parse(data) : [];
  allRoutes.push(newRoute);
  localStorage.setItem(`userRoutes_${userId}`, JSON.stringify(allRoutes));
  return newRoute;
}

// Rota tamamlandı/tamamlanmadı işaretle (kullanıcıya özel anahtar)
export function setRouteCompleted(
  userId: string,
  routeId: string,
  completed: boolean
) {
  const data = localStorage.getItem(`userRoutes_${userId}`);
  const allRoutes: UserRoute[] = data ? JSON.parse(data) : [];
  const idx = allRoutes.findIndex((r) => r.id === routeId);
  if (idx !== -1) {
    allRoutes[idx].completed = completed;
    localStorage.setItem(`userRoutes_${userId}`, JSON.stringify(allRoutes));
  }
}

// Rota sil (kullanıcıya özel anahtar)
export function deleteUserRoute(userId: string, routeId: string) {
  const data = localStorage.getItem(`userRoutes_${userId}`);
  const allRoutes: UserRoute[] = data ? JSON.parse(data) : [];
  const filtered = allRoutes.filter((r) => r.id !== routeId);
  localStorage.setItem(`userRoutes_${userId}`, JSON.stringify(filtered));
}
