"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type BannerItem = {
  id: number;
  titulo: string;
  descricao: string;
  botao: string;
  link: string;
  imagem: string;
  alinhamentoTexto: "left" | "right";
};

const banners: BannerItem[] = [
  {
    id: 1,
    titulo: "A era de aquário chegou",
    descricao:
      "Você não precisa mais atuar com métodos antigos, trabalhe com o que há de melhor. Emita energias de onde estiver. Tenha o poder na palma de sua mão. Seja o terapeuta que você merece com ReverbTab.",
    botao: "Conheça essa tecnologia",
    link: "/tecnologias/reverbtab",
    imagem: "/imagens/banner-reverbtab-inicial.webp",
    alinhamentoTexto: "left",
  },
  {
    id: 2,
    titulo: "Emotion Tab",
    descricao:
      "Uma ferramenta tecnológica criada para auxiliar o terapeuta a mapear o campo amoroso do consulente.",
    botao: "conheça essa tecnologia",
    link: "/tecnologias/emotiontab",
    imagem: "/imagens/banner-emotiontab-inicial.webp",
    alinhamentoTexto: "right",
  },
  {
    id: 3,
    titulo: "Tenha sua própria Mesa Radiônica",
    descricao:
      "Até quando você vai ficar na sombra de outro terapêuta? Está na hora de se destacar no mercado e de lançar a sua marca.",
    botao: "Quero ter a minha mesa",
    link: "/solucoes/mesas-radionicas",
    imagem: "/imagens/banner-solucao-inicial.webp",
    alinhamentoTexto: "left",
  },
];

export default function BannerRotativo() {
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual((atual) => (atual + 1) % banners.length);
    }, 15000);

    return () => clearInterval(intervalo);
  }, []);

  function irParaBanner(index: number) {
    setIndiceAtual(index);
  }

  function voltarBanner() {
    setIndiceAtual((atual) => (atual - 1 + banners.length) % banners.length);
  }

  function avancarBanner() {
    setIndiceAtual((atual) => (atual + 1) % banners.length);
  }

  const bannerAtual = banners[indiceAtual];
  const textoNaEsquerda = bannerAtual.alinhamentoTexto === "left";

  return (
    <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden border-b border-cyan-300/10">
      {banners.map((banner, index) => {
        const ativo = index === indiceAtual;

        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ${
              ativo
                ? "pointer-events-auto z-20 scale-100 opacity-100"
                : "pointer-events-none z-10 scale-[1.02] opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${banner.imagem}')` }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,16,24,0.82)_0%,rgba(3,16,24,0.42)_30%,rgba(3,16,24,0.46)_55%,rgba(3,16,24,0.84)_100%)]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%)]" />
          </div>
        );
      })}

      <div className="relative z-30 mx-auto flex h-full max-w-7xl items-center px-6 py-20">
        <div
          className={`grid w-full items-center ${
            textoNaEsquerda ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
          }`}
        >
          {textoNaEsquerda ? (
            <>
              <div className="max-w-3xl ml-6 lg:ml-12">
                <p className="mb-6 text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                  Tecnologia espiritual de alto nível
                </p>

                <h1 className="text-5xl font-semibold leading-[1.02] text-cyan-50 sm:text-6xl lg:text-7xl">
                  {bannerAtual.titulo}
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-cyan-50/70">
                  {bannerAtual.descricao}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={bannerAtual.link}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-medium text-cyan-100"
                  >
                    <span className="absolute inset-0 bg-cyan-400/20 blur-md opacity-70 transition group-hover:opacity-100" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-cyan-300/20 to-cyan-400/30 opacity-60 transition group-hover:opacity-90" />
                    <span className="relative z-10">{bannerAtual.botao}</span>
                    <span className="absolute inset-0 rounded-md border border-cyan-300/40 transition group-hover:border-cyan-200/80" />
                  </Link>
                </div>
              </div>

              <div />
            </>
          ) : (
            <>
              <div />

              <div className="max-w-4xl justify-self-end pr-6 lg:pr-10 xl:pr-14">
                <p className="mb-5 text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                  Tecnologia espiritual de alto nível
                </p>

                <h1 className="text-4xl font-semibold leading-[0.98] text-cyan-50 sm:text-5xl lg:text-6xl xl:text-[5.2rem]">
                  {bannerAtual.titulo}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/70">
                  {bannerAtual.descricao}
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:pl-10 lg:pl-16">
                  <Link
                    href={bannerAtual.link}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-medium text-cyan-100"
                  >
                    <span className="absolute inset-0 bg-cyan-400/20 blur-md opacity-70 transition group-hover:opacity-100" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-cyan-300/20 to-cyan-400/30 opacity-60 transition group-hover:opacity-90" />
                    <span className="relative z-10">{bannerAtual.botao}</span>
                    <span className="absolute inset-0 rounded-md border border-cyan-300/40 transition group-hover:border-cyan-200/80" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={voltarBanner}
        className="absolute left-4 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/25 bg-[#071827]/60 text-cyan-100 backdrop-blur-md transition hover:border-cyan-300/45 hover:bg-[#0a2233]/80"
        aria-label="Banner anterior"
      >
        ←
      </button>

      <button
        type="button"
        onClick={avancarBanner}
        className="absolute right-4 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/25 bg-[#071827]/60 text-cyan-100 backdrop-blur-md transition hover:border-cyan-300/45 hover:bg-[#0a2233]/80"
        aria-label="Próximo banner"
      >
        →
      </button>

      <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => irParaBanner(index)}
            className={`h-3 rounded-full transition-all ${
              index === indiceAtual
                ? "w-10 bg-cyan-300"
                : "w-3 bg-cyan-300/35 hover:bg-cyan-300/55"
            }`}
            aria-label={`Ir para banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}