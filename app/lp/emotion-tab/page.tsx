"use client";

import { useEffect, useRef, useState } from "react";
import EsferaEnergia from "@/app/componentes/esfera-energia";

const DURACAO_VIDEO = 17 * 60 + 58;
const LIBERAR_APOS_SEGUNDOS = 9 * 60;
const URL_VIDEO =
  "https://pub-6d4cafa762eb4f47a9d4a98a48187858.r2.dev/videos/chamada-emotion-tab-web.mp4";

export default function LandingPageEmotionTab() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ultimoTempoValidoRef = useRef(0);
  const fadeAudioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const botaoMagneticoRef = useRef<HTMLButtonElement | null>(null);

  const [videoIniciado, setVideoIniciado] = useState(false);
  const [videoFinalizado, setVideoFinalizado] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [erroVideo, setErroVideo] = useState(false);

  const [mostrarFormularioCompra, setMostrarFormularioCompra] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [carregandoCheckout, setCarregandoCheckout] = useState(false);
  const [erroCheckout, setErroCheckout] = useState("");

  const [overlayVisivel, setOverlayVisivel] = useState(false);
  const [overlaySaindo, setOverlaySaindo] = useState(false);

  const [botaoHover, setBotaoHover] = useState(false);
  const [botaoOffset, setBotaoOffset] = useState({ x: 0, y: 0 });

