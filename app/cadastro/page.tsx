'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Cadastro() {
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [repetirSenha, setRepetirSenha] = useState('')
  const [carregandoCadastro, setCarregandoCadastro] = useState(false)
  const [carregandoGoogle, setCarregandoGoogle] = useState(false)

  function formatarTelefone(valor: string) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11)

    if (numeros.length <= 2) {
      return numeros
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }

  async function cadastrarComGoogle() {
    try {
      setCarregandoGoogle(true)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/minhas-assinaturas`,
        },
      })

      if (error) {
        alert('Não foi possível iniciar o cadastro com Google.')
        console.error(error)
      }
    } catch (erro) {
      alert('Ocorreu um erro inesperado ao iniciar o cadastro com Google.')
      console.error(erro)
    } finally {
      setCarregandoGoogle(false)
    }
  }

  async function cadastrarComEmail(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!nome.trim()) {
      alert('Preencha o nome.')
      return
    }

    if (!telefone.trim()) {
      alert('Preencha o telefone.')
      return
    }

    if (!email.trim()) {
      alert('Preencha o e-mail.')
      return
    }

    if (!senha.trim()) {
      alert('Preencha a senha.')
      return
    }

    if (!repetirSenha.trim()) {
      alert('Repita a senha.')
      return
    }

    if (senha !== repetirSenha) {
      alert('As senhas não coincidem.')
      return
    }

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    try {
      setCarregandoCadastro(true)

      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
      })

      if (error) {
        alert('Não foi possível concluir o cadastro.')
        console.error(error)
        return
      }

      const usuarioId = data.user?.id

      if (!usuarioId) {
        alert('Cadastro criado, mas não foi possível identificar o usuário.')
        return
      }

      const { error: erroTabelaUsuarios } = await supabase.from('usuarios').insert({
        id: usuarioId,
        nome: nome.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        acesso_liberado: false,
      })

      if (erroTabelaUsuarios) {
        alert('O cadastro foi criado, mas houve erro ao salvar os dados do perfil.')
        console.error(erroTabelaUsuarios)
        return
      }

      alert('Cadastro realizado com sucesso. Agora você já pode entrar na sua conta.')
      router.push('/entrar')
    } catch (erro) {
      alert('Ocorreu um erro inesperado ao criar a conta.')
      console.error(erro)
    } finally {
      setCarregandoCadastro(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-cyan-50">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          Área de membros
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight text-cyan-50">
          Criar conta
        </h1>

        <p className="mt-4 text-base leading-7 text-cyan-50/75">
          Cadastre seus dados para acessar sua área exclusiva, seus materiais e seus produtos.
        </p>

        <button
          type="button"
          onClick={cadastrarComGoogle}
          disabled={carregandoGoogle}
          className="mt-8 w-full rounded-2xl bg-cyan-300 px-5 py-4 text-base font-semibold text-[#031018] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {carregandoGoogle ? 'Abrindo Google...' : 'Cadastrar com Google'}
        </button>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-cyan-300/20" />
          <span className="text-sm text-cyan-50/55">ou cadastre com e-mail</span>
          <div className="h-px flex-1 bg-cyan-300/20" />
        </div>

        <form onSubmit={cadastrarComEmail} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-50/80">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              className="w-full rounded-2xl border border-cyan-300/20 bg-[#071827] px-4 py-4 text-cyan-50 outline-none transition focus:border-cyan-300/50"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-50/80">
              Telefone
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={(evento) => setTelefone(formatarTelefone(evento.target.value))}
              className="w-full rounded-2xl border border-cyan-300/20 bg-[#071827] px-4 py-4 text-cyan-50 outline-none transition focus:border-cyan-300/50"
              placeholder="(51) 99999-9999"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-50/80">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              className="w-full rounded-2xl border border-cyan-300/20 bg-[#071827] px-4 py-4 text-cyan-50 outline-none transition focus:border-cyan-300/50"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-50/80">
              Criar senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              className="w-full rounded-2xl border border-cyan-300/20 bg-[#071827] px-4 py-4 text-cyan-50 outline-none transition focus:border-cyan-300/50"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-50/80">
              Repetir senha
            </label>
            <input
              type="password"
              value={repetirSenha}
              onChange={(evento) => setRepetirSenha(evento.target.value)}
              onPaste={(evento) => evento.preventDefault()}
              onCopy={(evento) => evento.preventDefault()}
              onCut={(evento) => evento.preventDefault()}
              onDrop={(evento) => evento.preventDefault()}
              onDragOver={(evento) => evento.preventDefault()}
              onKeyDown={(evento) => {
                const tecla = evento.key.toLowerCase()

                if ((evento.ctrlKey || evento.metaKey) && tecla === 'v') {
                  evento.preventDefault()
                }
              }}
              className="w-full rounded-2xl border border-cyan-300/20 bg-[#071827] px-4 py-4 text-cyan-50 outline-none transition focus:border-cyan-300/50"
              placeholder="Repita sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregandoCadastro}
            className="w-full rounded-2xl bg-cyan-300 px-5 py-4 text-base font-semibold text-[#031018] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregandoCadastro ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-cyan-50/60">
          Já tem conta?{' '}
          <Link href="/entrar" className="text-cyan-300 transition hover:opacity-80">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  )
}