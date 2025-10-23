'use client'

export const revalidate = 0

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
  prezzo: z.coerce.number().positive(),
  categoria: z.string(),
  quantita: z.coerce.number().int().min(0),
})

type Form = z.infer<typeof schema>

export default function NewProduct() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const { register, handleSubmit, reset, getValues } = useForm<Form>({ resolver: zodResolver(schema) })
  const router = useRouter()

  async function onSubmit(values: Form) {
    await supabase.from('products').insert({
      name: values.nome,
      description: values.descrizione,
      price: values.prezzo,
      category: values.categoria || 'Generico',
      stock_quantity: values.quantita || 0,
    })
    await fetchProdotti()
    router.push('/admin/catalogo')
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const filename = `${Date.now()}-${file.name}`
    const { data } = await supabase.storage.from('images').upload(filename, file, { upsert: true })
    const url = supabase.storage.from('images').getPublicUrl(filename).data.publicUrl
    setImageUrl(url)
    reset({ ...getValues() })   
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Nuovo Prodotto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">Nome<input {...register('nome')} className="w-full border px-3 py-2 rounded" required /></label>
        <label className="block">Descrizione<textarea {...register('descrizione')} rows={3} className="w-full border px-3 py-2 rounded" /></label>
        <label className="block">Prezzo (€)<input type="number" step="0.01" {...register('prezzo')} className="w-full border px-3 py-2 rounded" /></label>
        <label className="block">Categoria<input {...register('categoria')} className="w-full border px-3 py-2 rounded" /></label>
        <label className="block">Quantità<input type="number" {...register('quantita')} className="w-full border px-3 py-2 rounded" /></label>
        <label className="block">Immagine<input type="file" accept="image/*" onChange={uploadLogo} className="mt-1" /></label>
        {imageUrl && <img src={imageUrl} alt="preview" className="h-32 object-contain" />}
        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salva</button>
          <a href="/admin/catalogo" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Annulla</a>
        </div>
      </form>
    </div>
  )
}
