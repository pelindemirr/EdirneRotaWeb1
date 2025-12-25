"use client";

import { useState, useContext } from "react";
import { addUserRoute } from "../utils/userRoutes";
import { AuthContext } from "../contexts/AuthContext";
import { characterRoutes } from "../data/characterRoutes";

type CharacterType = keyof typeof characterRoutes;

interface CharacterSelectProps {
  selectedCharacter: string | null;
  onSelect: (type: string) => void;
  onShowRoute: () => void;
  showRouteButton: boolean;
}

const CHARACTER_TYPES = [
  "Maceracı",
  "Kültür Meraklısı",
  "Gurme",
  "Doğa Sever",
  "Fotoğrafçı",
  "Sanatsever",
];

export default function CharacterSelectModal({
  selectedCharacter,
  onSelect,
  onShowRoute,
  showRouteButton,
}: CharacterSelectProps) {
  const [showRouteModal, setShowRouteModal] = useState(false);
  const auth = useContext(AuthContext);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Blurred overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{ zIndex: 1 }}
      />
      {/* Modal content */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-fadeIn">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 mb-4 shadow-lg">
          <span role="img" aria-label="character" className="text-3xl">
            🧭
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-red-700">
          Karakter Tipini Seç
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Sana en uygun rotayı önerebilmemiz için lütfen bir karakter tipi seç:
        </p>
        <div className="grid grid-cols-2 gap-3 w-full mb-4">
          {CHARACTER_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`py-3 rounded-lg font-semibold text-sm transition border-2 ${
                selectedCharacter === type
                  ? "bg-red-600 text-white border-red-700 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {showRouteButton && (
          <button
            onClick={() => setShowRouteModal(true)}
            className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold shadow-lg hover:from-red-700 hover:to-yellow-600 transition text-lg"
          >
            Rota Gör
          </button>
        )}
      </div>

      {/* Rota önerileri modalı */}
      {showRouteModal && selectedCharacter && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowRouteModal(false)}
          />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-fadeIn">
            <h3 className="text-xl font-bold text-red-700 mb-4">
              {selectedCharacter} için Önerilen Rotalar
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 w-full">
              {characterRoutes[selectedCharacter as CharacterType].map(
                (route: string, idx: number) => (
                  <li key={idx}>{route}</li>
                )
              )}
            </ul>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowRouteModal(false)}
                className="mt-2 w-1/2 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  if (!auth?.user?.id) {
                    alert(
                      "Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın."
                    );
                    return;
                  }
                  const name = `${selectedCharacter} Rota Önerisi`;
                  const places =
                    characterRoutes[selectedCharacter as CharacterType];
                  addUserRoute(auth.user.id, { name, places });
                  setShowRouteModal(false);
                  onShowRoute();
                }}
                className="mt-2 w-1/2 py-2 rounded-lg bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold shadow-lg hover:from-red-700 hover:to-yellow-600 transition"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
