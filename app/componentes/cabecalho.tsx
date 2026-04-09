import Link from "next/link";

export default function Cabecalho() {
  const itensMenu = [
    { nome: "Início", rota: "/" },
    { nome: "Soluções", rota: "/solucoes" },
    { nome: "Visão", rota: "/visao" },
    { nome: "Tecnologias", rota: "/tecnologias" },
    { nome: "Minhas assinaturas", rota: "/minhas-assinaturas" },
    { nome: "Contato", rota: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
            <div className="absolute inset-[6px] rounded-xl border border-cyan-300/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_65%)]" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-cyan-300">
              EsoteryOne
            </p>
            <p className="text-xs text-white/45">
              tecnologia para terapeutas
            </p>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-7">
          {itensMenu.map((item) => (
            <Link
              key={item.rota}
              href={item.rota}
              className="text-sm text-white/68 transition duration-200 hover:text-cyan-300"
            >
              {item.nome}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contato"
            className="hidden sm:inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-300/30 hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/tecnologias"
            className="inline-flex rounded-full bg-cyan-300 px-5 py-2 text-sm font-medium text-[#031018] transition hover:brightness-110"
          >
            Começar
          </Link>
        </div>
      </div>
    </header>
  );
}