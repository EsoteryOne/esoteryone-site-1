import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nome, email, telefone, slug_produto } = body;

    if (!nome || !email || !telefone || !slug_produto) {
      return NextResponse.json(
        { error: "Dados obrigatórios não enviados." },
        { status: 400 }
      );
    }

    const { data: produto, error: erroProduto } = await supabase
      .from("produtos")
      .select("*")
      .eq("slug", slug_produto)
      .single();

    if (erroProduto || !produto) {
      console.error("Erro ao buscar produto:", erroProduto);
      return NextResponse.json(
        { error: "Produto não encontrado." },
        { status: 400 }
      );
    }

    if (!produto.id_preco_stripe) {
      return NextResponse.json(
        { error: "Produto sem id_preco_stripe cadastrado." },
        { status: 400 }
      );
    }

    const { error: erroLead } = await supabase.from("leads").insert([
      {
        nome,
        email,
        telefone,
        slug_produto,
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

    console.log("========== DADOS ANTES DO CHECKOUT ==========");
    console.log("nome:", nome);
    console.log("email:", email);
    console.log("telefone:", telefone);
    console.log("slug_produto recebido:", slug_produto);
    console.log("produto.id:", produto.id);
    console.log("produto.nome:", produto.nome);
    console.log("produto.slug:", produto.slug);
    console.log("produto.id_preco_stripe:", produto.id_preco_stripe);
    console.log(
      "STRIPE_SECRET_KEY prefixo:",
      process.env.STRIPE_SECRET_KEY?.slice(0, 8)
    );
    console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
    console.log("============================================");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: produto.id_preco_stripe,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso/${slug_produto}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancelado`,
      metadata: {
        nome,
        email,
        telefone,
        slug_produto,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("========== ERRO STRIPE COMPLETO ==========");
    console.error("message:", err?.message);
    console.error("type:", err?.type);
    console.error("code:", err?.code);
    console.error("param:", err?.param);
    console.error("statusCode:", err?.statusCode);
    console.error("requestId:", err?.requestId);
    console.error("rawType:", err?.raw?.type);
    console.error("rawCode:", err?.raw?.code);
    console.error("rawParam:", err?.raw?.param);
    console.error("rawMessage:", err?.raw?.message);
    console.error("rawDeclineCode:", err?.raw?.decline_code);
    console.error("full error json:", JSON.stringify(err, null, 2));
    console.error("==========================================");

    return NextResponse.json(
      {
        error: "Erro interno ao criar checkout.",
        detalhe: err?.raw?.message || err?.message || "Sem mensagem de erro.",
      },
      { status: 500 }
    );
  }
}