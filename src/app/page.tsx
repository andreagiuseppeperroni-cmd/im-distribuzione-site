'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [azienda, setAzienda] = useState<any>(null)

  useEffect(() => {
    async function fetchAzienda() {
      const { data } = await supabase.from('azienda').select('*').single()
      setAzienda(data)
    }
    fetchAzienda()
  }, [])

  if (!azienda) return <p className="p-8">Caricamento…</p>

  return (
    <section className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-6 mb-6">
        {azienda.logo_url && (
          <Image
            src={azienda.logo_url}
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{azienda.nome}</h1>
          <p className="text-gray-700 mt-2">{azienda.descrizione}</p>
        </div>
      </div>

      <div className="mt-8">
        <a
          href="/catalogo"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Vai al Catalogo
        </a>
      </div>
    </section>
  )
}
