import { NextRequest, NextResponse } from "next/server";

let routes: any[] = [];
let idCounter = 1;

export async function POST(req: NextRequest) {
  const data = await req.json();
  const id = idCounter++;
  routes.push({ id, ...data });
  return NextResponse.json({ id });
}
