// src/utils/userRoutes.ts

export type UserRoute = {
  id: string;
  name: string;
  places: string[];
  createdAt: string;
  completed: boolean;
};

// Tüm rotaları getir
export function getUserRoutes(): UserRoute[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("userRoutes");
  return data ? JSON.parse(data) : [];
}

// Rota ekle
export function addUserRoute(
  route: Omit<UserRoute, "id" | "createdAt" | "completed">
): UserRoute {
  const newRoute: UserRoute = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: route.name,
    places: route.places,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  const routes = getUserRoutes();
  routes.push(newRoute);
  localStorage.setItem("userRoutes", JSON.stringify(routes));
  return newRoute;
}

// Rota tamamlandı/tamamlanmadı işaretle
export function setRouteCompleted(routeId: string, completed: boolean) {
  const routes = getUserRoutes();
  const idx = routes.findIndex((r) => r.id === routeId);
  if (idx !== -1) {
    routes[idx].completed = completed;
    localStorage.setItem("userRoutes", JSON.stringify(routes));
  }
}

// Rota sil
export function deleteUserRoute(routeId: string) {
  const routes = getUserRoutes().filter((r) => r.id !== routeId);
  localStorage.setItem("userRoutes", JSON.stringify(routes));
}
