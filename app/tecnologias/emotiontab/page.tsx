"use client";

export default function EmotionTabPage() {
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
              onClick={() => (window.location.href = "/pagamento/emotion-tab")}
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
            Você será visto como um terapeuta do futuro
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