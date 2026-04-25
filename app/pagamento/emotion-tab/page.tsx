"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MetodoPagamento = "cartao" | "pix";

export default function PagamentoEmotionTabPage() {
  const router = useRouter();

  const [metodoPagamento, setMetodoPagamento] =
    useState<MetodoPagamento>("cartao");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [codigoPedido, setCodigoPedido] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copiaCola, setCopiaCola] = useState("");

  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    endereco: "",
    numero: "",
    complemento: "",
    cupom: "",

    numeroCartao: "",
    nomeCartao: "",
    mesExpiracao: "",
    anoExpiracao: "",
    cvv: "",
    parcelas: "1",
  });

  const valorOriginalCentavos = 95600;

  const cuponsPorCodigo: Record<string, number> = {
    LANCA20: 99,
  };

  const cupomNormalizado = dados.cupom.trim().toUpperCase();
  const percentualDesconto = cuponsPorCodigo[cupomNormalizado] ?? 0;

  const valorFinalCentavos = Math.round(
    valorOriginalCentavos * (1 - percentualDesconto / 100)
  );

  const valorOriginalFormatado = (valorOriginalCentavos / 100).toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );

  const valorFinalFormatado = (valorFinalCentavos / 100).toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );

  function atualizarCampo(campo: string, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  async function tokenizarCartao() {
    const chavePublica = process.env.NEXT_PUBLIC_PAGARME_CHAVE_PUBLICA;

    if (!chavePublica) {
      throw new Error("A chave pública da Pagar.me não foi configurada.");
    }

    const resposta = await fetch(
      `https://api.pagar.me/core/v5/tokens?appId=${chavePublica}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          type: "card",
          card: {
            number: dados.numeroCartao.replace(/\D/g, ""),
            holder_name: dados.nomeCartao,
            exp_month: Number(dados.mesExpiracao),
            exp_year: Number(dados.anoExpiracao),
            cvv: dados.cvv,
          },
        }),
      }
    );

    const respostaJson = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro ao tokenizar cartão:", respostaJson);
      throw new Error("Não foi possível validar os dados do cartão.");
    }

    return respostaJson.id;
  }

  async function finalizarPagamento() {
    setErro("");
    setCarregando(true);

    try {
      let cardToken = "";

      if (metodoPagamento === "cartao") {
        cardToken = await tokenizarCartao();
      }

      const resposta = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          cpf: dados.cpf,
          cep: dados.cep,
          estado: dados.estado,
          cidade: dados.cidade,
          bairro: dados.bairro,
          endereco: dados.endereco,
          numero: dados.numero,
          complemento: dados.complemento,
          cupom: dados.cupom,
          slug_produto: "emotion-tab",
          metodo_pagamento: metodoPagamento,
          card_token: cardToken || undefined,
          parcelas: dados.parcelas,
        }),
      });

      const respostaJson = await resposta.json();

      if (!resposta.ok) {
        throw new Error(respostaJson.error || "Erro ao iniciar pagamento.");
      }

      setCodigoPedido(respostaJson.codigo_pedido_pagarme);

      if (metodoPagamento === "pix") {
        setQrCodeUrl(respostaJson.qr_code_url || "");
        setCopiaCola(respostaJson.copia_cola || respostaJson.qr_code || "");
      }
    } catch (err: any) {
      setErro(err?.message || "Erro ao processar pagamento.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!codigoPedido) return;

    const intervalo = window.setInterval(async () => {
      const resposta = await fetch(
        `/api/verificar-pagamento?codigo_pedido_pagarme=${encodeURIComponent(
          codigoPedido
        )}`
      );

      const respostaJson = await resposta.json();

      if (respostaJson.status === "pago" || respostaJson.pago === true) {
        window.clearInterval(intervalo);
        router.push(respostaJson.destino || "/sucesso/emotion-tab");
        return;
      }

      if (respostaJson.status === "falhou") {
        window.clearInterval(intervalo);

        setErro(
          respostaJson.erro ||
            "Pagamento recusado. Tente outro cartão ou escolha Pix."
        );

        setCodigoPedido("");
        return;
      }
    }, 3000);

    return () => window.clearInterval(intervalo);
  }, [codigoPedido, router]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,#06111f_0%,#071827_30%,#0a2233_100%)] px-5 py-10 text-cyan-50">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-6 shadow-2xl backdrop-blur-2xl md:p-10">
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-cyan-300/20 bg-black/30 shadow-2xl">
          <img
            src="/imagens/banner-emotiontab.webp"
            alt="Banner do Emotion Tab"
            className="h-auto w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06111f]/70 via-transparent to-transparent" />
        </div>

        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          EsoteryOne
        </p>

        <h1 className="text-3xl font-semibold md:text-5xl">
          Finalizar compra do Emotion Tab
        </h1>

        <p className="mt-4 max-w-2xl text-cyan-50/70">
          Finalize seu pagamento e obtenha seu acesso ao EmotionTab e todas as
          atualizações por um ano.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-cyan-300/15 bg-[#071827]/70 p-5">
            <div className="mb-6 flex gap-3 rounded-2xl border border-cyan-300/15 bg-black/20 p-2">
              <button
                type="button"
                onClick={() => setMetodoPagamento("cartao")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  metodoPagamento === "cartao"
                    ? "bg-cyan-300 text-[#031018]"
                    : "text-cyan-50/70 hover:bg-cyan-300/10"
                }`}
              >
                Cartão de crédito
              </button>

              <button
                type="button"
                onClick={() => setMetodoPagamento("pix")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  metodoPagamento === "pix"
                    ? "bg-cyan-300 text-[#031018]"
                    : "text-cyan-50/70 hover:bg-cyan-300/10"
                }`}
              >
                Pagar com Pix
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input className="campo" placeholder="Nome completo" value={dados.nome} onChange={(e) => atualizarCampo("nome", e.target.value)} />
              <input className="campo" placeholder="Email" value={dados.email} onChange={(e) => atualizarCampo("email", e.target.value)} />
              <input className="campo" placeholder="Telefone" value={dados.telefone} onChange={(e) => atualizarCampo("telefone", e.target.value)} />
              <input className="campo" placeholder="CPF" value={dados.cpf} onChange={(e) => atualizarCampo("cpf", e.target.value)} />
              <input className="campo" placeholder="CEP" value={dados.cep} onChange={(e) => atualizarCampo("cep", e.target.value)} />
              <input className="campo" placeholder="Estado" value={dados.estado} onChange={(e) => atualizarCampo("estado", e.target.value)} />
              <input className="campo" placeholder="Cidade" value={dados.cidade} onChange={(e) => atualizarCampo("cidade", e.target.value)} />
              <input className="campo" placeholder="Bairro" value={dados.bairro} onChange={(e) => atualizarCampo("bairro", e.target.value)} />
              <input className="campo" placeholder="Endereço" value={dados.endereco} onChange={(e) => atualizarCampo("endereco", e.target.value)} />
              <input className="campo" placeholder="Número" value={dados.numero} onChange={(e) => atualizarCampo("numero", e.target.value)} />
              <input className="campo md:col-span-2" placeholder="Complemento" value={dados.complemento} onChange={(e) => atualizarCampo("complemento", e.target.value)} />
              <input className="campo md:col-span-2" placeholder="Cupom" value={dados.cupom} onChange={(e) => atualizarCampo("cupom", e.target.value)} />
            </div>

            {metodoPagamento === "cartao" && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input className="campo md:col-span-2" placeholder="Número do cartão" value={dados.numeroCartao} onChange={(e) => atualizarCampo("numeroCartao", e.target.value)} />
                <input className="campo md:col-span-2" placeholder="Nome impresso no cartão" value={dados.nomeCartao} onChange={(e) => atualizarCampo("nomeCartao", e.target.value)} />
                <input className="campo" placeholder="Mês, exemplo 12" value={dados.mesExpiracao} onChange={(e) => atualizarCampo("mesExpiracao", e.target.value)} />
                <input className="campo" placeholder="Ano, exemplo 2030" value={dados.anoExpiracao} onChange={(e) => atualizarCampo("anoExpiracao", e.target.value)} />
                <input className="campo" placeholder="CVV" value={dados.cvv} onChange={(e) => atualizarCampo("cvv", e.target.value)} />

                <select
                  className="campo"
                  value={dados.parcelas}
                  onChange={(e) => atualizarCampo("parcelas", e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, index) => {
                    const parcela = index + 1;

                    return (
                      <option key={parcela} value={parcela}>
                        {parcela} {parcela === 1 ? "parcela" : "parcelas"}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {erro && (
              <p className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                {erro}
              </p>
            )}

            <button
              type="button"
              onClick={finalizarPagamento}
              disabled={carregando}
              className="mt-6 w-full rounded-2xl bg-cyan-300 px-6 py-4 font-semibold text-[#031018] transition hover:brightness-110 disabled:opacity-60"
            >
              {carregando
                ? "Processando..."
                : metodoPagamento === "cartao"
                ? "Pagar com cartão"
                : "Gerar Pix"}
            </button>
          </div>

          <aside className="rounded-3xl border border-cyan-300/15 bg-black/20 p-5">
            <h2 className="text-xl font-semibold">Resumo</h2>

            <div className="mt-5 space-y-3 text-cyan-50/75">
              <div className="flex justify-between">
                <span>Produto</span>
                <strong>Emotion Tab</strong>
              </div>

              <div className="flex justify-between">
                <span>Valor original</span>
                <strong>{valorOriginalFormatado}</strong>
              </div>

              {percentualDesconto > 0 && (
                <div className="flex justify-between text-cyan-200">
                  <span>Cupom aplicado</span>
                  <strong>{percentualDesconto}% OFF</strong>
                </div>
              )}

              <div className="flex justify-between text-lg text-cyan-100">
                <span>Total</span>
                <strong>{valorFinalFormatado}</strong>
              </div>

              <div className="flex justify-between">
                <span>Pagamento</span>
                <strong>
                  {metodoPagamento === "cartao" ? "Cartão" : "Pix"}
                </strong>
              </div>
            </div>

            {codigoPedido && (
              <div className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-sm text-cyan-50/70">
                  Aguardando confirmação do pagamento.
                </p>

                <p className="mt-2 break-all text-xs text-cyan-100/70">
                  Pedido: {codigoPedido}
                </p>

                {metodoPagamento === "pix" && (
                  <div className="mt-5">
                    {qrCodeUrl && (
                      <img
                        src={qrCodeUrl}
                        alt="QR Code Pix"
                        className="mx-auto rounded-xl bg-white p-3"
                      />
                    )}

                    {copiaCola && (
                      <>
                        <textarea
                          readOnly
                          value={copiaCola}
                          className="mt-4 min-h-28 w-full rounded-xl border border-cyan-300/20 bg-black/30 p-3 text-xs text-cyan-50 outline-none"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(copiaCola)
                          }
                          className="mt-3 w-full rounded-xl border border-cyan-300/30 px-4 py-3 text-sm font-semibold text-cyan-100"
                        >
                          Copiar código Pix
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      <style jsx>{`
        .campo {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(103, 232, 249, 0.22);
          background: rgba(3, 16, 24, 0.72);
          padding: 0.9rem 1rem;
          color: #ecfeff;
          outline: none;
        }

        .campo::placeholder {
          color: rgba(236, 254, 255, 0.45);
        }

        .campo:focus {
          border-color: rgba(103, 232, 249, 0.65);
        }

        option {
          background: #071827;
          color: #ecfeff;
        }
      `}</style>
    </main>
  );
}