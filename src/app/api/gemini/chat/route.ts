import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "API anahtarı bulunamadı." },
        { status: 500 }
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text() || "Cevap alınamadı.";
    return NextResponse.json({ message: text });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || String(error) },
      { status: 500 }
    );
  }
}
