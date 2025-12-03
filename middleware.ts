import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes - login gerektiren sayfalar
  const protectedRoutes = [
    "/dashboard",
    "/dashboard/profile",
    "/rota-planla", // Login gerekli rota planlama
  ];

  // Public routes - herkes erişebilir
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/kesfet",
    "/etkinlikler",
    "/iletisim",
    "/rota-planla/guest", // Guest mode rota planlama
  ];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if user is logged in (localStorage kontrolü client-side olduğu için cookie kullanıyoruz)
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  // Protected route'a giriş yapmadan erişmeye çalışılıyor
  if (isProtectedRoute && !isLoggedIn) {
    // Login sayfasına yönlendir
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // Geri dönüş için
    return NextResponse.redirect(loginUrl);
  }

  // Login/Register sayfasına zaten login olan kullanıcı erişmeye çalışıyor
  if (
    isLoggedIn &&
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Middleware'in hangi path'lerde çalışacağını belirt
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
