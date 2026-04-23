export default function LandingMesaRadionica() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-white">
      <section className="relative overflow-hidden border-b border-cyan-300/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,17,31,0.12),rgba(6,17,31,0.72))]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.38em] text-cyan-300/80">
              Mesa radiônica personalizada
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-cyan-50 md:text-6xl xl:text-7xl">
              Sua mesa radiônica precisa carregar a sua assinatura, não a de outro terapeuta
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-cyan-50/72 md:text-xl md:leading-9">
              Desenvolvemos mesas radiônicas digitais premium para terapeutas que
              desejam transformar o próprio método em uma estrutura visual,
              energética e profissional de alto impacto, pronta para elevar a
              autoridade do atendimento.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/solucoes/mesas-radionicas/orcamento"
                className="inline-flex items-center justify-center rounded-3xl bg-cyan-300 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Solicitar orçamento
              </a>

              <a
                href="#processo"
                className="inline-flex items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-8 py-4 text-base font-medium text-cyan-50 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-cyan-400/14"
              >
                Ver como funciona
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-cyan-300/18 bg-cyan-400/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/75">
                  Exclusividade
                </p>
                <p className="mt-3 text-sm leading-7 text-cyan-50/72">
                  Estrutura criada do zero para o seu método.
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-300/18 bg-cyan-400/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/75">
                  Presença
                </p>
                <p className="mt-3 text-sm leading-7 text-cyan-50/72">
                  Visual profissional para atendimentos de alto valor.
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-300/18 bg-cyan-400/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/75">
                  Tecnologia
                </p>
                <p className="mt-3 text-sm leading-7 text-cyan-50/72">
                  Sua mesa no digital, pronta para computador ou tablet.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.2rem] bg-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-3 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.10)]">
              <div
                className="h-[420px] rounded-[1.5rem] bg-cover bg-center md:h-[520px]"
                style={{ backgroundImage: "url('/imagens/solucao-mesas.webp')" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
          O problema
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
          Quando você usa a ferramenta de outro terapeuta, sua marca continua invisível
        </h2>

        <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-cyan-50/72 md:text-xl md:leading-9">
          Muitos profissionais têm método, sensibilidade e conhecimento, mas continuam
          presos a mesas genéricas, visuais prontos e estruturas que não traduzem a
          própria força terapêutica. Isso enfraquece a identidade, reduz o impacto da
          apresentação e faz o atendimento parecer apenas mais um entre tantos.
        </p>
      </section>

      <section className="border-y border-cyan-300/10 bg-cyan-400/[0.04]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-3">
          <div className="rounded-[1.9rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-cyan-50">
              Visual genérico reduz valor percebido
            </h3>
            <p className="mt-4 text-base leading-8 text-cyan-50/70">
              O cliente percebe quando o profissional trabalha com algo comum,
              improvisado ou visualmente fraco. A estrutura da ferramenta influencia a
              forma como o atendimento é recebido.
            </p>
          </div>

          <div className="rounded-[1.9rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-cyan-50">
              Falta de identidade enfraquece autoridade
            </h3>
            <p className="mt-4 text-base leading-8 text-cyan-50/70">
              Seu método pode ser excelente, mas se ele não tem forma própria, nome
              próprio e presença própria, a autoridade não se consolida com a mesma força.
            </p>
          </div>

          <div className="rounded-[1.9rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-cyan-50">
              Ferramenta comum não sustenta posicionamento premium
            </h3>
            <p className="mt-4 text-base leading-8 text-cyan-50/70">
              Quem deseja trabalhar com mais valor precisa de uma apresentação
              coerente com esse nível. A mesa faz parte da experiência que o cliente vê.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
              A solução
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
              Uma mesa radiônica criada para refletir seu campo, seu método e sua presença profissional
            </h2>

            <p className="mt-8 text-base leading-8 text-cyan-50/72 md:text-lg">
              A EsoteryOne desenvolve mesas radiônicas personalizadas com direção
              estética, lógica funcional e refinamento visual para terapeutas que
              desejam trabalhar com uma estrutura realmente própria. O objetivo não é
              entregar apenas um layout bonito. O objetivo é materializar uma ferramenta
              que tenha coerência com a forma como você atende, conduz, ativa e se posiciona.
            </p>

            <p className="mt-6 text-base leading-8 text-cyan-50/72 md:text-lg">
              Isso gera mais autoridade, mais clareza para o cliente, mais segurança na
              apresentação e uma percepção muito superior de valor.
            </p>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Mesa desenhada do zero</h3>
              <p className="mt-3 text-base leading-8 text-cyan-50/70">
                Nada de estrutura genérica. A construção parte da sua proposta, do seu
                método e do que sua ferramenta precisa representar.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Experiência digital premium</h3>
              <p className="mt-3 text-base leading-8 text-cyan-50/70">
                Sua mesa pode ser pensada para uso no computador ou tablet com presença
                visual forte, estética tecnológica e sensação de ferramenta profissional.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Fortalecimento da sua marca terapêutica</h3>
              <p className="mt-3 text-base leading-8 text-cyan-50/70">
                O cliente deixa de ver você usando uma ferramenta qualquer e passa a
                enxergar uma metodologia com forma, assinatura e identidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-cyan-300/10 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.05),rgba(34,211,238,0.02))]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <p className="text-center text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
            O que você recebe
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-center text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
            Uma estrutura criada para elevar a percepção do seu atendimento
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Conceito visual exclusivo</h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/70">
                Direção estética alinhada com sua identidade e com a energia do seu trabalho.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Lógica personalizada</h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/70">
                Estrutura pensada de acordo com o seu modo de conduzir o atendimento.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Presença profissional</h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/70">
                Apresentação muito mais forte para chamadas, sessões e demonstrações.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-cyan-50">Ferramenta com assinatura própria</h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/70">
                Sua mesa deixa de ser só um recurso e passa a ser parte do seu posicionamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="processo"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
      >
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
          Como funciona
        </p>

        <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
          O desenvolvimento é conduzido com direção, clareza e personalização real
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Etapa 1
            </div>
            <h3 className="mt-4 text-xl font-semibold text-cyan-50">Imersão no método</h3>
            <p className="mt-3 text-sm leading-7 text-cyan-50/70">
              Entendemos sua proposta, sua linha de trabalho, sua linguagem e o tipo
              de experiência que sua mesa deve transmitir.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Etapa 2
            </div>
            <h3 className="mt-4 text-xl font-semibold text-cyan-50">Estruturação da ferramenta</h3>
            <p className="mt-3 text-sm leading-7 text-cyan-50/70">
              Definimos a arquitetura visual, os campos, os eixos, a dinâmica de uso
              e a presença que a mesa deve ter.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Etapa 3
            </div>
            <h3 className="mt-4 text-xl font-semibold text-cyan-50">Criação personalizada</h3>
            <p className="mt-3 text-sm leading-7 text-cyan-50/70">
              A mesa é desenvolvida com refinamento visual, coerência estética e foco
              em posicionamento profissional.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Etapa 4
            </div>
            <h3 className="mt-4 text-xl font-semibold text-cyan-50">Entrega e orientação</h3>
            <p className="mt-3 text-sm leading-7 text-cyan-50/70">
              Você recebe sua estrutura com clareza de uso e base para aplicar a
              ferramenta com segurança e valor percebido elevado.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-cyan-300/10 bg-cyan-400/[0.04]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <p className="text-center text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
            Para quem é
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-center text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
            Essa solução é para terapeutas que entendem que forma também comunica força
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.9rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-semibold text-cyan-50">Ideal para quem deseja</h3>
              <div className="mt-6 space-y-4 text-base leading-8 text-cyan-50/72">
                <p>Ter uma mesa alinhada à própria identidade terapêutica.</p>
                <p>Abandonar ferramentas genéricas e comuns.</p>
                <p>Apresentar um atendimento com mais força visual e autoridade.</p>
                <p>Elevar o valor percebido do próprio trabalho.</p>
                <p>Construir uma marca mais forte e memorável.</p>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-semibold text-cyan-50">Talvez ainda não seja para quem</h3>
              <div className="mt-6 space-y-4 text-base leading-8 text-cyan-50/72">
                <p>Busca apenas algo rápido, genérico e sem identidade.</p>
                <p>Não vê valor em posicionamento, estética e apresentação.</p>
                <p>Quer apenas copiar o que todo mundo já usa.</p>
                <p>Não pretende fortalecer a própria autoridade no mercado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
          Posicionamento
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
          Seu cliente sente a diferença quando percebe que sua ferramenta tem alma, forma e assinatura
        </h2>

        <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-cyan-50/72 md:text-xl md:leading-9">
          Uma mesa radiônica personalizada comunica seriedade, visão, refinamento e
          presença. Ela não apenas sustenta o atendimento, ela amplia a experiência,
          fortalece a confiança e ajuda a consolidar sua imagem como um terapeuta com método próprio.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="overflow-hidden rounded-[2.2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 backdrop-blur-2xl md:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/90">
              Solicite sua mesa
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-cyan-50 md:text-5xl">
              Se você quer deixar de usar o campo visual de outro terapeuta, esse é o momento de criar o seu
            </h2>

            <p className="mt-8 text-base leading-8 text-cyan-50/78 md:text-lg">
              Entre em contato, apresente sua proposta e solicite um orçamento para
              desenvolver uma mesa radiônica à altura do seu método, da sua presença
              e da evolução da sua marca.
            </p>

            <a
              href="/solucoes/mesas-radionicas/orcamento"
              className="mt-10 inline-flex items-center justify-center rounded-3xl bg-cyan-300 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Quero solicitar minha mesa personalizada
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}