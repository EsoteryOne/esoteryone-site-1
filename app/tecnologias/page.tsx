import Link from "next/link";

export default function PaginaTecnologias() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            Tecnologias
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-cyan-50 sm:text-5xl">
            Sistemas desenvolvidos para terapeutas do futuro
          </h1>

          <p className="mt-6 text-lg leading-8 text-cyan-50/70">
            Aqui ficam reunidas as tecnologias da EsoteryOne, com foco em
            apresentação premium, impacto visual e experiência profissional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
              Tecnologia
            </p>

            <h2 className="mt-3 text-2xl font-medium text-cyan-50">
              Emotion Tab
            </h2>

            <p className="mt-4 text-sm leading-7 text-cyan-50/70">
              Sistema visual voltado ao campo amoroso, com profundidade
              terapêutica, presença premium e experiência de alto valor durante
              o atendimento.
            </p>

            <Link
              href="/tecnologias/emotiontab"
              className="mt-6 inline-flex rounded-full border border-cyan-300/25 px-5 py-3 text-sm text-cyan-50/80 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              Ver Emotion Tab
            </Link>
          </div>

          <div className="rounded-3xl border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
              Tecnologia
            </p>

            <h2 className="mt-3 text-2xl font-medium text-cyan-50">
              Prospera Tab
            </h2>

            <p className="mt-4 text-sm leading-7 text-cyan-50/70">
              Ferramenta criada para leituras estratégicas de prosperidade, com
              estrutura moderna, clareza visual e apresentação profissional.
            </p>

            <Link
              href="/tecnologias/prosperatab"
              className="mt-6 inline-flex rounded-full border border-cyan-300/25 px-5 py-3 text-sm text-cyan-50/80 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              Ver Prospera Tab
            </Link>
          </div>

          <div className="rounded-3xl border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
              Tecnologia
            </p>

            <h2 className="mt-3 text-2xl font-medium text-cyan-50">
              ReverbTab
            </h2>

            <p className="mt-4 text-sm leading-7 text-cyan-50/70">
              Sistema de irradiação energética desenvolvido para atuação prática
              em mesas amorosas e materiais, com dinâmica visual ativa, campos
              energéticos em fluxo e experiência imersiva durante o envio e a
              limpeza.
            </p>

            <Link
              href="/tecnologias/reverbtab"
              className="mt-6 inline-flex rounded-full border border-cyan-300/25 px-5 py-3 text-sm text-cyan-50/80 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              Ver ReverbTab
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}