import Link from "next/link";

export default function PaginaSolucoes() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            Soluções
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-cyan-50 md:text-6xl">
            Estruturas digitais para terapeutas que querem dominar o próprio método
          </h1>

          <p className="mt-6 text-lg leading-8 text-cyan-50/72">
            Cada solução é criada para que você deixe de depender de ferramentas genéricas
            e passe a trabalhar com um sistema próprio, profissional e alinhado com a sua identidade.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/solucoes/mesas-radionicas" className="group">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/14">
              <div className="overflow-hidden rounded-[1.7rem] m-3">
                <div className="h-72 bg-[url('/imagens/solucao-mesas.webp')] bg-cover bg-center transition duration-500 group-hover:scale-105" />
              </div>

              <div className="px-6 pb-6">
                <h2 className="text-2xl font-semibold text-cyan-50">
                  Mesas radiônicas personalizadas
                </h2>
                <p className="mt-3 leading-7 text-cyan-50/70">
                  Criação de mesas exclusivas alinhadas à sua egrégora, método e identidade.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/tecnologias" className="group">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/14">
              <div className="overflow-hidden rounded-[1.7rem] m-3">
                <div className="h-72 bg-[url('/imagens/solucao-apps.webp')] bg-cover bg-center transition duration-500 group-hover:scale-105" />
              </div>

              <div className="px-6 pb-6">
                <h2 className="text-2xl font-semibold text-cyan-50">
                  Apps e Sistemas personalizados
                </h2>
                <p className="mt-3 leading-7 text-cyan-50/70">
                  Transforme seu método em uma tecnologia própria, profissional e escalável.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/solucoes/telas-radionicas" className="group">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/14">
              <div className="overflow-hidden rounded-[1.7rem] m-3">
                <div className="h-72 bg-[url('/imagens/solucao-telas.webp')] bg-cover bg-center transition duration-500 group-hover:scale-105" />
              </div>

              <div className="px-6 pb-6">
                <h2 className="text-2xl font-semibold text-cyan-50">
                  Telas radiônicas digitais
                </h2>
                <p className="mt-3 leading-7 text-cyan-50/70">
                  Leve sua atuação para o digital e trabalhe com mais liberdade e profissionalismo.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/solucoes/protocolos" className="group">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/14">
              <div className="overflow-hidden rounded-[1.7rem] m-3">
                <div className="h-72 bg-[url('/imagens/solucao-protocolos.webp')] bg-cover bg-center transition duration-500 group-hover:scale-105" />
              </div>

              <div className="px-6 pb-6">
                <h2 className="text-2xl font-semibold text-cyan-50">
                  Protocolos personalizados
                </h2>
                <p className="mt-3 leading-7 text-cyan-50/70">
                  Estrutura completa do seu método, com egrégora, ativação e material profissional.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}