async function iniciarVideoComSom() {
  const video = videoRef.current;
  if (!video) return;

  try {
    if (fadeAudioIntervalRef.current) {
      clearInterval(fadeAudioIntervalRef.current);
      fadeAudioIntervalRef.current = null;
    }

    setErroVideo(false);
    setOverlaySaindo(true);

    video.pause();
    video.controls = false;
    video.muted = false;
    video.volume = 1;
    video.currentTime = 0;
    ultimoTempoValidoRef.current = 0;

    await video.play();

    setVideoIniciado(true);
  } catch {
    setErroVideo(true);
    setOverlaySaindo(false);
    setVideoIniciado(false);
  }
}



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

  function aoMoverNoBotao(evento: React.MouseEvent<HTMLButtonElement>) {
    const botao = botaoMagneticoRef.current;
    if (!botao) return;

    const rect = botao.getBoundingClientRect();
    const x = evento.clientX - rect.left - rect.width / 2;
    const y = evento.clientY - rect.top - rect.height / 2;

    const intensidadeX = Math.max(Math.min(x * 0.16, 18), -18);
    const intensidadeY = Math.max(Math.min(y * 0.16, 12), -12);

    setBotaoOffset({
      x: intensidadeX,
      y: intensidadeY,
    });
  }

  function aoSairDoBotao() {
    setBotaoHover(false);
    setBotaoOffset({ x: 0, y: 0 });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayVisivel(true);
    }, 180);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const aoAtualizarTempo = () => {
      ultimoTempoValidoRef.current = video.currentTime;
      setTempoAtual(video.currentTime);

      if (video.currentTime >= LIBERAR_APOS_SEGUNDOS && !videoFinalizado) {
        setVideoFinalizado(true);
      }
    };

    const aoTentarAvancar = () => {
      if (!videoFinalizado) {
        const diferenca = video.currentTime - ultimoTempoValidoRef.current;

        if (diferenca > 1.2) {
          video.currentTime = ultimoTempoValidoRef.current;
        }
      }
    };

    const aoFinalizar = () => {
      setTempoAtual(DURACAO_VIDEO);
      setVideoFinalizado(true);
    };

    const bloquearCliqueDireito = (evento: Event) => {
      evento.preventDefault();
    };

    video.addEventListener("timeupdate", aoAtualizarTempo);
    video.addEventListener("seeking", aoTentarAvancar);
    video.addEventListener("ended", aoFinalizar);
    video.addEventListener("contextmenu", bloquearCliqueDireito);

    return () => {
      video.removeEventListener("timeupdate", aoAtualizarTempo);
      video.removeEventListener("seeking", aoTentarAvancar);
      video.removeEventListener("ended", aoFinalizar);
      video.removeEventListener("contextmenu", bloquearCliqueDireito);
    };
  }, [videoFinalizado]);

  useEffect(() => {
    const bloquearTeclas = (evento: KeyboardEvent) => {
      if (!videoIniciado || videoFinalizado) return;

      const teclasBloqueadas = [
        " ",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
        "MediaPlayPause",
        "k",
        "K",
        "j",
        "J",
        "l",
        "L",
        "f",
        "F",
        "m",
        "M",
      ];

      if (teclasBloqueadas.includes(evento.key)) {
        evento.preventDefault();
      }
    };

    window.addEventListener("keydown", bloquearTeclas, { capture: true });

    return () => {
      window.removeEventListener("keydown", bloquearTeclas, { capture: true });
    };
  }, [videoIniciado, videoFinalizado]);

  useEffect(() => {
    return () => {
      if (fadeAudioIntervalRef.current) {
        clearInterval(fadeAudioIntervalRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#06111c] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-xs">
              A Era de Aquário chegou
            </div>

            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Emotion Tab
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              A tecnologia que mapeia o campo amoroso do seu consulente, amplia
              sua clareza na sessão, fortalece seu posicionamento profissional e
              ajuda você a sustentar atendimentos com mais valor e mais impacto.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#07111f] p-2 shadow-[0_0_80px_rgba(34,211,238,0.08)] sm:p-3">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black">
                <video
                  ref={videoRef}
                  className="block aspect-video w-full bg-black object-cover"
                  playsInline
                  preload="auto"
                  controls={false}
                  controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                  disablePictureInPicture
                  poster="/imagens/solucao-app.webp"
                >
                  <source src={URL_VIDEO} type="video/mp4" />
                  Seu navegador não conseguiu carregar o vídeo.
                </video>

                {!videoIniciado && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                      overlaySaindo
                        ? "pointer-events-none scale-110 opacity-0"
                        : overlayVisivel
                          ? "scale-100 opacity-100"
                          : "scale-[1.08] opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.38),transparent_28%),radial-gradient(circle_at_center,rgba(37,99,235,0.22),transparent_48%),linear-gradient(180deg,rgba(1,7,16,0.38),rgba(1,7,16,0.9))]" />

                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 shadow-[0_0_80px_rgba(34,211,238,0.12)]" />
                      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 shadow-[0_0_80px_rgba(34,211,238,0.1)]" />

                      <div className="absolute left-[8%] top-[16%] h-[260px] w-[260px] rounded-full bg-cyan-400/18 blur-3xl animate-pulse" />
                      <div className="absolute right-[7%] top-[14%] h-[240px] w-[240px] rounded-full bg-blue-500/18 blur-3xl animate-pulse" />
                      <div className="absolute bottom-[12%] left-[14%] h-[220px] w-[220px] rounded-full bg-sky-400/14 blur-3xl animate-pulse" />
                      <div className="absolute bottom-[10%] right-[14%] h-[260px] w-[260px] rounded-full bg-cyan-300/14 blur-3xl animate-pulse" />

                      <div className="absolute left-[13%] top-[28%] h-px w-36 rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
                      <div className="absolute right-[11%] top-[32%] h-px w-40 rotate-[20deg] bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
                      <div className="absolute bottom-[26%] left-[18%] h-px w-28 rotate-[12deg] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
                      <div className="absolute bottom-[24%] right-[18%] h-px w-32 rotate-[-14deg] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.45)]" />

                      <div className="absolute left-[28%] top-[24%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(34,211,238,0.8)]" />
                      <div className="absolute right-[26%] top-[22%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(34,211,238,0.8)]" />
                      <div className="absolute bottom-[23%] left-[24%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(34,211,238,0.8)]" />
                      <div className="absolute bottom-[21%] right-[24%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(34,211,238,0.8)]" />
                    </div>

                    <div className="relative z-10 flex items-center justify-center px-6">
                      <button
                        type="button"
                        onClick={iniciarVideoComSom}
                        className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/15 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-cyan-300/20"
                        aria-label="Iniciar apresentação"
                      >
                        <span className="absolute inset-0 rounded-full bg-cyan-300/25 blur-lg opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl" />
                        <span className="relative z-10 ml-1 block h-0 w-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-white transition-transform duration-300 group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                )}

                {videoIniciado && !videoFinalizado && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <div className="bg-[linear-gradient(to_top,rgba(2,4,10,0.92),rgba(2,4,10,0))] px-4 pb-4 pt-16 sm:px-6 sm:pb-6">
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (tempoAtual / DURACAO_VIDEO) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {erroVideo && (
              <p className="mt-4 text-center text-sm text-red-300">
                O vídeo não iniciou. Vamos verificar o arquivo.
              </p>
            )}

            {videoFinalizado && (
              <div className="mt-8 text-center">
                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Agora veja todos os detalhes e dê o próximo passo
                </h2>

                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setMostrarFormularioCompra(true)}
                    className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-semibold text-[#031019] transition hover:scale-[1.02]"
                  >
                    Comprar agora
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {videoFinalizado && (
        <>
          <section id="oferta" className="border-b border-white/10 bg-[#081723]">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    O que é o Emotion Tab
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                    Uma tecnologia criada para terapeutas que querem atender com
                    mais impacto, mais estrutura e mais autoridade
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-white/70">
                    O Emotion Tab foi pensado para transformar a forma como o
                    atendimento é percebido. Ele entrega uma experiência muito
                    mais profissional, visualmente marcante e alinhada com o novo
                    nível de exigência do mercado.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.04] p-4 shadow-[0_0_70px_rgba(34,211,238,0.08)]">
                  <img
                    src="/imagens/tecnologia-emotiontab-2.webp"
                    alt="Visual do Emotion Tab"
                    className="w-full rounded-[1.4rem] object-cover"
                  />
                </div>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Percepção de valor mais alta
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    O consulente sente que está diante de um trabalho mais sério,
                    mais refinado e mais diferenciado.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Apresentação mais tecnológica
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    A experiência visual comunica inovação e posiciona seu
                    atendimento acima do comum.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Mais clareza na condução
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    A sessão ganha organização, presença e uma condução mais
                    segura da sua parte.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Posicionamento premium
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    Você deixa de parecer apenas mais um profissional e passa a
                    transmitir visão, inovação e autoridade.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[#07131d]">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
              <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    A virada de chave
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                    A vida não perdoa profissional que não se atualiza
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-white/70">
                    O mercado mudou. A percepção de valor mudou. O olhar do
                    consulente mudou. Quem continua apresentando seu trabalho de
                    forma comum continua parecendo comum. O Emotion Tab ajuda
                    você a atravessar essa mudança com presença, sofisticação e
                    força de posicionamento.
                  </p>

                  <p className="mt-6 text-lg leading-8 text-white/70">
                    Não basta ter sensibilidade, conhecimento e experiência.
                    Hoje também é preciso apresentar tudo isso de forma marcante,
                    visual e memorável. É aqui que a tecnologia deixa de ser um
                    detalhe e passa a fazer parte do seu valor.
                  </p>
                </div>

                <div className="flex items-center justify-center py-6 lg:py-0">
                  <EsferaEnergia />
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[#081723]">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    O problema que ele resolve
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                    Muitos terapeutas têm conhecimento, mas ainda apresentam seu
                    trabalho de forma comum demais
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-white/70">
                    Isso reduz impacto, enfraquece a percepção de valor e faz o
                    atendimento parecer mais simples do que realmente é. O
                    Emotion Tab entra justamente para mudar essa leitura na mente
                    do cliente, elevando a experiência e fortalecendo sua
                    presença profissional.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.04] p-4 shadow-[0_0_60px_rgba(34,211,238,0.06)]">
                  <img
                    src="/imagens/tecnologia-emotiontab-1.webp"
                    alt="Tecnologia aplicada ao atendimento"
                    className="w-full rounded-[1.4rem] object-cover"
                  />
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-white/[0.04] p-8 shadow-[0_0_60px_rgba(34,211,238,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Resultado esperado
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <p className="text-sm leading-7 text-white/75">
                    Mais impacto na apresentação do atendimento.
                  </p>
                  <p className="text-sm leading-7 text-white/75">
                    Mais confiança na condução da sessão.
                  </p>
                  <p className="text-sm leading-7 text-white/75">
                    Mais diferenciação diante de outros terapeutas.
                  </p>
                  <p className="text-sm leading-7 text-white/75">
                    Mais percepção de valor no olhar do consulente.
                  </p>
                  <p className="text-sm leading-7 text-white/75 md:col-span-2">
                    Mais força de posicionamento para trabalhar em um padrão
                    superior.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[#07131d]">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Para quem é
                </p>

                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Feito para terapeutas que querem evoluir de verdade
                </h2>

                <p className="mt-6 text-lg leading-8 text-white/70">
                  Esta tecnologia faz sentido para quem deseja sair do improviso
                  visual, abandonar a apresentação comum e entregar uma
                  experiência muito mais forte, profissional e memorável.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Terapeutas que querem se diferenciar
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    Ideal para quem deseja comunicar inovação e deixar uma marca
                    muito mais forte no atendimento.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Profissionais que querem elevar valor percebido
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    Ajuda a sustentar uma imagem mais premium e uma experiência
                    mais sofisticada.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Quem busca uma apresentação memorável
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    O atendimento deixa de parecer comum e passa a ser lembrado
                    com muito mais força.
                  </p>
                </div>
              </div>

              <div className="mt-12 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.04] p-4 shadow-[0_0_70px_rgba(34,211,238,0.08)]">
                <img
                  src="/imagens/solucao-apps.webp"
                  alt="Imagem de impacto do Emotion Tab"
                  className="w-full rounded-[1.4rem] object-cover"
                />
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-[#081723]">
            <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-10 lg:px-16">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Próximo passo
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Agora é a hora de levar sua atuação para um novo padrão
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
                Se você quer apresentar seu trabalho com mais força, mais valor
                e mais autoridade, o Emotion Tab pode ser o próximo avanço da
                sua jornada profissional.
              </p>

              <div className="mt-8 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setMostrarFormularioCompra(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-[#031019] transition hover:scale-[1.02]"
                >
                  Quero me tornar um terapeuta de destaque
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {mostrarFormularioCompra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-[2rem] border border-cyan-300/15 bg-[#07131d] p-6 shadow-[0_0_60px_rgba(34,211,238,0.12)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Próximo passo
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Bem-vindo à Era de Aquário
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  Você está há um passo de evoluir.
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