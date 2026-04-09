export default function PaginaContato() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            Contato
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-cyan-50 sm:text-5xl">
            Pronto para construir algo à altura do seu nome?
          </h1>

          <p className="mt-6 text-lg leading-8 text-cyan-50/70">
            Fale com a EsoteryOne para solicitar orçamento, apresentar sua ideia
            ou entender qual solução faz mais sentido para o seu momento.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
              Fale conosco
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              Estamos aqui para você
            </h2>

            <p className="mt-6 text-base leading-8 text-cyan-50/70">
              Nossa equipe está pronta para entender sua proposta, apresentar
              possibilidades e orientar o melhor caminho para sua estrutura
              digital, seu sistema ou sua ferramenta personalizada.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  WhatsApp
                </p>
                <p className="mt-2 text-xl font-medium text-cyan-50">
                  (51) 99999-9999
                </p>
                <p className="mt-2 text-sm leading-7 text-cyan-50/65">
                  Atendimento para dúvidas, orçamento e direcionamento inicial.
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  E-mail
                </p>
                <p className="mt-2 text-xl font-medium text-cyan-50">
                  one@esoteryone.com
                </p>
                <p className="mt-2 text-sm leading-7 text-cyan-50/65">
                  Ideal para propostas detalhadas, briefing e envio de materiais.
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  Atendimento
                </p>
                <p className="mt-2 text-xl font-medium text-cyan-50">
                  Online para todo o Brasil
                </p>
                <p className="mt-2 text-sm leading-7 text-cyan-50/65">
                  Reuniões, alinhamentos e apresentações conduzidas de forma
                  remota com presença profissional.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
              Solicitar contato
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-cyan-50">
              Envie sua mensagem
            </h2>

            <p className="mt-6 text-base leading-8 text-cyan-50/70">
              Preencha os dados abaixo e entraremos em contato o mais breve
              possível.
            </p>

            <form
              action="https://formsubmit.co/one@esoteryone.com"
              method="POST"
              className="mt-10 space-y-5"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value="Novo contato - Página de contato EsoteryOne"
              />
              <input
                type="hidden"
                name="_next"
                value="http://localhost:3000/contato/enviado"
              />

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  className="w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  placeholder="(51) 99999-9999"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                  Empresa / Projeto
                </label>
                <input
                  type="text"
                  name="empresa_ou_projeto"
                  className="w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  placeholder="Nome do seu projeto, marca ou empresa"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                  Solução de interesse
                </label>
                <select
                  name="solucao_interesse"
                  className="w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  defaultValue=""
                >
                  <option value="" disabled className="text-black">
                    Selecione
                  </option>
                  <option value="Mesas radiônicas personalizadas" className="text-black">
                    Mesas radiônicas personalizadas
                  </option>
                  <option value="Apps e sistemas personalizados" className="text-black">
                    Apps e sistemas personalizados
                  </option>
                  <option value="Telas radiônicas digitais" className="text-black">
                    Telas radiônicas digitais
                  </option>
                  <option value="Protocolos personalizados" className="text-black">
                    Protocolos personalizados
                  </option>
                  <option value="Emotion Tab" className="text-black">
                    Emotion Tab
                  </option>
                  <option value="Prospera Tab" className="text-black">
                    Prospera Tab
                  </option>
                  <option value="ReverbTab" className="text-black">
                    ReverbTab
                  </option>
                  <option value="Outro" className="text-black">
                    Outro
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                  Mensagem
                </label>
                <textarea
                  name="mensagem"
                  rows={6}
                  className="w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  placeholder="Descreva o que você deseja criar, melhorar ou estruturar"
                />
              </div>

              <button
                type="submit"
                className="inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-[#031018] transition hover:brightness-110"
              >
                Solicitar contato
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}