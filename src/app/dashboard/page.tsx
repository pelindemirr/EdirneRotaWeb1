export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">EdirneGez - Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hoş Geldiniz!</h1>
          <p className="text-gray-600">Kişisel rota önerileriniz ve keşif geçmişiniz</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Rotalarım</h3>
            <p className="text-gray-600 text-sm">Kaydettiğiniz rotalar</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Favori Yerler</h3>
            <p className="text-gray-600 text-sm">Beğendiğiniz lokasyonlar</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Profil</h3>
            <p className="text-gray-600 text-sm">Hesap ayarlarınız</p>
          </div>
        </div>
      </main>
    </div>
  );
}