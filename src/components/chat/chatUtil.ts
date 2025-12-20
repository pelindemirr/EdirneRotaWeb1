// Edirne Chat Utils - Mock Responses (UX improved, extended scenarios)

interface ChatResponse {
  text: string;
  suggestions?: string[];
}

const edirneData = {
  places: {
    selimiye: {
      name: "Selimiye Camii",
      info: "Mimar Sinan'ın ustalık eseri olan Selimiye Camii, 1575 yılında tamamlanmıştır. UNESCO Dünya Mirası listesindedir.",
      visitHours: "09:00 - 17:00 (Namaz vakitleri hariç)",
      entrance: "Ücretsiz",
    },
  },

  food: {
    tavanCigeri: {
      name: "Edirne Tava Ciğeri",
      info: "İnce dilimlenmiş dana ciğeri yüksek ısıda kısa sürede kızartılır.",
      where: ["Ciğerci Niyazi", "Balkan Ciğercisi", "Aydın Ciğer"],
    },
  },

  accommodation: {
    luxury: [
      "Margi Hotel – Butik ve merkezi",
      "Hilly Hotel – Modern ve manzaralı",
    ],
    budget: ["Antik Hotel", "Osmanlı Evi Pansiyon"],
  },

  transportation: {
    fromIstanbul: {
      bus: "Otobüsle yaklaşık 2,5 saat.",
      car: "Özel araçla yaklaşık 2–2,5 saat.",
      train: "Trenle yaklaşık 4 saat.",
    },
  },

  seasonalTips: {
    spring: "Ilıman hava ve az kalabalık nedeniyle ideal.",
    summer: "Kırkpınar dönemi, yoğun olabilir.",
    autumn: "Sakin ve serin.",
    winter: "Soğuk ama ekonomik.",
  },
};

export function getChatResponse(
  userMessage: string,
  isAuthenticated?: boolean
): ChatResponse {
  const msg = userMessage.toLowerCase();

  // Merhaba / Selam
  if (
    msg === "merhaba" ||
    msg === "selam" ||
    msg.includes("merhaba") ||
    msg.includes("selam")
  ) {
    return {
      text: "Merhaba. Size nasıl yardımcı olabilirim?",
      suggestions: [
        "Gezilecek yerler",
        "Ne yenir?",
        "Otel önerileri",
        "Ulaşım bilgisi",
      ],
    };
  }

  // Rota önerisi
  if (msg.includes("rota")) {
    if (isAuthenticated) {
      return {
        text: "Kişisel rota önerileri için Rota Planla sayfasına gidebilirsiniz.",
        suggestions: ["Rota Planla sayfasına git", "Gezilecek yerler"],
      };
    } else {
      return {
        text: "Kişisel rota önerileri için giriş yapmanız gerekmektedir.",
        suggestions: ["Giriş yap", "Gezilecek yerler"],
      };
    }
  }

  // Etkinlik
  if (msg.includes("etkinlik") || msg.includes("festival")) {
    return {
      text: "Güncel etkinlikler için Etkinlikler sayfasını inceleyebilirsiniz.",
      suggestions: ["Etkinlikler sayfasına git", "Kırkpınar hakkında bilgi"],
    };
  }

  // Selimiye
  if (msg.includes("selimiye") || msg.includes("mimar sinan")) {
    return {
      text: `Selimiye Camii

${edirneData.places.selimiye.info}

Ziyaret Saatleri: ${edirneData.places.selimiye.visitHours}
Giriş Ücreti: ${edirneData.places.selimiye.entrance}`,
      suggestions: ["Diğer tarihi yapılar", "Müzeleri listele"],
    };
  }

  // Yemek
  if (
    msg.includes("yemek") ||
    msg.includes("ciğer") ||
    msg.includes("ne yenir")
  ) {
    return {
      text: `Edirne Mutfağı

${edirneData.food.tavanCigeri.name}
${edirneData.food.tavanCigeri.info}
Önerilen Mekanlar: ${edirneData.food.tavanCigeri.where.join(", ")}`,
      suggestions: ["Ciğer restoranlarını göster", "Rota"],
    };
  }

  // Konaklama
  if (msg.includes("otel") || msg.includes("konaklama")) {
    return {
      text: `Konaklama Önerileri

Lüks ve Butik:
${edirneData.accommodation.luxury.map((h) => `- ${h}`).join("\n")}

Ekonomik:
${edirneData.accommodation.budget.map((h) => `- ${h}`).join("\n")}`,
      suggestions: ["Merkezdeki oteller", "Uygun fiyatlı seçenekler"],
    };
  }

  // Ulaşım
  if (msg.includes("ulaşım") || msg.includes("nasıl gidilir")) {
    return {
      text: `Edirne'ye Ulaşım

Otobüs: ${edirneData.transportation.fromIstanbul.bus}
Araç: ${edirneData.transportation.fromIstanbul.car}
Tren: ${edirneData.transportation.fromIstanbul.train}`,
      suggestions: ["Otobüs seferleri", "Tren biletleri"],
    };
  }

  // Mevsim
  if (msg.includes("ne zaman") || msg.includes("mevsim")) {
    return {
      text: `Ziyaret Zamanı Önerileri

İlkbahar: ${edirneData.seasonalTips.spring}
Yaz: ${edirneData.seasonalTips.summer}
Sonbahar: ${edirneData.seasonalTips.autumn}
Kış: ${edirneData.seasonalTips.winter}`,
      suggestions: ["Yaz etkinlikleri", "Kış dönemi önerileri"],
    };
  }

  // Default
  return {
    text: "Edirne hakkında bilgi almak ister misiniz?",
    suggestions: [
      "Gezilecek yerler",
      "Ne yenir?",
      "Otel önerileri",
      "Ulaşım bilgisi",
    ],
  };
}

// İlk mesaj
export function getInitialMessage(
  isAuthenticated: boolean,
  userName?: string
): string {
  if (isAuthenticated && userName) {
    return `Merhaba ${userName}.

Edirne geziniz için size yardımcı olabilirim.
Ne hakkında bilgi almak istersiniz?`;
  }

  return `Merhaba.

Edirne hakkında bilgi almak için sorular sorabilirsiniz.`;
}
