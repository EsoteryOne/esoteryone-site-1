"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Download, FolderOpen, MessageCircle, ShieldCheck } from "lucide-react";

type Props = {
  nome: string;
  descricao: string;
  caminhoArquivo: string;
};

export default function SucessoDownloadClient({
  nome,
  descricao,
  caminhoArquivo,
}: Props) {
  const [mostrarAvisoDownload, setMostrarAvisoDownload] = useState(false);
  const [textoBotao, setTextoBotao] = useState(`Baixar ${nome}`);

  function handleDownload() {
    window.open(caminhoArquivo, "_blank", "noopener,noreferrer");
    setTextoBotao("Download iniciado");
    setMostrarAvisoDownload(true);
  }

  useEffect(() => {
    if (!mostrarAvisoDownload) return;

    const timer = setTimeout(() => {
      setMostrarAvisoDownload(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [mostrarAvisoDownload]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      {mostrarAvisoDownload && (
        <>
          <div className="pointer-events-none fixed right-6 top-24 z-50 hidden sm:block">
            <div className="animate-bounce">
              <ArrowUpRight className="h-20 w-20 text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.55)]" />
            </div>
          </div>

          <div className="fixed right-6 top-40 z-50 max-w-sm rounded-3xl border border-cyan-300/20 bg-[#081722]/95 p-5 shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Atenção ao download
            </p>

            <p className="mt-3 text-sm leading-7 text-cyan-50/90">
              O download foi iniciado. Olha para o canto superior direito do teu navegador e acompanha o progresso do arquivo.
            </p>

            <p className="mt-3 text-sm leading-7 text-cyan-50/70">
              Depois, confere a tua pasta de Downloads ou a pasta personalizada que tu definiu no navegador.
            </p>
          </div>
        </>
      )}

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-cyan-300/15 bg-[#07131d]/88 p-8 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl sm:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <CheckCircle2 className="h-4 w-4" />
              Pagamento confirmado
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Sua compra do {nome} foi concluída com sucesso
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/78">
              Seu pagamento foi confirmado e o instalador já está liberado nesta página. Agora você já pode baixar o sistema e seguir para a instalação no seu computador.
            </p>

            {descricao && (
              <p className="mt-4 max-w-3xl text-base leading-8 text-cyan-50/58">
                {descricao}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-300 px-6 py-4 text-sm font-semibold text-[#031019] shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:scale-[1.02] hover:bg-cyan-200"
              >
                <Download className="h-5 w-5" />
                {textoBotao}
              </button>

              <a
                href="/minhas-assinaturas"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-300/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ShieldCheck className="h-5 w-5" />
                Ir para minha área de usuário
              </a>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-cyan-300/15 bg-cyan-400/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Próximo passo
              </p>

              <p className="mt-4 text-base leading-8 text-cyan-50/80">
                Ao clicar no botão de download, o arquivo começará a baixar automaticamente. Depois disso, presta atenção ao canto superior direito do navegador, porque é ali que normalmente aparece o progresso do download.
              </p>

              <p className="mt-4 text-base leading-8 text-cyan-50/80">
                Quando o processo terminar, procura o instalador na tua pasta de Downloads ou na pasta personalizada que você escolheu para salvar arquivos.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-cyan-300/15 bg-[#07131d]/88 p-7 shadow-[0_0_50px_rgba(34,211,238,0.10)] backdrop-blur-2xl">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-cyan-400/10 p-3">
                  <FolderOpen className="h-6 w-6 text-cyan-300" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Instruções importantes
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-cyan-50/72">
                    Leia com atenção as instruções que acompanham o instalador. Elas foram colocadas junto do material para te orientar corretamente na instalação e nos próximos passos.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/15 bg-[#07131d]/88 p-7 shadow-[0_0_50px_rgba(34,211,238,0.10)] backdrop-blur-2xl">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-cyan-400/10 p-3">
                  <MessageCircle className="h-6 w-6 text-cyan-300" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Precisa de suporte?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-cyan-50/72">
                    Se surgir qualquer dúvida durante a instalação ou ativação, você pode falar com o suporte pelo WhatsApp.
                  </p>

                  <a
                    href="https://wa.me/5551998267095"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
                  >
                    WhatsApp: (51) 99826-7095
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/15 bg-[#07131d]/88 p-7 shadow-[0_0_50px_rgba(34,211,238,0.10)] backdrop-blur-2xl">
              <h2 className="text-xl font-semibold text-white">
                Acesso permanente na sua conta
              </h2>

              <p className="mt-3 text-sm leading-7 text-cyan-50/72">
                Este arquivo também permanecerá disponível dentro da sua área de usuário no site. Se no futuro você precisar reinstalar o sistema, bastará acessar a sua conta novamente e baixar o instalador por lá.
              </p>

              <a
                href="/minhas-assinaturas"
                className="mt-5 inline-flex rounded-2xl border border-cyan-300/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Acessar minha área de usuário
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}