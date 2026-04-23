'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type UsuarioLogado = {
  id: string
  email: string
}

type Compra = {
  id: string
  usuario_id: string
  produto_id: string
  status: string | null
  data_compra: string | null
  expira_em: string | null
}

type Produto = {
  id: string
  nome: string
  slug: string
  descricao: string | null
  ativo: boolean | null
  criado_em: string | null
}

export default function PaginaMinhasAssinaturas() {
  const router = useRouter()

  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)
  const [produtosLiberados, setProdutosLiberados] = useState<Produto[]>([])
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarAreaDoCliente() {
      setCarregando(true)
      setErro(null)

      const { data: sessaoData, error: sessaoError } =
        await supabase.auth.getSession()

      if (sessaoError) {
        console.error('Erro ao obter sessão:', sessaoError)
        router.replace('/entrar')
        return
      }

      const usuarioAuth = sessaoData.session?.user

      if (!usuarioAuth?.id || !usuarioAuth.email) {
        router.replace('/entrar')
        return
      }

      const usuarioAtual: UsuarioLogado = {
        id: usuarioAuth.id,
        email: usuarioAuth.email,
      }

      setUsuario(usuarioAtual)

      const { data: comprasData, error: comprasError } = await supabase
        .from('compras')
        .select('id, usuario_id, produto_id, status, data_compra, expira_em')
        .eq('usuario_id', usuarioAtual.id)
        .eq('status', 'pago')

      if (comprasError) {
        console.error('Erro ao buscar compras:', comprasError)
        setErro('Não foi possível carregar seus produtos liberados.')
        setCarregando(false)
        return
      }

      const compras = (comprasData ?? []) as Compra[]

      if (compras.length === 0) {
        setProdutosLiberados([])
        setCarregando(false)
        return
      }

      const idsDosProdutos = [...new Set(compras.map((compra) => compra.produto_id))]

      const { data: produtosData, error: produtosError } = await supabase
        .from('produtos')
        .select('id, nome, slug, descricao, ativo, criado_em')
        .in('id', idsDosProdutos)
        .eq('ativo', true)

      if (produtosError) {
        console.error('Erro ao buscar produtos:', produtosError)
        setErro('Não foi possível carregar os detalhes dos seus produtos.')
        setCarregando(false)
        return
      }

      setProdutosLiberados((produtosData ?? []) as Produto[])
      setCarregando(false)
    }

    carregarAreaDoCliente()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, session) => {
      const usuarioAuth = session?.user

      if (!usuarioAuth?.id || !usuarioAuth.email) {
        router.replace('/entrar')
        return
      }

      setUsuario({
        id: usuarioAuth.id,
        email: usuarioAuth.email,
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  async function sairDaConta() {
    await supabase.auth.signOut()
    router.replace('/entrar')
  }

  function obterTextoBotao(nomeProduto: string) {
    const nome = nomeProduto.toLowerCase()

    if (nome.includes('emotion')) {
      return 'Abrir página do Emotion Tab'
    }

    if (nome.includes('prospera')) {
      return 'Abrir página do ProsperaTab'
    }

    return 'Abrir página do produto'
  }

  function abrirProduto(slug: string) {
    router.push(`/minhas-assinaturas/${slug}`)
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
                Conta conectada:{' '}
                <span className="text-cyan-200">{usuario?.email}</span>
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

        {erro ? (
          <section className="rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 backdrop-blur-xl">
            <p className="text-base leading-7 text-red-100">{erro}</p>
          </section>
        ) : null}

        {produtosLiberados.length === 0 && !erro ? (
          <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Nenhum acesso liberado
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              Você ainda não possui produtos ativos
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-cyan-50/75">
              Assim que uma compra for aprovada e vinculada à sua conta, seus
              acessos aparecerão automaticamente nesta área.
            </p>
          </section>
        ) : null}

        {produtosLiberados.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-2">
            {produtosLiberados.map((produto) => (
              <article
                key={produto.id}
                className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
                  Produto liberado
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
                  {produto.nome}
                </h2>

                <p className="mt-4 leading-7 text-cyan-50/75">
                  {produto.descricao?.trim()
                    ? produto.descricao
                    : 'Seu produto já está liberado em sua área de membros.'}
                </p>

                <button
                  type="button"
                  onClick={() => abrirProduto(produto.slug)}
                  className="mt-8 rounded-2xl bg-cyan-300 px-5 py-4 text-base font-semibold text-[#031018] transition hover:opacity-90"
                >
                  {obterTextoBotao(produto.nome)}
                </button>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  )
}