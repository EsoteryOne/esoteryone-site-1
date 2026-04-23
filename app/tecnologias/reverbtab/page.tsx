import Link from "next/link";

export const metadata = {
  title: "ReverbTab | EsoteryOne",
  description:
    "ReverbTab é a tecnologia de irradiação energética da EsoteryOne, criada para irradiar ondas de formas materializadoras que irão reverberar nos campos amorosos e materiais com visual premium, funcional, presença profissional e experiência de alto valor.",
};

const beneficios = [
  {
    titulo: "Irradiação com presença profissional",
    descricao:
      "O ReverbTab transforma a condução da sessão em uma experiência visual forte, elegante e impactante, elevando a imagem do terapeuta diante do cliente.",
  },
  {
    titulo: "Estrutura para amor e material",
    descricao:
      "O sistema foi pensado para atuar tanto em tratamentos amorosos quanto materiais, organizando o trabalho energético de forma clara e objetiva.",
  },
  {
    titulo: "Visual premium e tecnológico",
    descricao:
      "Cada elemento da interface foi imaginado para transmitir modernidade, sofisticação e alto valor percebido durante o atendimento.",
  },
  {
    titulo: "Mais segurança na condução da sessão",
    descricao:
      "Com uma estrutura visual bem definida, o terapeuta consegue manter foco, firmeza e organização ao longo de todo o processo de limpeza, harmonização e envio.",
  },
  {
    titulo: "Experiência marcante para o consulente",
    descricao:
      "O cliente percebe que está diante de um método moderno, diferenciado e visualmente poderoso, o que fortalece confiança e autoridade.",
  },
  {
    titulo: "Base para futuras integrações",
    descricao:
      "O ReverbTab pode se tornar o elo operacional entre os diagnósticos do EmotionTab e do ProsperaTab e a etapa prática de tratamento energético.",
  },
];

const etapas = [
  {
    numero: "01",
    titulo: "Preparação da sessão",
    descricao:
      "O terapeuta organiza os dados do atendimento e define o tipo de tratamento que será conduzido.",
  },
  {
    numero: "02",
    titulo: "Direcionamento da mesa",
    descricao:
      "O sistema abre a estrutura visual correspondente ao campo amoroso ou material, criando um ambiente de atuação energética claro e profissional.",
  },
  {
    numero: "03",
    titulo: "Irradiação e harmonização",
    descricao:
      "O trabalho é conduzido com apoio de uma interface tecnológica que fortalece foco, intenção, presença e impacto visual.",
  },
  {
    numero: "04",
    titulo: "Valorização do atendimento",
    descricao:
      "A sessão deixa de parecer improvisada e passa a ser percebida como um método premium, moderno e estruturado.",
  },
];

export default function ReverbTabPage() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-cyan-50">
      <section className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 py-24 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_55%)]" />

        <div className="relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
              Tecnologia terapêutica para irradiação energética
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-cyan-50 md:text-6xl">
              ReverbTab
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/75 md:text-xl">
              O ReverbTab é a estação tecnológica de irradiação energética da
              EsoteryOne, criada para conduzir tratamentos com presença visual,
              sofisticação e alto valor percebido. Ele fortalece o trabalho do
              terapeuta e transforma a sessão em uma experiência mais moderna,
              organizada e impactante.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-cyan-300/80 md:text-lg">
              Pensado para atuar nos campos amoroso e material, o sistema
              emite a frequência necessária para limpeza e materialização
              de todos os campos. Tornando o  terapeuta um profissional que 
              trabalha com método, clareza e tecnologia.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-6 py-4 text-base font-semibold text-[#031018] transition hover:scale-[1.02]"
              >
                Solicitar apresentação
              </Link>

              <Link
                href="/tecnologias"
                className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 px-6 py-4 text-base font-semibold text-cyan-50 backdrop-blur-xl transition hover:bg-cyan-400/15"
              >
                Voltar para Tecnologias
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-6 shadow-2xl backdrop-blur-2xl">
              <div className="mb-4 h-2 w-28 rounded-full bg-cyan-300/70" />
              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[#071827]/80 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
                    Campo amoroso
                  </p>
                  <p className="mt-3 text-base leading-7 text-cyan-50/75">
                    Estrutura de emissão e harmonização voltada ao trabalho com
                    vínculos, afetos, bloqueios e reorganização do campo
                    emocional.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[#071827]/80 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
                    Campo material
                  </p>
                  <p className="mt-3 text-base leading-7 text-cyan-50/75">
                    Estrutura de atuação voltada à limpeza, alinhamento e
                    fortalecimento de fluxos ligados à vida prática, financeira
                    e produtiva.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[#071827]/80 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">
                    Presença profissional
                  </p>
                  <p className="mt-3 text-base leading-7 text-cyan-50/75">
                    Uma interface que ajuda o terapeuta a apresentar seu método
                    com força estética, autoridade e percepção de alto valor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10 md:py-14">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
            Benefícios
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            Uma ferramenta pensada para elevar o terapeuta
          </h2>
          <p className="mt-5 text-lg leading-8 text-cyan-50/72">
            O ReverbTab foi concebido para fortalecer a etapa prática do
            tratamento energético com mais presença, organização, beleza visual
            e impacto durante a sessão.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {beneficios.map((item) => (
            <div
              key={item.titulo}
              className="rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-2xl"
            >
              <h3 className="text-xl font-semibold text-cyan-50">
                {item.titulo}
              </h3>
              <p className="mt-4 leading-7 text-cyan-50/72">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Funcionamento
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Como o ReverbTab entra no teu atendimento
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-cyan-50/72">
              Ele funciona como uma estação visual e energética para a condução
              da sessão, ajudando o terapeuta a trabalhar com mais clareza,
              firmeza e valor percebido.
            </p>
          </div>

          <div className="grid gap-5">
            {etapas.map((item) => (
              <div
                key={item.numero}
                className="flex gap-4 rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-2xl"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#071827] text-lg font-semibold text-cyan-200">
                  {item.numero}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-50">
                    {item.titulo}
                  </h3>
                  <p className="mt-3 leading-7 text-cyan-50/72">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-2xl md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Posicionamento
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              O terapeuta do futuro precisa de uma apresentação à altura
            </h2>
            <p className="mt-5 text-lg leading-8 text-cyan-50/75">
              O ReverbTab ajuda a tirar o atendimento do improviso e colocar o
              profissional em um patamar mais premium. A sessão ganha estética,
              clareza, impacto visual e força de apresentação, algo essencial
              para quem deseja transmitir autoridade, modernidade e alto valor.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-6 py-4 text-base font-semibold text-[#031018] transition hover:scale-[1.02]"
              >
                Quero conhecer o ReverbTab
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/25 bg-transparent px-6 py-4 text-base font-semibold text-cyan-50 transition hover:bg-cyan-400/10"
              >
                Ir para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}