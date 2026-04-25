import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const precosPorProduto: Record<string, number> = {
  "emotion-tab": 95600,
};

const cuponsPorCodigo: Record<string, number> = {
  LANCA20: 99,
};

function limparNumeros(valor: string) {
  return String(valor || "").replace(/\D/g, "");
}

function gerarCodigoPedido(slugProduto: string) {
  return `${slugProduto}-${Date.now()}`.slice(0, 52);
}

function calcularValorComCupom(valorOriginalCentavos: number, cupomNormalizado: string) {
  const percentualDesconto = cuponsPorCodigo[cupomNormalizado] ?? 0;
  const valorFinalCentavos = Math.round(valorOriginalCentavos * (1 - percentualDesconto / 100));

  return { percentualDesconto, valorFinalCentavos };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nome,
      email,
      telefone,
      cpf,
      cep,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      cupom,
      slug_produto,
      metodo_pagamento,
      card_token,
      parcelas,
    } = body;

    if (
      !nome ||
      !email ||
      !telefone ||
      !cpf ||
      !cep ||
      !estado ||
      !cidade ||
      !bairro ||
      !endereco ||
      !numero ||
      !slug_produto ||
      !metodo_pagamento
    ) {
      return NextResponse.json(
        { error: "Dados obrigatórios não enviados." },
        { status: 400 }
      );
    }

    if (!["cartao", "pix"].includes(metodo_pagamento)) {
      return NextResponse.json(
        { error: "Método de pagamento inválido." },
        { status: 400 }
      );
    }

    if (metodo_pagamento === "cartao" && !card_token) {
      return NextResponse.json(
        { error: "Token do cartão não enviado." },
        { status: 400 }
      );
    }

    const valorOriginalCentavos = precosPorProduto[slug_produto];

    if (!valorOriginalCentavos) {
      return NextResponse.json(
        { error: "Produto sem preço configurado na rota de checkout." },
        { status: 400 }
      );
    }

    const cupomNormalizado = String(cupom || "").trim().toUpperCase();

    if (cupomNormalizado && !cuponsPorCodigo[cupomNormalizado]) {
      return NextResponse.json({ error: "Cupom inválido." }, { status: 400 });
    }

    const { valorFinalCentavos } = calcularValorComCupom(
      valorOriginalCentavos,
      cupomNormalizado
    );

    if (valorFinalCentavos <= 0) {
      return NextResponse.json(
        { error: "Valor final inválido." },
        { status: 400 }
      );
    }

    const { data: produto, error: erroProduto } = await supabase
      .from("produtos")
      .select("*")
      .eq("slug", slug_produto)
      .single();

    if (erroProduto || !produto) {
      return NextResponse.json(
        { error: "Produto não encontrado." },
        { status: 400 }
      );
    }

    const telefoneLimpo = limparNumeros(telefone);
    const cpfLimpo = limparNumeros(cpf);
    const cepLimpo = limparNumeros(cep);
    const codigoPedido = gerarCodigoPedido(slug_produto);

    const { error: erroLead } = await supabase.from("leads").insert([
      {
        nome,
        email,
        telefone,
        slug_produto,
        produto_id: produto.id,
        codigo_pedido_pagarme: codigoPedido,
        valor_final_centavos: valorFinalCentavos,
        cupom_usado: cupomNormalizado || null,
        status: "checkout",
      },
    ]);

    if (erroLead) {
      console.error("Erro ao salvar lead:", erroLead);
      return NextResponse.json(
        { error: "Erro ao salvar lead." },
        { status: 500 }
      );
    }

    const payments =
      metodo_pagamento === "pix"
        ? [
            {
              payment_method: "pix",
              pix: {
                expires_in: 3600,
              },
            },
          ]
        : [
            {
              payment_method: "credit_card",
              credit_card: {
                operation_type: "auth_and_capture",
                card_token,
                installments: Number(parcelas || 1),
              },
            },
          ];

    const resposta = await fetch("https://api.pagar.me/core/v5/orders", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.PAGARME_CHAVE_SECRETA}:`).toString("base64"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code: codigoPedido,
        customer: {
          name: nome,
          email,
          document: cpfLimpo,
          type: "individual",
          phones: {
            mobile_phone: {
              country_code: "55",
              area_code: telefoneLimpo.slice(0, 2),
              number: telefoneLimpo.slice(2),
            },
          },
          address: {
            country: "BR",
            state: estado,
            city: cidade,
            zip_code: cepLimpo,
            line_1: `${numero}, ${endereco}, ${bairro}`,
            line_2: complemento || "",
          },
        },
        items: [
          {
            amount: valorFinalCentavos,
            description: produto.nome,
            quantity: 1,
            code: produto.slug || slug_produto,
          },
        ],
        payments,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro Pagar.me:", JSON.stringify(dados, null, 2));
      return NextResponse.json(
        { error: "Erro ao criar pedido no Pagar.me.", detalhe: dados },
        { status: 500 }
      );
    }

    const cobranca = dados.charges?.[0];
    const transacao = cobranca?.last_transaction;

    return NextResponse.json({
      tipo: metodo_pagamento,
      codigo_pedido_pagarme: codigoPedido,
      id_pagarme_pedido: dados.id,
      id_pagarme_cobranca: cobranca?.id || null,
      status: dados.status,
      valor_final_centavos: valorFinalCentavos,
      slug_produto,
      qr_code: transacao?.qr_code || null,
      qr_code_url: transacao?.qr_code_url || null,
      copia_cola: transacao?.qr_code || null,
    });
  } catch (err: any) {
    console.error("Erro completo:", err);
    return NextResponse.json(
      { error: "Erro interno ao criar checkout.", detalhe: err?.message },
      { status: 500 }
    );
  }
}