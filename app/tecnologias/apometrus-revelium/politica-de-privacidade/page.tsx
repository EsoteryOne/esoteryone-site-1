export default function PoliticaPrivacidadeApometrus() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_25%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300/80">
          EsoteryOne
        </p>

        <h1 className="mb-4 text-4xl font-bold text-cyan-300">
          Política de Privacidade do Apometrus Revelium
        </h1>

        <p className="mb-10 text-sm text-slate-400">
          Última atualização: 29 de abril de 2026
        </p>

        <section className="space-y-6 text-base leading-8 text-slate-300">
          <p>
            Esta Política de Privacidade explica como o aplicativo Apometrus
            Revelium, desenvolvido pela EsoteryOne, lida com informações,
            permissões e dados durante o uso do aplicativo.
          </p>

          <p>
            O Apometrus Revelium é um aplicativo voltado para uso terapêutico,
            organizacional e operacional em atendimentos apométricos. O
            aplicativo funciona principalmente de forma local no dispositivo do
            usuário.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            1. Informações coletadas
          </h2>

          <p>
            O aplicativo pode permitir que o usuário informe dados de atendimento,
            como nome do consulente, data de nascimento, endereço, nome do
            terapeuta, observações e seleções realizadas durante a sessão. Esses
            dados são usados para organizar o atendimento e gerar relatórios
            dentro do próprio aplicativo.
          </p>

          <p>
            Esses dados permanecem armazenados localmente no dispositivo do
            usuário quando a função de salvamento é utilizada. A EsoteryOne não
            recebe, não acessa, não vende e não compartilha esses dados por meio
            do aplicativo.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            2. Uso do microfone e permissão RECORD_AUDIO
          </h2>

          <p>
            O Apometrus Revelium pode solicitar acesso ao microfone do
            dispositivo exclusivamente para funcionalidades de reconhecimento de
            voz iniciadas pelo próprio usuário.
          </p>

          <p>
            O microfone é utilizado apenas durante a interação ativa do usuário
            com uma função de voz. O aplicativo não realiza escuta contínua, não
            grava áudio em segundo plano e não mantém o microfone ativo sem ação
            do usuário.
          </p>

          <p>
            Nenhuma gravação de áudio é armazenada pelo aplicativo. Nenhum áudio
            é vendido, compartilhado ou enviado pela EsoteryOne a terceiros para
            fins comerciais.
          </p>

          <p>
            A permissão de microfone é opcional. O usuário pode negar ou revogar
            essa permissão a qualquer momento nas configurações do dispositivo.
            Caso a permissão seja negada, apenas as funcionalidades dependentes
            de reconhecimento de voz poderão ficar indisponíveis.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            3. Uso da câmera, galeria ou imagens
          </h2>

          <p>
            O aplicativo pode permitir que o usuário selecione uma imagem da
            galeria do dispositivo para representar o consulente no atendimento.
            Essa imagem é usada apenas dentro do próprio aplicativo e permanece
            localmente no dispositivo.
          </p>

          <p>
            A EsoteryOne não recebe, não acessa e não compartilha imagens
            escolhidas pelo usuário no aplicativo.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            4. Armazenamento local
          </h2>

          <p>
            Relatórios, configurações e dados inseridos pelo usuário podem ser
            salvos localmente no dispositivo para permitir histórico de
            atendimentos e continuidade do uso.
          </p>

          <p>
            O usuário é responsável pela segurança do próprio dispositivo e pelo
            gerenciamento dos arquivos ou informações salvas localmente.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            5. Compartilhamento de dados
          </h2>

          <p>
            O Apometrus Revelium não compartilha dados pessoais, relatórios,
            imagens, áudio ou informações de atendimento com terceiros por meio
            do aplicativo.
          </p>

          <p>
            A EsoteryOne não vende dados pessoais dos usuários.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            6. Segurança
          </h2>

          <p>
            A EsoteryOne adota boas práticas para desenvolver o aplicativo de
            forma segura. Como os dados são mantidos localmente, a proteção do
            dispositivo, senhas, backups e controle de acesso físico são de
            responsabilidade do usuário.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            7. Crianças
          </h2>

          <p>
            O Apometrus Revelium não é direcionado a crianças. O aplicativo é
            destinado ao uso profissional, terapêutico e organizacional por
            adultos.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            8. Alterações nesta política
          </h2>

          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente para
            refletir melhorias no aplicativo, mudanças legais ou ajustes de
            funcionamento. A versão atualizada estará sempre disponível nesta
            página.
          </p>

          <h2 className="pt-8 text-2xl font-semibold text-cyan-300">
            9. Contato
          </h2>

          <p>
            Em caso de dúvidas sobre esta Política de Privacidade ou sobre o uso
            de dados no Apometrus Revelium, entre em contato com a EsoteryOne
            pelo site oficial:
          </p>

          <a
            href="https://www.esoteryone.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-cyan-300 underline-offset-4 hover:underline"
          >
            https://www.esoteryone.com
          </a>
        </section>
      </div>
    </main>
  );
}