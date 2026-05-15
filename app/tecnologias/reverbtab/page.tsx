import Image from "next/image";
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
      "Diferente de tudo o que você já viu, o Reverb Tab tira você do modelo padrão e bagunçado de trabalhar com um monte de gráficos e te coloca como destaque no mercado de trabalho.",
  },
  {
    titulo: "Estrutura para amor e material",
    descricao:
      "O sistema foi pensado para atuar tanto em tratamentos amorosos quanto materiais, organizando o trabalho energético de forma clara e objetiva.",
  },
  {
    titulo: "Mais que um visual premium e tecnológico",
    descricao:
      "Cada elemento da interface foi projetado para emitir as ondas de formas necessárias para o atendimento de uma forma moderna, sofisticada e de alto valor percebido durante o atendimento.",
  },
  {
    titulo: "Atenda de onde estiver",
    descricao:
      "Você pode viajar, tirar férias, passar o final de semana em algum outro local, sem interromper os seus atendimentos em andamento e sem precisar levar um monte de gráficos com você. Basta levar seu celular ou seu tablet.",
  },
  {
    titulo: "Nunca mais se perca nos atendimentos",
    descricao:
      "Chega de anotar em papel quantos dias faltam para cada atendimento. O sistema mostra automaticamente quantos dias restam daquele atendimento, basta você escolher a quantidade de dias através do relógio radiestésico.",
  },
  {
    titulo: "Trabalho em grande escala",
    descricao:
      "Antes o terapeuta precisava ter espaço para deixar seus gráficos em sua casa, hoje, basta ter um celular ou tablet. A tecnologia inicia automaticamente as reverberações dos teus clientes, uma após a outra.",
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
    titulo: "Limpeza dos bloqueios",
    descricao:
      "Você seleciona todos os bloqueios que impedem o teu consulente de alcançar aquele objetivo e ativa a primeira etapa de limpeza. Nessa hora, o sistema se ativa com todas as frequências sonoras e visuais necessárias para a limpeza dos bloqueios.",
  },
  {
    numero: "04",
    titulo: "Ativação da materialização",
    descricao:
      "Você ativa a etapa de materialização. Nessa hora, o sistema se ativa com todas as frequências sonoras e visuais necessárias para materializar aquele objetivo.",
  },
];

export default function ReverbTabPage() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-cyan-50">
      <section className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 py-24 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_55%)]" />

        <div className="relative z-10 grid w-full items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
              Tecnologia terapêutica para irradiação energética
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-cyan-50 md:text-6xl">
              ReverbTab
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/75 md:text-xl">
              O ReverbTab é a tecnologi de irradiação energética da
              EsoteryOne, Primeira Tela Radiônica capaz de emitir
              ondas de formas materializadoras e desmaterializadoras.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-cyan-300/80 md:text-lg">
              Pensado para atuar nos campos amoroso e material, o sistema emite
              a frequência necessária para limpeza e materialização de todos os
              campos.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://play.google.com/store/apps/details?id=com.esoteryone.reverbtab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-6 py-4 text-base font-semibold text-[#031018] transition hover:scale-[1.02]"
              >
                Instale agora
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 px-6 py-4 text-base font-semibold text-cyan-50 backdrop-blur-xl transition hover:bg-cyan-400/15"
              >
                Voltar para Tecnologias
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.4rem] border border-cyan-300/18 bg-cyan-400/10 p-3 shadow-2xl backdrop-blur-2xl">
              <Image
                src="/imagens/reverb-tab-1.webp"
                alt="ReverbTab em uso no tablet"
                width={1400}
                height={850}
                priority
                className="h-[320px] w-full rounded-[1.8rem] object-cover md:h-[500px]"
              />

              <div className="absolute inset-3 rounded-[1.8rem] bg-gradient-to-t from-[#031018]/65 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-cyan-300/18 bg-cyan-400/10 p-3 shadow-2xl backdrop-blur-2xl">
              <Image
                src="/imagens/reverb-tab-2.webp"
                alt="Interface vertical do ReverbTab"
                width={850}
                height={1200}
                className="h-[520px] w-full rounded-[1.7rem] object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Benefícios
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Uma ferramenta pensada para elevar o terapeuta
            </h2>

            <p className="mt-5 text-lg leading-8 text-cyan-50/72">
              Diferente dos gráficos estáticos, essa tecnologia une ondas de formas
              em movimento, frequências sonoras, cromoterapia e visualização
              materializadora. Tudo em um único lugar.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
              Ele é uma Tela Radiônica emissora de formas capaz
              de desmagnetizar os bloqueios que impedem o consulente
              de alcançar seus objetivos e de materializar, através dos
              planos causais, os objetivos e metas do seu consulente.
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
        <div className="grid overflow-hidden rounded-[2.2rem] border border-cyan-300/18 bg-cyan-400/10 backdrop-blur-2xl lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Posicionamento
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              O terapeuta do futuro precisa de uma apresentação à altura
            </h2>

            <p className="mt-5 text-lg leading-8 text-cyan-50/75">
              O ReverbTab ajuda a tirar o atendimento do improviso e colocar o
              profissional em um patamar mais premium. A sessão ganha força de
              apresentação, clareza, impacto visual e percepção de alto valor.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://play.google.com/store/apps/details?id=com.esoteryone.reverbtab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-6 py-4 text-base font-semibold text-[#031018] transition hover:scale-[1.02]"
              >
                Instale agora
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/25 bg-transparent px-6 py-4 text-base font-semibold text-cyan-50 transition hover:bg-cyan-400/10"
              >
                Ir para a página inicial
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px]">
            <Image
              src="/imagens/reverb-tab-3.webp"
              alt="Terapeuta usando o ReverbTab"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/80 via-[#071827]/20 to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </section>
    </main>
  );
}