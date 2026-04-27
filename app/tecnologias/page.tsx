import Image from "next/image";
import Link from "next/link";

const tecnologias = [
  {
    nome: "Emotion Tab",
    subtitulo: "Campo amoroso",
    descricao:
      "Sistema para mapeamento, leitura e harmonização do campo amoroso. Descubra o que impede o teu consulente de ter sucesso na vida amorosa e torne-se um especialista do campo amoroso.",
    imagem: "/imagens/tecnologia-emotiontab-2.webp",
    link: "/tecnologias/emotiontab",
  },
  {
    nome: "Prospera Tab",
    subtitulo: "Campo material",
    descricao:
      "Tecnologia voltada à prosperidade, padrões materiais e direcionamento estratégico, com leitura visual clara e apresentação profissional.",
    imagem: "/imagens/tecnologias-prosperatab.webp",
    link: "/tecnologias/prosperatab",
  },
  {
    nome: "ReverbTab",
    subtitulo: "Irradiação energética",
    descricao:
      "Sistema de limpeza e envio energético com campos ativos, dinâmica visual imersiva e aplicação prática em atendimentos terapêuticos.",
    imagem: "/imagens/tecnologias-reverbtab.webp",
    link: "/tecnologias/reverbtab",
  },
];

export default function PaginaTecnologias() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,#06111f_0%,#071827_36%,#0a2233_100%)] px-6 py-20 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl md:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-32 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
                Tecnologias EsoteryOne
              </p>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-cyan-50 sm:text-5xl lg:text-6xl">
                Tecnologia para o terapeuta do futuro
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/72">
                Criamos tecnologias para terapeutas que querem elevar seu nível de atuação e se posicionar com mais
                autoridade e modernidade. Leituras de campos, mapeamentos energéticos, emissão de frequências
                e muito mais.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50/80">
                  Mesas digitais
                </span>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50/80">
                  Terapias energéticas
                </span>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50/80">
                  Experiência premium
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-cyan-300/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#031018]/70 p-4">
                <Image
                  src="/imagens/banner-tecnologia.webp"
                  alt="Tecnologia EsoteryOne"
                  width={900}
                  height={620}
                  className="h-[300px] w-full rounded-[1.5rem] object-cover md:h-[420px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {tecnologias.map((tecnologia) => (
            <article
              key={tecnologia.nome}
              className="group overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 shadow-xl shadow-cyan-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/12"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={tecnologia.imagem}
                  alt={tecnologia.nome}
                  width={700}
                  height={460}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#031018] via-[#031018]/25 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full border border-cyan-300/25 bg-[#031018]/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
                  {tecnologia.subtitulo}
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/75">
                  Tecnologia
                </p>

                <h2 className="mt-3 text-2xl font-medium text-cyan-50">
                  {tecnologia.nome}
                </h2>

                <p className="mt-4 min-h-[112px] text-sm leading-7 text-cyan-50/70">
                  {tecnologia.descricao}
                </p>

                <Link
                  href={tecnologia.link}
                  className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-[#031018] transition hover:bg-cyan-200"
                >
                  Conhecer {tecnologia.nome}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}