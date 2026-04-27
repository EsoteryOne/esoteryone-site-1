"use client";

export default function EmotionTabPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* HERO */}
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* TEXTO */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Emotion Tab
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              Torne-se um especialista no tratamento do campo amoroso
            </h1>

            <p className="mt-6 text-lg text-white/60">
              Pare de conduzir atendimentos comuns. Torne-se um especialista no campo amoroso e entregue
              experiências que realmente irão causar impacto e mudanças em seu consulente.
            </p>

            <div className="mt-10">
              <button
                onClick={() => (window.location.href = "/pagamento/emotion-tab")}
                className="rounded-full bg-cyan-300 px-10 py-4 text-lg font-medium text-[#031018] transition hover:brightness-110"
              >
                Quero acessar o Emotion Tab
              </button>
            </div>
          </div>

          {/* IMAGEM HERO */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl" />
            <img
              src="/imagens/solucao-apps.webp"
              className="relative rounded-2xl border border-cyan-300/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            />
          </div>
        </div>

        {/* BLOCO PROBLEMA / VIRADA */}
        <div className="mt-24 grid gap-10 md:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold">
              O problema que ninguém te fala
            </h2>

            <p className="mt-4 text-white/60">
              A maioria dos terapeutas perde autoridade durante o atendimento.
              Falta de estrutura e impacto visual fazem o cliente duvidar.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-cyan-200">
              A virada de chave
            </h2>

            <p className="mt-4 text-cyan-100/80">
              Com o Emotion Tab você conduz o atendimento com presença,
              clareza e valor percebido muito maior.
            </p>
          </div>
        </div>

        {/* IMAGEM INTERMEDIÁRIA */}
        <div className="mt-24">
          <img
            src="/imagens/tecnologia-emotiontab-1.webp"
            className="w-full rounded-2xl border border-cyan-300/20"
          />
        </div>

        {/* BENEFÍCIOS */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-semibold">
            O que o Emotion Tab faz por você
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "Organiza completamente o atendimento",
              "Revela bloqueios emocionais",
              "Entrega leitura profunda",
              "Aumenta autoridade profissional",
              "Traz o conhecimento ancestral do i-ching",
              "Aumenta teu ticket",
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

        {/* CTA FINAL */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">
            Comece agora e transforme seus atendimentos
          </h2>

          <p className="mt-4 text-white/60">
            Acesso imediato. Sem complicação.
          </p>

          <div className="mt-8">
            <button
              onClick={() => (window.location.href = "/pagamento/emotion-tab")}
              className="rounded-full bg-cyan-300 px-10 py-4 text-lg font-medium text-[#031018] transition hover:brightness-110"
            >
              Acessar Emotion Tab agora
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}