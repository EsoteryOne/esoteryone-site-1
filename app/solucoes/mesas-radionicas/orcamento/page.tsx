"use client";

import { useMemo, useState } from "react";

type FormDataType = {
  nomeCompleto: string;
  telefone: string;
  email: string;

  pergunta1: string;
  observacoes1: string;

  pergunta2: string;
  pergunta2Outras: string;

  pergunta3: string;
  observacoes3: string;

  pergunta4: string;
  observacoes4: string;

  pergunta5: string;
  observacoes5: string;

  pergunta6: string;
  observacoes6: string;

  pergunta7: string;
  observacoes7: string;

  pergunta8: string;
};

const estadoInicial: FormDataType = {
  nomeCompleto: "",
  telefone: "",
  email: "",

  pergunta1: "",
  observacoes1: "",

  pergunta2: "",
  pergunta2Outras: "",

  pergunta3: "",
  observacoes3: "",

  pergunta4: "",
  observacoes4: "",

  pergunta5: "",
  observacoes5: "",

  pergunta6: "",
  observacoes6: "",

  pergunta7: "",
  observacoes7: "",

  pergunta8: "",
};

export default function PaginaOrcamentoMesasRadionicas() {
  const [etapa, setEtapa] = useState(1);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState<FormDataType>(estadoInicial);

  const totalEtapas = 9;

  const porcentagem = useMemo(() => {
    return Math.round((etapa / totalEtapas) * 100);
  }, [etapa]);

  function atualizarCampo<K extends keyof FormDataType>(
    campo: K,
    valor: FormDataType[K]
  ) {
    setDados((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function validarEmail(email: string) {
    const emailLimpo = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(emailLimpo);
  }

  function validarTelefone(telefone: string) {
    const apenasDigitos = telefone.replace(/\D/g, "");

    if (apenasDigitos.length !== 10 && apenasDigitos.length !== 11) {
      return false;
    }

    const ddd = apenasDigitos.slice(0, 2);

    if (ddd.startsWith("0")) {
      return false;
    }

    if (/^(\d)\1+$/.test(apenasDigitos)) {
      return false;
    }

    return true;
  }

  function validarNomeCompleto(nome: string) {
    const nomeLimpo = nome.trim().replace(/\s+/g, " ");
    const partes = nomeLimpo.split(" ").filter(Boolean);
    return partes.length >= 2;
  }

  function validarEtapaAtual() {
    if (etapa === 1) {
      if (!dados.nomeCompleto.trim()) {
        setErro("Preencha seu nome completo.");
        return false;
      }

      if (!validarNomeCompleto(dados.nomeCompleto)) {
        setErro("Digite seu nome completo com pelo menos nome e sobrenome.");
        return false;
      }

      if (!dados.telefone.trim()) {
        setErro("Preencha seu telefone com DDD.");
        return false;
      }

      if (!validarTelefone(dados.telefone)) {
        setErro("Digite um telefone válido com DDD.");
        return false;
      }

      if (!dados.email.trim()) {
        setErro("Preencha seu email.");
        return false;
      }

      if (!validarEmail(dados.email)) {
        setErro("Digite um email válido.");
        return false;
      }
    }

    if (etapa === 2 && !dados.pergunta1) {
      setErro("Selecione uma opção para continuar.");
      return false;
    }

    if (etapa === 3 && !dados.pergunta2) {
      setErro("Selecione uma egrégora para continuar.");
      return false;
    }

    if (etapa === 4 && !dados.pergunta3) {
      setErro("Selecione uma opção para continuar.");
      return false;
    }

    if (etapa === 5 && !dados.pergunta4) {
      setErro("Selecione uma opção para continuar.");
      return false;
    }

    if (etapa === 6 && !dados.pergunta5) {
      setErro("Selecione uma opção para continuar.");
      return false;
    }

    if (etapa === 7 && !dados.pergunta6) {
      setErro("Selecione uma opção para continuar.");
      return false;
    }

    if (etapa === 8 && !dados.pergunta7) {
      setErro("Selecione uma opção para continuar.");
      return false;
    }

    if (etapa === 9 && !dados.pergunta8.trim()) {
      setErro("Escreva sua visão para concluir.");
      return false;
    }

    setErro("");
    return true;
  }

  function avancarEtapa() {
    if (!validarEtapaAtual()) return;

    if (etapa < totalEtapas) {
      setEtapa((valor) => valor + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function voltarEtapa() {
    if (etapa > 1) {
      setErro("");
      setEtapa((valor) => valor - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const classeInput =
    "w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14";
  const classeTextarea =
    "w-full min-h-[140px] rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14";
  const classeOpcao =
    "block rounded-3xl border border-cyan-300/18 bg-cyan-400/10 px-5 py-4 text-cyan-50/90 backdrop-blur-xl transition hover:border-cyan-300/35 hover:bg-cyan-400/14";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] text-white">
      <form
        action="https://formsubmit.co/one@esoteryone.com"
        method="POST"
        className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input
        type="hidden"
        name="_next"
        value="http://localhost:3000/solucoes/mesas-radionicas/orcamento/enviado"
        />
        <input
        type="hidden"
        name="_subject"
        value="Novo orçamento - Mesa Radiônica Personalizada"
        />

        <input type="hidden" name="nome_completo" value={dados.nomeCompleto} />
        <input type="hidden" name="telefone" value={dados.telefone} />
        <input type="hidden" name="email" value={dados.email} />

        <input type="hidden" name="pergunta_1" value={dados.pergunta1} />
        <input type="hidden" name="observacoes_1" value={dados.observacoes1} />

        <input type="hidden" name="pergunta_2" value={dados.pergunta2} />
        <input
          type="hidden"
          name="pergunta_2_outras"
          value={dados.pergunta2Outras}
        />

        <input type="hidden" name="pergunta_3" value={dados.pergunta3} />
        <input type="hidden" name="observacoes_3" value={dados.observacoes3} />

        <input type="hidden" name="pergunta_4" value={dados.pergunta4} />
        <input type="hidden" name="observacoes_4" value={dados.observacoes4} />

        <input type="hidden" name="pergunta_5" value={dados.pergunta5} />
        <input type="hidden" name="observacoes_5" value={dados.observacoes5} />

        <input type="hidden" name="pergunta_6" value={dados.pergunta6} />
        <input type="hidden" name="observacoes_6" value={dados.observacoes6} />

        <input type="hidden" name="pergunta_7" value={dados.pergunta7} />
        <input type="hidden" name="observacoes_7" value={dados.observacoes7} />

        <input type="hidden" name="pergunta_8" value={dados.pergunta8} />

        <section className="mb-10 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
            Orçamento premium
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-cyan-50 md:text-6xl">
            Vamos desenhar a estrutura autoral da sua mesa radiônica
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-cyan-50/72 md:text-lg">
            Este formulário nos ajuda a entender seu nível atual, sua visão de
            ferramenta, sua identidade energética e o potencial de posicionamento
            da sua mesa personalizada.
          </p>
        </section>

        <section className="mb-8 rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-5 backdrop-blur-2xl md:p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/85">
              Etapa {etapa} de {totalEtapas}
            </p>

            <p className="text-sm text-cyan-50/60">{porcentagem}% concluído</p>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-cyan-950/60">
            <div
              className="h-full rounded-full bg-cyan-300 transition-all duration-500"
              style={{ width: `${porcentagem}%` }}
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-300/18 bg-cyan-400/10 p-6 backdrop-blur-2xl md:p-10">
          {etapa === 1 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Seus dados
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                Antes de tudo, quero saber quem está construindo essa nova fase
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Preencha seus dados para que possamos entrar em contato com mais
                rapidez e entender melhor sua proposta.
              </p>

              <div className="mt-10 grid gap-6">
                <div>
                  <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={dados.nomeCompleto}
                    onChange={(e) =>
                      atualizarCampo("nomeCompleto", e.target.value)
                    }
                    className={classeInput}
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                    Telefone com DDD
                  </label>
                  <input
                    type="tel"
                    value={dados.telefone}
                    onChange={(e) =>
                      atualizarCampo("telefone", e.target.value)
                    }
                    className={classeInput}
                    placeholder="(51) 99999-9999"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                    Email
                  </label>
                  <input
                    type="email"
                    value={dados.email}
                    onChange={(e) => atualizarCampo("email", e.target.value)}
                    className={classeInput}
                    placeholder="seuemail@exemplo.com"
                  />
                </div>
              </div>
            </div>
          )}

          {etapa === 2 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Diagnóstico
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                Você já atua com mesas radiônicas?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Essa resposta nos ajuda a entender seu nível de maturidade no
                tema e o quanto sua ferramenta precisa nascer já com uma
                presença de mercado mais sólida.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Já atuo, mas pretendo criar a minha",
                  "Tenho o curso, mas não atuo",
                  "Já ouvi falar, mas nunca usei",
                  "Nem sei o que é",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta1 === opcao}
                      onChange={() => atualizarCampo("pergunta1", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Observações
                </label>
                <textarea
                  value={dados.observacoes1}
                  onChange={(e) =>
                    atualizarCampo("observacoes1", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Conte um pouco mais sobre sua experiência com mesas radiônicas"
                />
              </div>
            </div>
          )}

          {etapa === 3 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Identidade energética
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                Em qual egrégora você pretende montar sua ferramenta autoral?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Aqui começa a alma da sua mesa. Essa definição ajuda a orientar
                linguagem, presença, símbolos e direção da estrutura.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  "Anjos",
                  "Fraternidade Branca",
                  "Cristã",
                  "Arcanjos",
                  "Linhas de umbanda",
                  "Hoodoo",
                  "Deuses",
                  "Reiki",
                  "Ets",
                  "Sem egrégora",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta2 === opcao}
                      onChange={() => atualizarCampo("pergunta2", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Outras ou observações
                </label>
                <textarea
                  value={dados.pergunta2Outras}
                  onChange={(e) =>
                    atualizarCampo("pergunta2Outras", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Se sua egrégora for outra, escreva aqui e explique um pouco"
                />
              </div>
            </div>
          )}

          {etapa === 4 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Estrutura ritual
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                Você já tem os decretos de ativação da sua ferramenta?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Saber isso nos mostra o quanto sua proposta já está consolidada e
                o quanto a criação da mesa pode fortalecer ainda mais seu método.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Já tenho os decretos de abertura e encerramento",
                  "Já tenho os decretos de ativação de cada ferramenta",
                  "Já tenho toda a minha apostila de trabalho",
                  "Vou criar após a construção da minha mesa",
                  "Não faço ideia de como montar isso",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta3 === opcao}
                      onChange={() => atualizarCampo("pergunta3", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Observações
                </label>
                <textarea
                  value={dados.observacoes3}
                  onChange={(e) =>
                    atualizarCampo("observacoes3", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Conte mais sobre decretos, ativações, materiais e apostilas"
                />
              </div>
            </div>
          )}

          {etapa === 5 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Modelo de uso
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                De qual forma você pretende trabalhar com sua ferramenta?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Essa resposta já revela o potencial de posicionamento, expansão e
                autoridade que sua mesa pode carregar.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Uso próprio, apenas auto atendimento",
                  "Atendimento dos meus consulentes",
                  "Atendimentos e cursos",
                  "Atendimentos, cursos e mentorias",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta4 === opcao}
                      onChange={() => atualizarCampo("pergunta4", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Observações
                </label>
                <textarea
                  value={dados.observacoes4}
                  onChange={(e) =>
                    atualizarCampo("observacoes4", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Descreva como você imagina o uso da sua ferramenta no dia a dia"
                />
              </div>
            </div>
          )}

          {etapa === 6 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Conversão e identidade
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                Como você se sentiria em poder trabalhar com uma ferramenta autoral, sem depender da criação de outros terapeutas?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Uma mesa própria muda sua percepção interna e também a forma como
                o cliente vê você. Essa etapa mede o quanto sua identidade está
                pronta para se tornar marca.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Me sentiria mais confiante e com mais identidade",
                  "Me ajudaria a me posicionar melhor no mercado",
                  "Eu sentiria que finalmente estaria construindo algo meu",
                  "Acredito que isso aumentaria minha autoridade",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta5 === opcao}
                      onChange={() => atualizarCampo("pergunta5", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Observações
                </label>
                <textarea
                  value={dados.observacoes5}
                  onChange={(e) =>
                    atualizarCampo("observacoes5", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Escreva como isso impactaria sua confiança, sua marca e sua presença"
                />
              </div>
            </div>
          )}

          {etapa === 7 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Valor percebido
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                O quanto você acredita que uma mesa própria pode elevar o valor do seu atendimento?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Profissionais que têm uma estrutura autoral costumam transmitir
                mais valor, mais clareza e mais autoridade. Aqui queremos entender
                o quanto isso já está vivo para você.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Aumentaria muito meu valor percebido",
                  "Me ajudaria a cobrar melhor",
                  "Me faria parecer mais profissional e premium",
                  "Ajudaria meu cliente a enxergar mais valor no meu método",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta6 === opcao}
                      onChange={() => atualizarCampo("pergunta6", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Observações
                </label>
                <textarea
                  value={dados.observacoes6}
                  onChange={(e) =>
                    atualizarCampo("observacoes6", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Conte como sua mesa própria influenciaria ticket, posicionamento e valor percebido"
                />
              </div>
            </div>
          )}

          {etapa === 8 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Visibilidade e autoridade
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                Como sua comunicação mudaria se você pudesse mostrar no YouTube, em cursos ou em atendimentos uma ferramenta criada exclusivamente para você?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Aqui entramos na expansão da sua imagem. Uma ferramenta autoral
                fortalece vídeos, aulas, mentorias, conteúdos e presença de marca.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Me daria muito mais autoridade para aparecer",
                  "Me ajudaria a vender melhor minha proposta",
                  "Fortaleceria minha imagem como terapeuta com método próprio",
                  "Me faria parecer mais preparado e mais exclusivo",
                ].map((opcao) => (
                  <label key={opcao} className={classeOpcao}>
                    <input
                      type="radio"
                      className="mr-3"
                      checked={dados.pergunta7 === opcao}
                      onChange={() => atualizarCampo("pergunta7", opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Observações
                </label>
                <textarea
                  value={dados.observacoes7}
                  onChange={(e) =>
                    atualizarCampo("observacoes7", e.target.value)
                  }
                  className={classeTextarea}
                  placeholder="Escreva como essa ferramenta poderia fortalecer sua presença em vídeos, cursos e atendimentos"
                />
              </div>
            </div>
          )}

          {etapa === 9 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Visão final
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-cyan-50 md:text-5xl">
                O que mais você gostaria que sua mesa autoral transmitisse sobre você e sobre o seu trabalho?
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-cyan-50/72">
                Aqui você pode abrir sua visão. Quanto mais clareza você trouxer,
                mais forte será a direção da sua futura ferramenta.
              </p>

              <div className="mt-10">
                <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                  Sua resposta
                </label>
                <textarea
                  value={dados.pergunta8}
                  onChange={(e) => atualizarCampo("pergunta8", e.target.value)}
                  className="min-h-[220px] w-full rounded-3xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-white placeholder:text-cyan-100/45 outline-none backdrop-blur-xl transition focus:border-cyan-300/45 focus:bg-cyan-400/14"
                  placeholder="Escreva livremente sobre sua visão, sua proposta, a imagem que quer transmitir e o que deseja construir"
                />
              </div>

              <div className="mt-10 rounded-[1.8rem] border border-cyan-300/20 bg-cyan-400/10 p-6 backdrop-blur-2xl">
                <p className="text-lg font-medium leading-8 text-cyan-50/90">
                  Você está prestes a enviar uma solicitação de orçamento para
                  uma mesa radiônica criada a partir da sua identidade, do seu
                  método e do nível de presença que você quer transmitir.
                </p>
              </div>
            </div>
          )}

          {erro && (
            <div className="mt-8 rounded-3xl border border-cyan-300/25 bg-cyan-400/10 px-5 py-4 text-sm text-cyan-100">
              {erro}
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={voltarEtapa}
              className={`rounded-3xl border px-8 py-4 text-base font-medium transition ${
                etapa === 1
                  ? "cursor-not-allowed border-cyan-300/10 bg-cyan-400/5 opacity-40"
                  : "border-cyan-300/20 bg-cyan-400/10 text-cyan-50 hover:border-cyan-300/40 hover:bg-cyan-400/14"
              }`}
              disabled={etapa === 1}
            >
              Voltar
            </button>

            {etapa < totalEtapas ? (
              <button
                type="button"
                onClick={avancarEtapa}
                className="rounded-3xl bg-cyan-300 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Continuar
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-3xl bg-cyan-300 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Enviar solicitação de orçamento
              </button>
            )}
          </div>
        </section>
      </form>
    </main>
  );
}