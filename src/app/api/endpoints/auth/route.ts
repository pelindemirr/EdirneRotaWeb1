import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Body'den email ve password'u al
  const { email, password } = await req.json();

  // Basit kontrol (gerçek uygulamada DB sorgusu yapılır)
  if (email && password) {
    // Burada gerçek doğrulama yapılabilir
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Email or password missing" },
      { status: 400 }
    );
  }
}
