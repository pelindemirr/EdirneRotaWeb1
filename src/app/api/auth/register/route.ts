import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fullname, email, password } = await req.json();

  // Basit demo: veritabanı yok, sadece kontrol
  if (!fullname || !email || !password) {
    return NextResponse.json({ message: "Eksik bilgi!" }, { status: 400 });
  }

  // Burada gerçek bir veritabanı kaydı yapılabilir
  // Demo: her zaman başarılı
  return NextResponse.json(
    { message: "Kayıt başarılı!", user: { fullname, email } },
    { status: 200 }
  );
}
