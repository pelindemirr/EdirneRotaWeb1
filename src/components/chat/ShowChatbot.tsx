"use client";

import dynamic from "next/dynamic";

// Chatbot'u dinamik olarak yükle (SSR'yi devre dışı bırak)
const Chatbot = dynamic(() => import("./chatbot"), {
  ssr: false,
});

export default function ShowChatbot() {
  return <Chatbot />;
}
