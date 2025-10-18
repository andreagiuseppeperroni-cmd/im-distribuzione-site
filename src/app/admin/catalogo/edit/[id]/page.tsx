'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

const schema = z.object({
  nome: z.string().min(1),
  descrizione: z.string(),
  prezzo: z.coerce.number().positive().optional(),
})

type Form = z.infer<typeof schema>

export default function EditProduct() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [imageUrl, setImageUrl] = useState<string>('')
  const { register, handleSubmit, reset } = useForm<Form>({ resolver: zodResolver(schema) })

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase.from('prodotti').select('*').eq('id', id).single()
      if (data) {
        reset(data)
        setImageUrl(data.immagine_url || '')
      }
    }
    fetchProduct()
  }, [id, reset])

  async function onSubmit(values: Form) {
    await supabase.from('prodotti').update({ ...values, immagine_url: imageUrl }).eq('id', id)
    router.push('/admin/catalogo')
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const filename = `${Date.now()}-${file.name}`
    const { data } = await supabase.storage.from('public').upload(filename, file, { upsert: true })
    const url = supabase.storage.from('public').getPublicUrl(filename).data.publicUrl
    setImageUrl(url)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Modifica Prodotto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          Nome
          <input {...register('nome')} className="w-full border px-3 py-2 rounded" required />
        </label>

        <label className="block">
          Descrizione
          <textarea {...register('descrizione')} rows={3} className="w-full border px-3 py-2 rounded" />
        </label>

        <label className="block">
          Prezzo (€)
          <input type="number" step="0.01" {...register('prezzo')} className="w-full border px-3 py-2 rounded" />
        </label>

        <label className="block">
          Immagine
          <input type="file" accept="image/*" onChange={uploadImage} className="mt-1" />
        </label>

        {imageUrl && <img src={imageUrl} alt="preview" className="h-32 object-contain" />}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salva modifiche
          </button>
          <a
            href="/admin/catalogo"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Annulla
          </a>
        </div>
      </form>
    </div>
  )
}
