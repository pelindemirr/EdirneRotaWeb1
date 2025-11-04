"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const { login } = useAuth();

  // Mock kullanıcı verileri
  const mockUsers = {
    "test@edirne.com": {
      password: "123456",
      name: "Test Kullanıcısı",
      id: "1",
    },
    "admin@edirne.com": {
      password: "123",
      name: "Admin",
      id: "2",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Giriş yapma
      const user = mockUsers[formData.email as keyof typeof mockUsers];

      if (!user) {
        setError("Bu e-posta adresi kayıtlı değil!");
        return;
      }

      if (user.password !== formData.password) {
        setError("Şifre hatalı!");
        return;
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: formData.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      };

      login(userData);
      onClose();
      setFormData({ email: "", password: "", name: "" });
    } else {
      // Kayıt olma (basit mock)
      if (!formData.name.trim()) {
        setError("Lütfen adınızı girin!");
        return;
      }

      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      };

      login(userData);
      onClose();
      setFormData({ email: "", password: "", name: "" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Hata mesajını temizle
    if (error) setError("");
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({ email: "", password: "", name: "" });
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header with Edirne theme */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              {isLogin ? "Hoş Geldiniz" : "Edirne'ye Katılın"}
            </h2>
            <p className="text-red-100 text-base">
              {isLogin ? "Rotalarınıza devam edin" : "Yeni maceralara başlayın"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white hover:text-red-200 transition-all duration-300 hover:scale-110 bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Hata mesajı */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Demo bilgileri */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-gray-700 px-4 py-4 rounded-xl">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm">
                <strong className="text-red-700">Demo Hesapları:</strong>
                <div className="mt-2 space-y-1">
                  <div className="font-mono text-xs bg-white px-2 py-1 rounded">
                    test@edirne.com | 🔑 123456
                  </div>
                  <div className="font-mono text-xs bg-white px-2 py-1 rounded">
                    admin@edirne.com | 🔑 123
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Adınız
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-400"
                placeholder="Adınızı girin"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-400"
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {isLogin ? " Giriş Yap" : " Hesap Oluştur"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">veya</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold transition-all border-2 border-gray-200 hover:border-gray-300"
          >
            {isLogin
              ? "🌟 Hesap oluşturmak istiyorum"
              : "🔑 Zaten hesabım var, giriş yapacağım"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
