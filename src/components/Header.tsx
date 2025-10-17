'use client'

import Link from 'next/link'
import { User, LogIn, Package } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function Header() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [])

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-700">
        I.M. DISTRIBUZIONE
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          href="/catalogo"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Package size={18} />
          Catalogo
        </Link>

        {user ? (
          <Link
            href="/admin"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <User size={18} />
            Admin
          </Link>
        ) : (
          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}
