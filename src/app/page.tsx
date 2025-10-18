export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">La Nostra Storia: Im Distribuzione & Im Clean</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Im Distribuzione: Le Fondamenta e il Core</h2>
        <p className="mb-4">
          Fondata nel 1994, Im Distribuzione è nata con una visione chiara: rivoluzionare la distribuzione di prodotti cartari in Italia e oltre. Iniziando come piccola azienda familiare, abbiamo costruito solide relazioni con fornitori e clienti in tutta la regione.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>2000-2010: Crescita ed Espansione</li>
          <li>2010-2020: Leadership di Mercato</li>
          <li>2021-Presente: Futuro Sostenibile</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Im Clean: Sviluppo e Specializzazione</h2>
        <p className="mb-4">
          Est. 2008 – Specializzazione Strategica: riconoscendo la crescente domanda di prodotti professionali per la pulizia e l’igiene, abbiamo fondato Im Clean per concentrarci su questo segmento.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>2012-2018: Innovazione di Prodotto</li>
          <li>2018-2020: Leadership del Settore</li>
          <li>2020-Presente: Trasformazione Digitale</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Risultati Chiave</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="border rounded p-4"><div className="text-3xl font-bold">1000+</div><div className="text-sm">Clienti Attivi</div></div>
          <div className="border rounded p-4"><div className="text-3xl font-bold">25+</div><div className="text-sm">Anni di Esperienza</div></div>
          <div className="border rounded p-4"><div className="text-3xl font-bold">500+</div><div className="text-sm">Varianti di Prodotto</div></div>
          <div className="border rounded p-4"><div className="text-3xl font-bold">15+</div><div className="text-sm">Partner di Distribuzione</div></div>
        </div>
      </section>

      <section className="text-center mt-10">
        <a
          href="/catalogo"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Scopri i Prodotti
        </a>
      </section>
    </main>
  )
}
