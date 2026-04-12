'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type UsuarioLogado = {
  email: string
}

export default function PaginaMinhasAssinaturas() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)

  useEffect(() => {
    async function verificarSessao() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        router.replace('/entrar')
        return
      }

      const emailUsuario = data.session?.user?.email

      if (!emailUsuario) {
        router.replace('/entrar')
        return
      }

      setUsuario({ email: emailUsuario })
      setCarregando(false)
    }

    verificarSessao()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, session) => {
      const emailUsuario = session?.user?.email

      if (!emailUsuario) {
        router.replace('/entrar')
        return
      }

      setUsuario({ email: emailUsuario })
      setCarregando(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  async function sairDaConta() {
    await supabase.auth.signOut()
    router.replace('/entrar')
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-cyan-50">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <p className="text-cyan-50/75">Carregando sua área de membros...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-cyan-50">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
                Área de membros
              </p>

              <h1 className="mt-4 text-4xl font-semibold leading-tight text-cyan-50">
                Bem-vindo à sua área exclusiva
              </h1>

              <p className="mt-4 text-base leading-7 text-cyan-50/75">
                Conta conectada: <span className="text-cyan-200">{usuario?.email}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={sairDaConta}
              className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/10"
            >
              Sair
            </button>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Produto liberado
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              Emotion Tab
            </h2>

            <p className="mt-4 leading-7 text-cyan-50/75">
              Aqui ficará o download do instalador, os arquivos oficiais e os materiais de apoio do sistema.
            </p>

            <button
              type="button"
              className="mt-8 rounded-2xl bg-cyan-300 px-5 py-4 text-base font-semibold text-[#031018] transition hover:opacity-90"
            >
              Baixar instalador
            </button>
          </article>

          <article className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Treinamento
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              Conteúdo de acesso
            </h2>

            <p className="mt-4 leading-7 text-cyan-50/75">
              Aqui ficarão seus vídeos, orientações, passo a passo de instalação e instruções de ativação.
            </p>

            <button
              type="button"
              className="mt-8 rounded-2xl border border-cyan-300/25 px-5 py-4 text-base font-semibold text-cyan-50 transition hover:bg-cyan-300/10"
            >
              Ver treinamento
            </button>
          </article>
        </section>
      </div>
    </main>
  )
}