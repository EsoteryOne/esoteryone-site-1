export default function PaginaCancelado() {
  return (
    <main className="min-h-screen bg-[#06111c] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-cyan-300/15 bg-[#07131d] p-8 shadow-[0_0_60px_rgba(34,211,238,0.12)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Pagamento não concluído
        </p>

        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Tua compra não foi finalizada
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/70">
          O checkout foi interrompido antes da conclusão do pagamento. Se tu
          quiser, pode retornar e continuar o processo novamente.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/lp/emotion-tab"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-[#031019] transition hover:scale-[1.02]"
          >
            Voltar para a oferta
          </a>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Ir para a página inicial
          </a>
        </div>
      </div>
    </main>
  );
}