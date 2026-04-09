import Link from "next/link";
import BastaoTecnologico from "./componentes/bastao_tecnologico";
import OndaTecnologica from "./componentes/onda_tecnologica";

export default function PaginaInicial() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-white">

      {/* PRIMEIRA DOBRA */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-[34%] pointer-events-none">
            <div className="relative h-full w-full">
              <BastaoTecnologico />
            </div>
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,17,31,0.08),rgba(6,17,31,0.05),rgba(6,17,31,0.82),rgba(6,17,31,0.96))]" />
        </div>

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div />

          <div className="max-w-3xl justify-self-end">

            <p className="mb-6 text-sm uppercase tracking-[0.32em] text-cyan-300/80">
              Tecnologia espiritual de alto nível
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] text-cyan-50 sm:text-6xl lg:text-7xl">
              Você não precisa mais ser só mais um terapeuta
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-cyan-50/70">
              Sistemas criados para transformar sua presença, elevar sua autoridade
              e fazer seu cliente perceber valor antes mesmo da sessão começar.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/solucoes"
                className="relative inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-cyan-100 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-cyan-400/20 blur-md opacity-70 group-hover:opacity-100 transition" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-cyan-300/20 to-cyan-400/30 opacity-60 group-hover:opacity-90 transition" />
                <span className="relative z-10">Quero elevar meu nível</span>
                <span className="absolute inset-0 rounded-md border border-cyan-300/40 group-hover:border-cyan-200/80 transition" />
              </Link>

              <Link
                href="/tecnologias"
                className="inline-flex items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-50/85 transition hover:border-cyan-300/40 hover:bg-cyan-400/14"
              >
                Ver tecnologias
              </Link>

            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">

              <div className="rounded-[22px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
                <h2 className="text-lg font-medium leading-8 text-cyan-50">
                  Presença profissional
                </h2>
                <p className="mt-5 text-sm leading-7 text-cyan-50/70">
                  Seu cliente percebe valor no momento em que entra em contato com você.
                </p>
              </div>

              <div className="rounded-[22px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
                <h2 className="text-lg font-medium leading-8 text-cyan-50">
                  Impacto no atendimento
                </h2>
                <p className="mt-5 text-sm leading-7 text-cyan-50/70">
                  Cada sessão se torna mais envolvente, estruturada e memorável.
                </p>
              </div>

              <div className="rounded-[22px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
                <h2 className="text-lg font-medium leading-8 text-cyan-50">
                  Diferenciação real
                </h2>
                <p className="mt-5 text-sm leading-7 text-cyan-50/70">
                  Você deixa de competir por preço e passa a ser escolhido por valor.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SEGUNDA DOBRA */}
      <section className="relative overflow-hidden border-t border-cyan-300/10 bg-[linear-gradient(180deg,#06111f_0%,#071827_60%,#0a2233_100%)]">

        <div className="absolute inset-0 opacity-60">
          <OndaTecnologica />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,17,31,0.25),rgba(6,17,31,0.45),rgba(6,17,31,0.65))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-4xl">

            <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] text-cyan-50 sm:text-5xl lg:text-6xl">
              Enquanto você usa ferramentas de outros terapeutas,
              você constrói o nome deles, não o seu
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-cyan-50/70">
              Seu cliente lembra da técnica, não de você. Lembra da mesa, não do terapeuta.
              Aqui você constrói algo que carrega sua identidade, sua assinatura e sua presença.
            </p>

          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-medium leading-8 text-cyan-50">
                Sistemas personalizados
              </h3>
              <p className="mt-4 text-sm leading-7 text-cyan-50/70">
                Estruturas completas adaptadas à sua forma de trabalhar.
              </p>
            </div>

            <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-medium leading-8 text-cyan-50">
                Métodos organizados
              </h3>
              <p className="mt-4 text-sm leading-7 text-cyan-50/70">
                Clareza e estrutura para elevar a qualidade do seu atendimento.
              </p>
            </div>

            <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-medium leading-8 text-cyan-50">
                Materiais profissionais
              </h3>
              <p className="mt-4 text-sm leading-7 text-cyan-50/70">
                Conteúdos que reforçam seu valor e posicionamento no mercado.
              </p>
            </div>

            <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-medium leading-8 text-cyan-50">
                Identidade própria
              </h3>
              <p className="mt-4 text-sm leading-7 text-cyan-50/70">
                Sua marca deixa de depender de terceiros e passa a ser referência.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TERCEIRA DOBRA */}
      <section className="relative border-t border-cyan-300/10 bg-[linear-gradient(180deg,#06111f_0%,#071827_50%,#0a2233_100%)]">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-4xl">

            <h2 className="text-4xl font-semibold leading-[1.1] text-cyan-50 sm:text-5xl">
              Existe um abismo entre quem improvisa e quem opera com estrutura
            </h2>

            <p className="mt-8 text-lg leading-8 text-cyan-50/70">
              Terapeutas comuns dependem de ferramentas prontas. Profissionais de alto nível
              constroem seus próprios sistemas, criam experiências e dominam a percepção de valor.
            </p>

          </div>

          <div className="mt-12 flex flex-col items-start gap-6">

            <Link
              href="/contato"
              className="relative inline-flex items-center justify-center rounded-md px-8 py-4 text-sm font-medium text-cyan-100 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-cyan-400/20 blur-md opacity-70 group-hover:opacity-100 transition" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-cyan-300/20 to-cyan-400/30 opacity-60 group-hover:opacity-90 transition" />
              <span className="relative z-10">Quero minha estrutura personalizada</span>
              <span className="absolute inset-0 rounded-md border border-cyan-300/40 group-hover:border-cyan-200/80 transition" />
            </Link>

            <p className="text-sm text-cyan-50/50">
              Projetos desenvolvidos sob medida para o seu nível de atuação.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}