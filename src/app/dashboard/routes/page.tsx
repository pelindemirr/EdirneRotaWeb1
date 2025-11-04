export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">
            EdirneGez - Rotalarım
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rotalarım</h1>
          <p className="text-gray-600">
            Oluşturduğunuz ve kaydettiğiniz rotalar
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">Henüz rota oluşturmadınız.</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            İlk Rotayı Oluştur
          </button>
        </div>
      </main>
    </div>
  );
}
