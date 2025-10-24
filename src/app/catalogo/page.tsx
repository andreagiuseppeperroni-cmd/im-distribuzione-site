'use client'
export const revalidate = 0

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CatalogoPage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      setProducts(data || [])
    }
    fetchProducts()
  }, [])

  return (
    <section className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Catalogo Prodotti</h1>
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Torna alla Home
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-4 hover:shadow">
            {p.immagine_url && (
              <Image
                src={p.immagine_url}
                alt={p.nome}
                width={300}
                height={200}
                className="object-cover w-full h-48 rounded mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">{p.nome}</h2>
            <p className="text-gray-700 mt-1">{p.descrizione}</p>
            {p.prezzo && (
              <p className="mt-2 text-lg font-bold text-blue-700">
                € {Number(p.prezzo).toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
