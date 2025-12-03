import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = "Edirne";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "API hatası" }, { status: 500 });
    }
    const data = await res.json();
    // Sadece gerekli verileri dön
    return NextResponse.json({
      temp: Math.round(data.main.temp),
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
    });
  } catch (err) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
