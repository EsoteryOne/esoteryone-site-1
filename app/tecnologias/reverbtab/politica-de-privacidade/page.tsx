export const metadata = {
  title: "Política de Privacidade | EsoteryOne",
  description:
    "Política de Privacidade da EsoteryOne para seus sites, sistemas e aplicativos.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-20 text-cyan-50">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          Documento legal
        </p>

        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Política de Privacidade
        </h1>

        <p className="mt-6 text-base leading-8 text-cyan-50/75">
          A EsoteryOne respeita a tua privacidade e se compromete com a proteção
          dos dados pessoais coletados em seus sites, sistemas, formulários e
          aplicativos. Esta Política de Privacidade explica como as informações
          são coletadas, utilizadas, armazenadas e protegidas.
        </p>

        <div className="mt-12 space-y-8 rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-8 backdrop-blur-xl">
          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              1. Coleta de informações
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Podemos coletar informações fornecidas diretamente pelo usuário,
              como nome, e-mail, telefone e outros dados preenchidos em
              formulários, cadastros, solicitações de contato, compras,
              assinaturas ou uso de sistemas e aplicativos.
            </p>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Também podemos coletar informações técnicas de forma automática,
              como endereço IP, tipo de dispositivo, sistema operacional,
              navegador, páginas acessadas, data e hora de acesso e dados de uso
              da plataforma, com a finalidade de melhorar a experiência do
              usuário, a segurança e o funcionamento dos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              2. Uso das informações
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              As informações coletadas podem ser utilizadas para prestar
              atendimento, responder solicitações, liberar acesso a produtos e
              serviços, processar compras, enviar comunicações relacionadas ao
              uso da plataforma, melhorar funcionalidades, garantir segurança,
              cumprir obrigações legais e aperfeiçoar a experiência do usuário.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              3. Compartilhamento de dados
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              A EsoteryOne não vende dados pessoais. As informações podem ser
              compartilhadas apenas quando necessário para operação dos
              serviços, processamento de pagamentos, hospedagem, análises
              técnicas, cumprimento de obrigações legais ou proteção dos direitos
              da própria plataforma, sempre dentro dos limites aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              4. Armazenamento e proteção
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Adotamos medidas técnicas e organizacionais adequadas para proteger
              os dados contra acessos não autorizados, perda, alteração,
              divulgação ou destruição indevida. Apesar dos cuidados aplicados,
              nenhum sistema é absolutamente invulnerável, por isso a segurança
              é tratada de forma contínua e responsável.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              5. Direitos do usuário
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              O usuário pode solicitar informações sobre os dados tratados,
              correção de dados incompletos ou desatualizados, exclusão quando
              aplicável e esclarecimentos sobre o uso de suas informações,
              observadas as exigências legais e regulatórias cabíveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              6. Cookies e tecnologias semelhantes
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Podemos utilizar cookies e tecnologias semelhantes para melhorar a
              navegação, entender padrões de uso, lembrar preferências e apoiar
              funcionalidades do site e dos aplicativos. O usuário pode ajustar
              permissões de cookies diretamente em seu navegador, quando essa
              opção estiver disponível.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              7. Aplicativos e serviços de terceiros
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Alguns serviços podem utilizar recursos ou integrações de
              terceiros, como hospedagem, pagamentos, formulários, autenticação
              e ferramentas analíticas. Cada serviço externo pode possuir sua
              própria política de privacidade e suas próprias práticas de
              tratamento de dados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              8. Alterações nesta política
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Esta Política de Privacidade pode ser atualizada periodicamente
              para refletir mudanças legais, técnicas ou operacionais. A versão
              mais recente estará sempre disponível nesta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-50">
              9. Contato
            </h2>
            <p className="mt-4 leading-8 text-cyan-50/75">
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o
              tratamento de dados, o usuário pode entrar em contato pelos canais
              oficiais disponibilizados pela EsoteryOne em seu site.
            </p>
          </section>

          <section>
            <p className="text-sm leading-7 text-cyan-300/75">
              Última atualização: abril de 2026
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}