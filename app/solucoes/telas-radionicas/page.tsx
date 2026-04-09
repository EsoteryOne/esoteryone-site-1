export default function LandingMesaRadionica() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          Tenha sua própria mesa radiônica digital profissional
        </h1>

        <p className="mt-6 text-lg text-white/70 md:text-xl">
          Chega de usar ferramentas genéricas. Crie uma mesa radiônica
          totalmente alinhada com a sua egrégora, seu método e sua identidade.
        </p>

        <a
          href="/contato"
          className="mt-10 inline-block rounded-xl bg-amber-400 px-8 py-4 font-semibold text-black transition hover:bg-amber-300"
        >
          Solicitar orçamento
        </a>
      </section>

      {/* PROBLEMA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Você ainda está usando ferramentas de outros terapeutas
        </h2>

        <p className="mt-6 text-lg text-white/70">
          Cada vez que você usa uma mesa criada por outra pessoa, você fortalece
          a identidade de outro profissional e não a sua.
        </p>
      </section>

      {/* SOLUÇÃO */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Agora você pode ter sua própria estrutura profissional
        </h2>

        <p className="mt-6 text-lg text-white/70">
          Desenvolvemos mesas radiônicas digitais personalizadas, com design,
          lógica e funcionamento criados exclusivamente para você.
        </p>
      </section>

      {/* BENEFÍCIOS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold">Identidade própria</h3>
            <p className="mt-3 text-white/70">
              Trabalhe com uma ferramenta que representa o seu método.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold">Apresentação profissional</h3>
            <p className="mt-3 text-white/70">
              Impressione seus clientes com uma interface moderna.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold">Escala e autoridade</h3>
            <p className="mt-3 text-white/70">
              Eleve o valor percebido do seu atendimento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold md:text-5xl">
          Está na hora de ter sua própria mesa radiônica
        </h2>

        <a
          href="/contato"
          className="mt-10 inline-block rounded-xl bg-amber-400 px-8 py-4 font-semibold text-black transition hover:bg-amber-300"
        >
          Quero minha mesa personalizada
        </a>
      </section>

    </main>
  );
}