import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const codigoPedido = searchParams.get("codigo_pedido_pagarme");

  if (!codigoPedido) {
    return NextResponse.json(
      { error: "Código do pedido não enviado." },
      { status: 400 }
    );
  }

  // 🔥 BUSCA COMPRA
  const { data: compra } = await supabase
    .from("compras")
    .select("status, produtos(slug)")
    .eq("codigo_pedido_pagarme", codigoPedido)
    .maybeSingle();

  // 🔥 BUSCA LEAD
  const { data: lead } = await supabase
    .from("leads")
    .select("status, erro_pagamento, slug_produto")
    .eq("codigo_pedido_pagarme", codigoPedido)
    .maybeSingle();

  const status = compra?.status || lead?.status || "pendente";

  // ✅ PAGO
  if (status === "pago") {
    const produto = Array.isArray(compra?.produtos)
      ? compra?.produtos[0]
      : compra?.produtos;

    const slugProduto = produto?.slug || lead?.slug_produto || "emotion-tab";

    return NextResponse.json({
      status: "pago",
      pago: true,
      destino: `/sucesso/${slugProduto}`,
    });
  }

  // ❌ FALHOU
  if (status === "falhou") {
    return NextResponse.json({
      status: "falhou",
      pago: false,
      erro:
        lead?.erro_pagamento ||
        "Pagamento recusado. Tente outro cartão ou escolha Pix.",
    });
  }

  // ⏳ PENDENTE
  return NextResponse.json({
    status: "pendente",
    pago: false,
  });
}