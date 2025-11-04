export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent mb-6">
              Edirne Rota
            </h3>
            <p className="text-slate-600 mb-6 max-w-md leading-relaxed text-lg">
              Edirne'nin tarihi güzelliklerini ve saklı hazinelerini keşfedin.
              Kişiliğinize özel hazırlanmış rotalarla unutulmaz anılar
              biriktirin.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <span className="text-slate-600">📱</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <span className="text-slate-600">📧</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <span className="text-slate-600">🌐</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-6 text-lg">
              Keşfedilecek Yerler
            </h4>
            <ul className="space-y-3 text-slate-600">
              <li>
                <a
                  href="#"
                  className="hover:text-slate-800 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-600 transition-colors"></span>
                  Selimiye Camii
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-slate-800 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-600 transition-colors"></span>
                  Meriç Nehri
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-slate-800 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-600 transition-colors"></span>
                  Saray-ı Cedide-i Amire
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-slate-800 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3 group-hover:bg-slate-600 transition-colors"></span>
                  Enez Antik Kenti
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-6 text-lg">
              İletişim Bilgileri
            </h4>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mr-3">
                  📧
                </div>
                <span>info@edirnerota.com</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mr-3">
                  📱
                </div>
                <span>0546 881 ** ** </span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mr-3">
                  📍
                </div>
                <span>Edirne Merkez, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">
              &copy; 2025 Edirne Rota. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 text-sm text-slate-500">
              <a
                href="#"
                className="hover:text-slate-700 transition-colors duration-300"
              >
                Gizlilik Politikası
              </a>
              <a
                href="#"
                className="hover:text-slate-700 transition-colors duration-300"
              >
                Kullanım Şartları
              </a>
              <a
                href="#"
                className="hover:text-slate-700 transition-colors duration-300"
              >
                Destek
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
