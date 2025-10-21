'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminCatalogo() {
  const [prodotti, setProdotti] = useState<any[]>([])

  useEffect(() => {
    fetchProdotti()
  }, [])

  async function fetchProdotti() {
   const { data } = await supabase
  .from('products')
  .select('*')
  .order('created_at', { ascending: false })
  .cache('no-store')   // forza aggiornamento
  }

  async function elimina(id: number) {
    if (!confirm('Eliminare questo prodotto?')) return
    await supabase.from('prodotti').delete().eq('id', id)
    fetchProdotti()
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestione Catalogo</h1>
        <Link
          href="/admin/catalogo/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Aggiungi prodotto
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prodotti.map((p) => (
          <div key={p.id} className="border rounded p-4">
            {p.immagine_url && (
              <Image
                src={p.immagine_url}
                alt={p.nome}
                width={300}
                height={200}
                className="object-cover w-full h-40 rounded mb-3"
              />
            )}
            <h2 className="text-lg font-semibold">{p.nome}</h2>
            <p className="text-gray-700 text-sm mt-1">{p.descrizione}</p>
            {p.prezzo && <p className="mt-2 font-bold">€ {Number(p.prezzo).toFixed(2)}</p>}

            <div className="mt-3 flex gap-2">
              <Link
                href={`/admin/catalogo/edit/${p.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Modifica
              </Link>
              <button
                onClick={() => elimina(p.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
