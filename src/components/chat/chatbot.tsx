"use client";

import React, { useState } from "react";
import ChatInterface from "./ChatInterFace";
import { useAuth } from "@/contexts/AuthContext";
const chatboticon = "/assets/chatbot/chatbot.png";

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
          <img
            src={chatboticon}
            className="w-26 h-26 rounded-full shadow-lg animate-bounce"
          />
          {/* Pulse Efekti */}
          <div className="absolute -inset-1 rounded-full border border-red-500" />

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
