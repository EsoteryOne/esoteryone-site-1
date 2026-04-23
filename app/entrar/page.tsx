'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Entrar() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/minhas-assinaturas`
      }
    })
  }

  async function loginEmail(e: any) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (error) {
      alert("Erro no login")
      return
    }

    router.push('/minhas-assinaturas')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
      <div className="w-full max-w-md space-y-4 p-6 border border-white/10 rounded-xl">

        <h1 className="text-xl font-bold">Entrar</h1>

        <button
          onClick={loginGoogle}
          className="w-full bg-cyan-300 text-black py-2 rounded"
        >
          Entrar com Google
        </button>

        <form onSubmit={loginEmail} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 bg-black border border-white/10"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 bg-black border border-white/10"
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className="w-full bg-white text-black py-2">
            Entrar com email
          </button>
        </form>
      </div>
    </main>
  )
}