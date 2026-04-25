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
  LANCA20: 99.9,
};

function limparNumeros(valor: string) {
  return String(valor || "").replace(/\D/g, "");
}

function gerarCodigoPedido(slugProduto: string) {
  return `${slugProduto}-${Date.now()}`.slice(0, 52);
}

function calcularValorComCupom(valorOriginalCentavos: number, cupomNormalizado: string) {
  const percentualDesconto = cuponsPorCodigo[cupomNormalizado] ?? 0;
  const valorFinalCentavos = Math.round(
    valorOriginalCentavos * (1 - percentualDesconto / 100)
  );

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
      !slug_produto
    ) {
      return NextResponse.json(
        { error: "Dados obrigatórios não enviados." },
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

    const { percentualDesconto, valorFinalCentavos } = calcularValorComCupom(
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

    const resposta = await fetch("https://api.pagar.me/core/v5/paymentlinks", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.PAGARME_CHAVE_SECRETA}:`).toString("base64"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: "order",
        name:
          percentualDesconto > 0
            ? `${produto.nome} - Cupom ${cupomNormalizado}`
            : produto.nome,
        order_code: codigoPedido,
        max_paid_sessions: 1,

        checkout_settings: {
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso/${slug_produto}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancelado`,
        },

        customer_settings: {
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
        },

        payment_settings: {
          accepted_payment_methods: ["credit_card", "pix"],
          credit_card_settings: {
            operation_type: "auth_and_capture",
            installments_setup: {
              max_installments: 12,
              amount: valorFinalCentavos,
              interest_type: "Simple",
              interest_rate: 0,
            },
          },
          pix_settings: {
            expires_in: 3600,
          },
        },

        cart_settings: {
          items: [
            {
              name:
                percentualDesconto > 0
                  ? `${produto.nome} - Cupom ${cupomNormalizado}`
                  : produto.nome,
              amount: valorFinalCentavos,
              default_quantity: 1,
            },
          ],
        },

        metadata: {
          nome,
          email,
          telefone,
          cpf: cpfLimpo,
          cep: cepLimpo,
          estado,
          cidade,
          bairro,
          endereco,
          numero,
          complemento,
          slug_produto,
          produto_id: produto.id,
          cupom: cupomNormalizado || null,
          percentual_desconto: percentualDesconto,
          valor_original_centavos: valorOriginalCentavos,
          valor_final_centavos: valorFinalCentavos,
          codigo_pedido: codigoPedido,
          origem: "site-esoteryone",
        },
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro Pagar.me:", JSON.stringify(dados, null, 2));
      return NextResponse.json(
        { error: "Erro ao criar checkout no Pagar.me.", detalhe: dados },
        { status: 500 }
      );
    }

    const url =
      dados.url ??
      dados.payment_url ??
      dados.checkout_url ??
      dados.payment_link_url;

    if (!url) {
      return NextResponse.json(
        { error: "O Pagar.me não retornou a URL do checkout.", detalhe: dados },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Erro completo:", err);
    return NextResponse.json(
      { error: "Erro interno ao criar checkout.", detalhe: err?.message },
      { status: 500 }
    );
  }
}