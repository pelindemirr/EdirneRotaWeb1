"use client";

import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { X, Minus, Send, Loader2, Clock, Info } from "lucide-react";
const chatboticon = "/assets/chatbot/chatbot.png";
import { getChatResponse } from "./chatUtil";

// TODO: deneme
// ? deneme 2;
// ! deneme
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  initialMessage: string;
  isAuthenticated: boolean;
  userName?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  onMinimize,
  initialMessage,
  isAuthenticated,
  userName,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          text: initialMessage,
          sender: "bot",
          timestamp: new Date(),
          suggestions: [
            "Selimiye Camii hakkında bilgi ver",
            "Edirne'de ne yenir?",
            "Tarihi yerler",
            "Konaklama önerileri",
          ],
        },
      ]);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string = inputValue) => {
    console.log("handleSendMessage called", text);
    if (!text.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const botResponse = await getChatResponse(text.trim());
      const botMessage: Message = {
        id: uuidv4(),
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      console.error("handleSendMessage error", e);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "Bir hata oluştu. Lütfen tekrar deneyin.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-110 h-[700px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col border-2 border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          <div className=" rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={chatboticon}
              alt="Chatbot Icon"
              className="w-11 h-11 object-cover"
            />
          </div>
          <div>
            <h3 className="text-gray-800 font-bold text-lg text-red-700">
              Sanal Kızan
            </h3>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all"
          >
            <Minus className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-gray-700/70"
                      : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Suggestions */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-2">
                {message.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full border border-gray-300 transition-all hover:border-red-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 border border-gray-300">
              <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Bir şeyler sorun..."
            className="flex-1 bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="bg-red-500 text-white rounded-xl px-4 py-3 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-red-200/50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Edirne hakkında her şeyi sorabilirsiniz
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
