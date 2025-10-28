'use client'
export const revalidate = 0

export default function CatalogoPage() {
  const [data, setData] = useState<any[]>([])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setData(data || [])
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Catalogo Prodotti</h1>
        <Link href="/" className="text-blue-600 hover:underline">Torna alla Home</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <div key={p.id} className="border rounded p-4 hover:shadow">
            {p.image_url && (
              <Image
                src={p.image_url}
                alt={p.name}
                width={300}
                height={200}
                className="object-cover w-full h-48 rounded mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-700 mt-1">{p.description}</p>
            {p.price && (
              <p className="mt-2 text-lg font-bold text-blue-700">
                € {Number(p.price).toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
