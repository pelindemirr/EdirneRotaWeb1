// =======================================
// Edirne Chat Utils – FULL MOCK EXTENDED
// AI YOK | SADECE STATİK SENARYOLAR
// =======================================

export interface ChatResponse {
  text: string;
  suggestions?: string[];
}

// =======================================
// DATA
// =======================================

const edirneData = {
  places: {
    selimiye: {
      info: "Mimar Sinan’ın ustalık eseri Selimiye Camii 1575 yılında tamamlanmıştır. UNESCO Dünya Mirası listesindedir.",
      visitHours: "09:00 - 17:00 (Namaz vakitleri hariç)",
      entrance: "Ücretsiz",
      bestTime: "Sabah erken saatler veya gün batımı",
    },
    eskiCami: "1414 yılında yapılmıştır, hat yazılarıyla ünlüdür.",
    ucSerefeli: "Dört minaresiyle Osmanlı mimarisinde ilktir.",
  },

  food: {
    ciger: {
      info: "İnce dana ciğeri, yüksek ateşte kısa sürede kızartılır.",
      where: ["Ciğerci Niyazi", "Aydın Ciğer", "Balkan Ciğercisi"],
    },
    dessert: {
      info: "Badem ezmesi Edirne’nin coğrafi işaretli tatlısıdır.",
      where: ["Deva-i Misk", "Arasta Çarşısı"],
    },
  },

  bridges: ["Meriç Köprüsü", "Tunca Köprüsü", "Saraçhane Köprüsü"],

  museums: ["Sağlık Müzesi", "Türk İslam Eserleri Müzesi"],

  accommodation: {
    luxury: ["Margi Hotel", "Hilly Hotel"],
    budget: ["Antik Hotel", "Osmanlı Evi Pansiyon"],
  },
};

// =======================================
// ENGINE
// =======================================

export async function getChatResponse(
  userMessage: string,
  isAuthenticated?: boolean
): Promise<ChatResponse> {
  const msg = userMessage.toLowerCase();

  // =======================================
  // GREETING
  // =======================================
  if (msg.includes("merhaba") || msg.includes("selam")) {
    return {
      text: "Merhaba. Edirne hakkında size rehberlik edebilirim.",
      suggestions: [
        "Gezilecek yerler",
        "Ne yenir?",
        "Kaç günde gezilir?",
        "Ulaşım",
        "Konaklama",
      ],
    };
  }

  // =======================================
  // GEZİLECEK YERLER
  // =======================================
  if (msg.includes("gezilecek")) {
    return {
      text: "Edirne’de gezilecek yerleri kategoriye göre seçebilirsiniz.",
      suggestions: ["Camiler", "Köprüler", "Müzeler", "Doğa & Nehirler"],
    };
  }

  // CAMİLER
  if (msg.includes("camiler")) {
    return {
      text: "Edirne’nin öne çıkan camileri:",
      suggestions: ["Selimiye Camii", "Eski Camii", "Üç Şerefeli Camii"],
    };
  }

  // SELİMİYE DETAY
  if (msg.includes("selimiye")) {
    return {
      text: `Selimiye Camii

${edirneData.places.selimiye.info}

Ziyaret: ${edirneData.places.selimiye.visitHours}
Giriş: ${edirneData.places.selimiye.entrance}
En iyi zaman: ${edirneData.places.selimiye.bestTime}`,
      suggestions: [
        "Fotoğraf çekilecek yerler",
        "Yakın gezilecek yerler",
        "Rotaya ekle",
      ],
    };
  }

  // KÖPRÜLER
  if (msg.includes("köprü")) {
    return {
      text: "Edirne’de tarihi köprüler:",
      suggestions: edirneData.bridges,
    };
  }

  // MÜZELER
  if (msg.includes("müze")) {
    return {
      text: "Ziyaret edebileceğiniz müzeler:",
      suggestions: edirneData.museums,
    };
  }

  // =======================================
  // YEMEK
  // =======================================
  if (msg.includes("ne yenir") || msg.includes("yemek")) {
    return {
      text: "Edirne mutfağından neyi merak ediyorsunuz?",
      suggestions: ["Ciğer", "Tatlılar", "En iyi restoranlar"],
    };
  }

  if (msg.includes("ciğer")) {
    return {
      text: `Edirne Tava Ciğeri

${edirneData.food.ciger.info}

Önerilen mekanlar:
${edirneData.food.ciger.where.join(", ")}`,
      suggestions: ["Ciğer nerede yenir?", "Yemek rotası"],
    };
  }

  if (msg.includes("tatlı")) {
    return {
      text: `Badem Ezmesi

${edirneData.food.dessert.info}

Nereden alınır:
${edirneData.food.dessert.where.join(", ")}`,
      suggestions: ["Hediyelik tatlılar", "Arasta Çarşısı"],
    };
  }

  // =======================================
  // KONAKLAMA
  // =======================================
  if (msg.includes("konaklama") || msg.includes("otel")) {
    return {
      text: "Konaklama tercihinizi seçebilirsiniz:",
      suggestions: [
        "Lüks oteller",
        "Uygun fiyatlı oteller",
        "Merkezde konaklama",
      ],
    };
  }

  if (msg.includes("lüks")) {
    return {
      text: "Lüks & butik oteller:",
      suggestions: edirneData.accommodation.luxury,
    };
  }

  if (msg.includes("uygun")) {
    return {
      text: "Ekonomik oteller:",
      suggestions: edirneData.accommodation.budget,
    };
  }

  // =======================================
  // SÜRE & PLANLAMA
  // =======================================
  if (msg.includes("kaç günde")) {
    return {
      text: "Edirne gezisi için ideal süre:",
      suggestions: ["1 günde Edirne", "2 günde Edirne", "Hafta sonu planı"],
    };
  }

  // =======================================
  // ROTA
  // =======================================
  if (msg.includes("rota")) {
    return isAuthenticated
      ? {
          text: "Rota oluşturabilirsiniz.",
          suggestions: ["1 günlük rota", "2 günlük rota", "Kendi rotam"],
        }
      : {
          text: "Rota oluşturmak için giriş yapmalısınız.",
          suggestions: ["Giriş yap"],
        };
  }

  // =======================================
  // DEFAULT
  // =======================================
  return {
    text: "Edirne hakkında hangi konuda bilgi almak istersiniz?",
    suggestions: ["Gezilecek yerler", "Ne yenir?", "Konaklama", "Ulaşım"],
  };
}

// =======================================
// INITIAL MESSAGE
// =======================================

export function getInitialMessage(
  isAuthenticated: boolean,
  userName?: string
): ChatResponse {
  return {
    text:
      isAuthenticated && userName
        ? `Merhaba ${userName}. Edirne geziniz için buradayım.`
        : "Merhaba. Edirne hakkında bilgi almak ister misiniz?",
    suggestions: ["Gezilecek yerler", "Ne yenir?", "Kaç günde gezilir?"],
  };
}
