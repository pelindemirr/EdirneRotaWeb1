"use client";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Lütfen e-posta adresinizi girin!");
      return;
    }
    setSubmitted(true);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <button
          className="flex items-center gap-2 px-4 py-2 mb-8 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200 shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 group"
          onClick={() => router.push("/auth/login")}
        >
          <ArrowLeft className="h-4 w-4 text-slate-700 group-hover:text-indigo-600 transition-colors" />
          <span className="text-slate-700 font-medium text-sm">Girişe Dön</span>
        </button>
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-8">
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-600 to-red-300 bg-clip-text text-transparent">
            Şifremi Unuttum
          </h2>
          <p className="text-slate-600 text-center mb-6">
            Kayıtlı e-posta adresinizi girin. Şifre sıfırlama bağlantısı size
            iletilecek.
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-center">
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-red-600 focus:bg-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-slate-900"
                  placeholder="E-posta adresiniz"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-white-400 to-red-600 hover:from-red-500 hover:to-white-700 text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mt-2"
              >
                Şifre Sıfırla
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
