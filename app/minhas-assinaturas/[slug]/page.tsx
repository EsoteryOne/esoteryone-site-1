'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Produto = {
  id: string
  nome: string
  slug: string
  descricao: string | null
  ativo: boolean | null
}

type ConteudoProduto = {
  tituloDownload: string
  descricaoDownload: string
  botaoDownload: string
  linkDownload: string
  tituloTutorial: string
  descricaoTutorial: string
  botaoTutorial: string
  linkTutorial: string
  instrucoes: string[]
}

export default function PaginaInternaDoProduto() {
  const params = useParams()
  const router = useRouter()

  const slug = useMemo(() => {
    const valor = params?.slug
    return Array.isArray(valor) ? valor[0] : valor
  }, [params])

  const [carregando, setCarregando] = useState(true)
  const [produto, setProduto] = useState<Produto | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarPagina() {
      setCarregando(true)
      setErro(null)

      const { data: sessaoData, error: sessaoError } =
        await supabase.auth.getSession()

      if (sessaoError) {
        router.replace('/entrar')
        return
      }

      const usuario = sessaoData.session?.user

      if (!usuario?.id) {
        router.replace('/entrar')
        return
      }

      if (!slug) {
        setErro('Produto não encontrado.')
        setCarregando(false)
        return
      }

      const { data: produtoData, error: produtoError } = await supabase
        .from('produtos')
        .select('id, nome, slug, descricao, ativo')
        .eq('slug', slug)
        .eq('ativo', true)
        .maybeSingle()

      if (produtoError || !produtoData) {
        setErro('Produto não encontrado.')
        setCarregando(false)
        return
      }

      const { data: compraData, error: compraError } = await supabase
        .from('compras')
        .select('id')
        .eq('usuario_id', usuario.id)
        .eq('produto_id', produtoData.id)
        .eq('status', 'pago')
        .maybeSingle()

      if (compraError) {
        setErro('Não foi possível validar o seu acesso.')
        setCarregando(false)
        return
      }

      if (!compraData) {
        setErro('Você não possui acesso liberado para este produto.')
        setCarregando(false)
        return
      }

      setProduto(produtoData as Produto)
      setCarregando(false)
    }

    carregarPagina()
  }, [router, slug])

  function obterConteudoDoProduto(slugProduto: string): ConteudoProduto {
    if (slugProduto === 'emotion-tab') {
      return {
        tituloDownload: 'Download do Emotion Tab',
        descricaoDownload:
          'Baixe aqui o instalador oficial do Emotion Tab, com os arquivos validados para uso no sistema.',
        botaoDownload: 'Baixar instalador do Emotion Tab',
        linkDownload: '#',
        tituloTutorial: 'Tutorial de instalação e uso',
        descricaoTutorial:
          'Assista ao treinamento completo com instalação, ativação, primeiros passos e orientações práticas.',
        botaoTutorial: 'Assistir tutorial do Emotion Tab',
        linkTutorial: '#',
        instrucoes: [
          'Baixe o instalador oficial do sistema.',
          'Extraia os arquivos, caso o pacote venha compactado.',
          'Execute o instalador no computador indicado para uso do sistema.',
          'Siga o tutorial de ativação antes do primeiro atendimento.',
        ],
      }
    }

    if (slugProduto === 'prospera-tab') {
      return {
        tituloDownload: 'Download do ProsperaTab',
        descricaoDownload:
          'Baixe aqui o instalador oficial do ProsperaTab, com os arquivos mais recentes liberados para sua conta.',
        botaoDownload: 'Baixar instalador do ProsperaTab',
        linkDownload: '#',
        tituloTutorial: 'Tutorial de instalação e configuração',
        descricaoTutorial:
          'Veja o passo a passo completo de instalação, ativação e uso inicial do ProsperaTab.',
        botaoTutorial: 'Assistir tutorial do ProsperaTab',
        linkTutorial: '#',
        instrucoes: [
          'Baixe o instalador oficial do produto.',
          'Faça a instalação no computador que será usado nos atendimentos.',
          'Abra o treinamento para seguir o processo de ativação com segurança.',
          'Finalize a configuração antes de começar a usar o sistema com clientes.',
        ],
      }
    }

    return {
      tituloDownload: 'Download do produto',
      descricaoDownload:
        'Baixe aqui os arquivos oficiais liberados para sua conta.',
      botaoDownload: 'Baixar arquivos',
      linkDownload: '#',
      tituloTutorial: 'Tutorial do produto',
      descricaoTutorial:
        'Assista ao conteúdo de orientação e veja o passo a passo de uso.',
      botaoTutorial: 'Assistir tutorial',
      linkTutorial: '#',
      instrucoes: [
        'Baixe os arquivos oficiais do produto.',
        'Leia as instruções de uso antes de começar.',
        'Acesse o tutorial para configurar corretamente.',
      ],
    }
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-cyan-50">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <p className="text-cyan-50/75">Carregando produto...</p>
        </div>
      </main>
    )
  }

  if (erro || !produto) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-cyan-50">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-semibold text-cyan-50">
            Acesso indisponível
          </h1>

          <p className="mt-4 leading-7 text-red-100">
            {erro ?? 'Não foi possível carregar este produto.'}
          </p>

          <button
            type="button"
            onClick={() => router.push('/minhas-assinaturas')}
            className="mt-8 rounded-2xl border border-cyan-300/25 px-5 py-4 text-base font-semibold text-cyan-50 transition hover:bg-cyan-300/10"
          >
            Voltar para minha área
          </button>
        </div>
      </main>
    )
  }

  const conteudo = obterConteudoDoProduto(produto.slug)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-cyan-50">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Produto liberado
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-cyan-50">
            {produto.nome}
          </h1>

          <p className="mt-4 max-w-4xl leading-7 text-cyan-50/75">
            {produto.descricao || 'Seu produto está liberado nesta área exclusiva.'}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Download
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              {conteudo.tituloDownload}
            </h2>

            <p className="mt-4 leading-7 text-cyan-50/75">
              {conteudo.descricaoDownload}
            </p>

            <a
              href={conteudo.linkDownload}
              className="mt-8 inline-flex rounded-2xl bg-cyan-300 px-5 py-4 text-base font-semibold text-[#031018] transition hover:opacity-90"
            >
              {conteudo.botaoDownload}
            </a>
          </article>

          <article className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Tutorial
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              {conteudo.tituloTutorial}
            </h2>

            <p className="mt-4 leading-7 text-cyan-50/75">
              {conteudo.descricaoTutorial}
            </p>

            <a
              href={conteudo.linkTutorial}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-2xl border border-cyan-300/25 px-5 py-4 text-base font-semibold text-cyan-50 transition hover:bg-cyan-300/10"
            >
              {conteudo.botaoTutorial}
            </a>
          </article>
        </section>

        <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Instruções importantes
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
            Passo a passo para começar
          </h2>

          <div className="mt-6 space-y-4">
            {conteudo.instrucoes.map((item, index) => (
              <div
                key={`${produto.slug}-${index}`}
                className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-5"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
                  Etapa {index + 1}
                </p>

                <p className="mt-3 leading-7 text-cyan-50/80">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <div>
          <button
            type="button"
            onClick={() => router.push('/minhas-assinaturas')}
            className="rounded-2xl border border-cyan-300/25 px-5 py-4 text-base font-semibold text-cyan-50 transition hover:bg-cyan-300/10"
          >
            Voltar para minha área
          </button>
        </div>
      </div>
    </main>
  )
}