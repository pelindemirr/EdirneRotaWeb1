import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API anahtarı bulunamadı." },
        { status: 500 }
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text() || "Cevap alınamadı.";
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Hatası:", error);
    return NextResponse.json(
      { error: error?.message || String(error), stack: error?.stack },
      { status: 500 }
    );
  }
}
