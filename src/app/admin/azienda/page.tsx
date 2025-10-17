'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

const schema = z.object({
  nome: z.string().min(1),
  descrizione: z.string(),
  colore_principale: z.string().regex(/^#[0-9a-f]{6}$/i),
})

type Form = z.infer<typeof schema>

export default function GestioneAzienda() {
  const [logoUrl, setLogoUrl] = useState<string>('')
  const { register, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('azienda').select('*').single()
      if (data) {
        reset(data)
        setLogoUrl(data.logo_url || '')
      }
    }
    fetchData()
  }, [reset])

  async function onSubmit(values: Form) {
    await supabase.from('azienda').upsert({ ...values, logo_url: logoUrl })
    alert('Salvato!')
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const filename = `${Date.now()}-${file.name}`
    const { data } = await supabase.storage
      .from('public')
      .upload(filename, file, { upsert: true })
    const url = supabase.storage.from('public').getPublicUrl(filename).data.publicUrl
    setLogoUrl(url)
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Gestisci dati Azienda</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          Nome azienda
          <input {...register('nome')} className="w-full border px-3 py-2 rounded" />
        </label>

        <label className="block">
          Descrizione
          <textarea {...register('descrizione')} rows={4} className="w-full border px-3 py-2 rounded" />
        </label>

        <label className="block">
          Colore principale (es. #1d4ed8)
          <input {...register('colore_principale')} className="w-full border px-3 py-2 rounded" />
        </label>

        <label className="block">
          Logo
          <input type="file" accept="image/*" onChange={uploadLogo} className="mt-1" />
        </label>

        {logoUrl && (
          <Image src={logoUrl} alt="Logo" width={120} height={120} className="object-contain" />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salva
        </button>
      </form>
    </div>
  )
}
