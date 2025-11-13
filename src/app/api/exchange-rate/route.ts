import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
      {
        cache: "no-store", // Her istekte yeni veri çek
      }
    );

    if (!response.ok) {
      throw new Error("ECB API yanıt vermedi");
    }

    const xmlText = await response.text();

    // XML'den TRY kurunu çıkar (regex ile basit parse)
    const tryMatch = xmlText.match(
      /<Cube currency=['"]TRY['"] rate=['"]([^'"]+)['"]/
    );

    if (tryMatch && tryMatch[1]) {
      const rate = parseFloat(tryMatch[1]).toFixed(2);
      return NextResponse.json({
        rate,
        currency: "TRY",
        base: "EUR",
        source: "ECB",
      });
    }

    throw new Error("TRY kuru bulunamadı");
  } catch (error) {
    console.error("Döviz kuru hatası:", error);
    return NextResponse.json(
      { error: "Kur bilgisi alınamadı" },
      { status: 500 }
    );
  }
}
