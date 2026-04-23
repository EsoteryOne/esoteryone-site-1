import Link from "next/link";

export default function PaginaEnviado() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-8 text-center backdrop-blur-2xl md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          Solicitação enviada
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-cyan-50 md:text-5xl">
          Recebemos sua solicitação com sucesso
        </h1>

        <p className="mt-6 text-lg leading-8 text-cyan-50/70">
          Sua solicitação de orçamento foi enviada. Em breve entraremos em
          contato para analisar sua proposta e dar continuidade à criação da sua
          mesa radiônica autoral.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/solucoes/mesas-radionicas"
            className="inline-flex rounded-full border border-cyan-300/25 px-6 py-3 text-sm text-cyan-50/80 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
          >
            Voltar para a página da solução
          </Link>

          <Link
            href="/tecnologias"
            className="inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-[#031018] transition hover:brightness-110"
          >
            Ver tecnologias
          </Link>
        </div>
      </div>
    </main>
  );
}