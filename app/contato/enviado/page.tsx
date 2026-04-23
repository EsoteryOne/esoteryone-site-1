import Link from "next/link";

export default function PaginaContatoEnviado() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-8 text-center backdrop-blur-2xl md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          Contato enviado
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-cyan-50 md:text-5xl">
          Recebemos sua mensagem com sucesso
        </h1>

        <p className="mt-6 text-lg leading-8 text-cyan-50/70">
          Sua mensagem foi enviada para a equipe da EsoteryOne. Em breve você
          receberá nosso retorno para dar continuidade ao atendimento.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex rounded-full border border-cyan-300/25 px-6 py-3 text-sm text-cyan-50/80 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
          >
            Voltar para o início
          </Link>

          <Link
            href="/solucoes"
            className="inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-[#031018] transition hover:brightness-110"
          >
            Ver soluções
          </Link>
        </div>
      </div>
    </main>
  );
}