"use client";

import React, { useState } from "react";
import ChatInterface from "./ChatInterFace";
import { useAuth } from "@/contexts/AuthContext";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { user } = useAuth();

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const initialMessage = user
    ? `Merhaba ${user.name}! Edirne geziniz için size nasıl yardımcı olabilirim?`
    : "Merhaba! Edirne'yi keşfetmenize yardımcı olmak için buradayım.";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-40 transition-all duration-300 hover:scale-110 group"
        title="Edirne Rehberi"
      >
        <div className="relative">
          {/* Ana İkon */}
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 transition-all group-hover:shadow-red-500/70">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>

          {/* Pulse Efekti */}
          <div className="absolute inset-0 rounded-full bg-red-500 opacity-40 animate-ping" />

          {/* Notification Badge */}
          {isMinimized && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse border-2 border-gray-900">
              !
            </div>
          )}
        </div>
      </button>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={handleClose}
        onMinimize={handleMinimize}
        initialMessage={initialMessage}
        isAuthenticated={!!user}
        userName={user?.name}
      />
    </>
  );
};

export default Chatbot;
