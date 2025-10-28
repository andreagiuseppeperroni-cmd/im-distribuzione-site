'use client'
export const revalidate = 0

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-8 py-12 text-gray-800">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">I.M. DISTRIBUZINE</h1>
        <p className="text-xl mb-6">Il fornitore giusto per te</p>
        <div className="grid grid-cols-2 text-center mb-12">
          <div className="border rounded p-4">
            <div className="text-3xl font-bold">1,200+</div>
            <div className="text-sm">Clienti Attivi</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-3xl font-bold">5,000+</div>
            <div className="text-sm">Prodotti</div>
          </div>
        </div>
        <div className="text-center">
          <a href="/catalogo" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Vai al Catalogo</a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">La Nostra Storia</h2>
        <p className="mb-4">
          Fondata nel 1990, I.M. Distribuzione nasce dalla passione e dall’esperienza di una famiglia italiana nel settore della distribuzione.
        </p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="border rounded p-4">
            <div className="text-3xl font-bold">30+</div>
            <div className="text-sm">Anni di Esperienza</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-3xl font-bold">15+</div>
            <div className="text-sm">Partner di Distribuzione</div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <a href="/catalogo" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Vai al Catalogo</a>
        </section>
    </main>
  )
}
