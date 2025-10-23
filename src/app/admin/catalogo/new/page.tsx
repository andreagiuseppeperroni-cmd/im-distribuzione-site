'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
async function fetchProdotti() {
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  return data || []
}
const schema = z.object({
  nome: z.string().min(1),
  descrizione: z.string(),
  prezzo: z.coerce.number().positive().optional(),
})

type Form = z.infer<typeof schema>

export default function NewProduct() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) })
 const [imageUrl, setImageUrl] = useState<string>('')

await supabase.from('products').insert({
  name: values.nome,
  description: values.descrizione,
  price: values.prezzo,
  category: values.categoria || 'Generico',
  stock_quantity: values.quantita || 0,
})
  // ↓↓↓  Ricarica lista  ↓↓↓
  await fetchProdotti()
  router.push('/admin/catalogo')
}

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const filename = `${Date.now()}-${file.name}`
    const { data } = await supabase.storage.from('public').upload(filename, file, { upsert: true })
    const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(filename)
const url = publicUrl.publicUrl
    setImageUrl(url)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Nuovo Prodotto</h1>

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
            Salva
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
