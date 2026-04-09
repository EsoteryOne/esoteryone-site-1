import Image from "next/image";
import OndaTecnologica from "../componentes/onda_tecnologica";

export default function Visao() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <OndaTecnologica />
      </div>

      <div className="relative">
        {/* BLOCO 1 */}
        <section className="grid min-h-[80vh] grid-cols-1 border-b border-cyan-300/10 md:grid-cols-2">
          <div className="relative min-h-[360px] md:min-h-[80vh]">
            <Image
              src="/imagens/imagem_visao1.png"
              alt="Nossa história"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[#06111f]/40">
              <h2 className="text-3xl font-semibold text-cyan-50 md:text-4xl">
                Nossa história
              </h2>
            </div>
          </div>

          <div className="flex min-h-[700px] items-center p-10 text-lg leading-8 text-cyan-50/72 md:p-16">
            <div className="max-w-xl">
              <p>
                A EsoteryOne é uma empresa especializada em soluções tecnológicas
                para terapeutas e profissionais do desenvolvimento espiritual.
                Nossa missão é transformar a experiência de atendimento,
                oferecendo ferramentas modernas que integram espiritualidade e
                eficiência, elevando a qualidade dos serviços prestados.
              </p>

              <p className="mt-6">
                A EsoteryOne nasceu da necessidade de um terapeuta que, ao longo
                de sua jornada, percebeu a ausência de ferramentas profissionais
                à altura do nível de profundidade e responsabilidade dos
                atendimentos espirituais. Diante dessa lacuna, surgiu a missão de
                criar softwares e aplicativos que realmente atendessem às
                demandas do terapeuta moderno.
              </p>

              <p className="mt-6">
                Com um forte compromisso com a estética, a funcionalidade e a
                experiência do cliente, desenvolvemos soluções como o Emotion Tab
                e o Prospera Tab, que permitem conduzir sessões com mais
                profundidade, clareza e organização, elevando significativamente o
                nível do atendimento.
              </p>

              <p className="mt-6">
                Por trás da EsoteryOne existe um terapeuta que compreende, na
                prática, os desafios da profissão e que transforma essa vivência
                em tecnologia de alto nível. Nossa jornada é marcada pela
                inovação e pela busca constante por excelência, sempre com o
                propósito de posicionar o terapeuta como um profissional de alto
                valor.
              </p>
            </div>
          </div>
        </section>

        {/* BLOCO 2 */}
        <section className="grid min-h-[80vh] grid-cols-1 md:grid-cols-2">
          {/* TEXTO DA ESQUERDA */}
          <div className="order-2 relative flex min-h-[700px] items-center overflow-hidden p-10 text-lg leading-8 text-cyan-50/72 md:order-1 md:p-16">
            {/* BASTÃO SOMENTE AQUI */}
            <div className="pointer-events-none absolute inset-0">
              <img
                src="/imagens/bastao-esoteryone.png"
                alt=""
                className="absolute left-[-120px] top-1/2 h-[720px] w-[720px] -translate-y-1/2 object-contain opacity-[0.22] blur-[0.5px] animate-[pulse_6s_ease-in-out_infinite]"
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(34,211,238,0.10),rgba(6,17,31,0)_58%)]" />
            </div>

            <div className="relative z-10 max-w-xl">
              <p>
                A EsoteryOne surge como uma empresa pioneira ao se posicionar de
                forma exclusiva no desenvolvimento de soluções tecnológicas
                voltadas para terapeutas e profissionais da espiritualidade. Em
                um mercado onde ainda não existiam ferramentas pensadas
                especificamente para essa realidade, assumimos o papel de abrir
                caminho e estabelecer um novo padrão.
              </p>

              <p className="mt-6">
                Nosso trabalho nasce da união entre conhecimento técnico e
                vivência prática no campo terapêutico, permitindo criar sistemas
                que realmente dialogam com a rotina do profissional e com a
                profundidade dos atendimentos. Cada solução é desenvolvida com o
                objetivo de elevar o nível da prática terapêutica, trazendo mais
                estrutura, clareza e impacto para cada sessão.
              </p>

              <p className="mt-6">
                Mais do que acompanhar tendências, a EsoteryOne define um novo
                cenário, posicionando-se como referência global na criação de
                tecnologias que valorizam, organizam e profissionalizam o
                trabalho do terapeuta.
              </p>
            </div>
          </div>

          {/* IMAGEM DA DIREITA */}
          <div className="order-1 relative min-h-[360px] md:order-2 md:min-h-[80vh]">
            <Image
              src="/imagens/imagem_visao2.png"
              alt="Liderança e pioneirismo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[#06111f]/40">
              <h2 className="text-center text-3xl font-semibold text-cyan-50 md:text-4xl">
                Liderança e pioneirismo
              </h2>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}