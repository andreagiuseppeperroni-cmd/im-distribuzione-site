'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push('/admin/login')
      else setUser(data.user)
    }
    checkUser()
  }, [router])

  if (!user) return <p className="p-8">Verifica autorizzazione…</p>

  return (
    <section className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pannello Amministratore</h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/admin/login')
          }}
          className="text-sm text-gray-600 hover:underline"
        >
          Esci
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/azienda"
          className="border rounded p-4 hover:shadow"
        >
          <h2 className="text-lg font-semibold">Gestisci Azienda</h2>
          <p className="text-gray-600">Modifica nome, logo, descrizione, colori</p>
        </Link>

        <Link
          href="/admin/catalogo"
          className="border rounded p-4 hover:shadow"
        >
          <h2 className="text-lg font-semibold">Gestisci Catalogo</h2>
          <p className="text-gray-600">Aggiungi, modifica o elimina prodotti</p>
        </Link>
      </div>
    </section>
  )
}
