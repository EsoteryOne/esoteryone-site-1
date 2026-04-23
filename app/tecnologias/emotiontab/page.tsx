"use client";

import { useState } from "react";

export default function PaginaEmotionTab() {
  const [mostrarFormularioCompra, setMostrarFormularioCompra] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [carregandoCheckout, setCarregandoCheckout] = useState(false);
  const [erroCheckout, setErroCheckout] = useState("");

  async function iniciarCheckout() {
    setErroCheckout("");

    if (!nome.trim()) {
      setErroCheckout("Campo nome obrigatório.");
      return;
    }

    if (!email.trim()) {
      setErroCheckout("Campo e-mail obrigatório.");
      return;
    }

    if (!telefone.trim()) {
      setErroCheckout("Campo telefone obrigatório.");
      return;
    }

    try {
      setCarregandoCheckout(true);

      const resposta = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          slug_produto: "emotion-tab",
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setErroCheckout(data.error || "Não foi possível iniciar o pagamento.");
        setCarregandoCheckout(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setErroCheckout("A Stripe não retornou a URL do checkout.");
      setCarregandoCheckout(false);
    } catch {
      setErroCheckout("Ocorreu um erro ao iniciar o checkout.");
      setCarregandoCheckout(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Emotion Tab
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
            O sistema que transforma seus atendimentos em uma experiência
            profissional, profunda e impossível de ignorar
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/60">
            Chega de atendimentos confusos, sem impacto e difíceis de explicar.
            O Emotion Tab organiza, revela e harmoniza o campo amoroso do
            consulente com clareza, estética e autoridade.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => setMostrarFormularioCompra(true)}
              className="rounded-full bg-cyan-300 px-10 py-4 text-lg font-medium text-[#031018] transition hover:brightness-110"
            >
              Quero acessar o Emotion Tab
            </button>

            <p className="text-sm text-white/40">
              Acesso imediato após pagamento
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">
              O problema que ninguém te fala
            </h2>

            <p className="mt-4 text-white/60">
              A maioria dos terapeutas perde autoridade durante o atendimento.
              Explicações confusas, falta de estrutura e ausência de impacto
              visual fazem o cliente duvidar do processo.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-cyan-200">
              A virada de chave
            </h2>

            <p className="mt-4 text-cyan-100/80">
              Com o Emotion Tab, você conduz o atendimento com clareza,
              profundidade e presença. O cliente entende, sente e valoriza o
              processo.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-3xl font-semibold">
            O que o Emotion Tab faz por você
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "Organiza completamente o atendimento",
              "Revela bloqueios e padrões emocionais",
              "Entrega uma leitura profunda e estruturada",
              "Aumenta sua autoridade profissional",
              "Encanta visualmente o cliente",
              "Eleva o valor percebido do seu serviço",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-10 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-cyan-200">
            Você não será mais um terapeuta comum
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-cyan-100/80">
            Você será visto como um profissional moderno, estruturado e de alto
            valor. Um terapeuta do futuro.
          </p>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">
            Comece agora e transforme seus atendimentos
          </h2>

          <p className="mt-4 text-white/60">
            Acesso imediato. Sem complicação.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setMostrarFormularioCompra(true)}
              className="rounded-full bg-cyan-300 px-10 py-4 text-lg font-medium text-[#031018] transition hover:brightness-110"
            >
              Acessar Emotion Tab agora
            </button>
          </div>
        </div>
      </div>

      {mostrarFormularioCompra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-[2rem] border border-cyan-300/15 bg-[#07131d] p-6 shadow-[0_0_60px_rgba(34,211,238,0.12)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Próximo passo
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Finalize seu acesso ao Emotion Tab
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  Preencha seus dados para seguir ao pagamento.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMostrarFormularioCompra(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 transition hover:bg-white/5"
              >
                Fechar
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/85">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/85">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  placeholder="seunome@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/85">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  placeholder="51 9 9999-9999"
                />
              </div>

              {erroCheckout && (
                <p className="text-sm text-red-300">{erroCheckout}</p>
              )}

              <button
                type="button"
                onClick={iniciarCheckout}
                disabled={carregandoCheckout}
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-[#031019] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {carregandoCheckout
                  ? "Abrindo checkout..."
                  : "Continuar para o pagamento"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}