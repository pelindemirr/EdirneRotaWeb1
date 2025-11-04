"use client";
import React from "react";
import { Users, MapPin, Sparkles } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
            Nasıl{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
              Çalışır?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            3 basit adımda Edirne maceranız başlıyor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-200 via-red-400 to-red-200"></div>

          {/* Step 1 */}
          <div className="relative text-center group">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl text-3xl font-bold mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/50">
              1
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kayıt Ol</h3>
              <p className="text-gray-600 leading-relaxed">
                Hızlı ve kolay kayıt ile hesabını oluştur, profilini
                kişiselleştir
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative text-center group">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl text-3xl font-bold mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-orange-500/50">
              2
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rota Seç</h3>
              <p className="text-gray-600 leading-relaxed">
                İlgi alanlarına göre hazır rotalardan birini seç veya kendi
                rotanı oluştur
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative text-center group">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl text-3xl font-bold mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/50">
              3
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Keşfet</h3>
              <p className="text-gray-600 leading-relaxed">
                AI rehber eşliğinde Edirne'yi keşfet, anılarını paylaş ve
                rozetler kazan
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-red-500/50 flex items-center mx-auto gap-2"
            onClick={() => (window.location.href = "/auth/login")}
          >
            <Sparkles className="w-5 h-5" />
            Hemen Başla
            <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
