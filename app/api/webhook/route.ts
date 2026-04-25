import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_REMETENTE,
    pass: process.env.EMAIL_SENHA_APP,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const evento = body.type;
    const pedido = body.data;
    const codigoPedido = pedido?.code || pedido?.order?.code;

    if (!codigoPedido) {
      return NextResponse.json({ ok: true });
    }

    const { data: lead } = await supabase
      .from("leads")
      .select("*")
      .eq("codigo_pedido_pagarme", codigoPedido)
      .maybeSingle();

    if (!lead) {
      return NextResponse.json({ ok: true });
    }

    if (evento === "order.paid" || evento === "charge.paid") {
      const { data: compraExistente } = await supabase
        .from("compras")
        .select("id")
        .eq("codigo_pedido_pagarme", codigoPedido)
        .maybeSingle();

      if (!compraExistente) {
        await supabase.from("compras").insert({
          usuario_id: null,
          produto_id: lead.produto_id,
          status: "pago",
          data_compra: new Date().toISOString(),
          email_compra: lead.email,
          codigo_pedido_pagarme: codigoPedido,
          valor_pago_centavos: lead.valor_final_centavos,
          metodo_pagamento: pedido?.payment_method || "pagarme",
        });
      }

      const { data: produto } = await supabase
        .from("produtos")
        .select("nome, slug")
        .eq("id", lead.produto_id)
        .maybeSingle();

      const nomeProduto = produto?.nome || "seu produto";
      const slugProduto = produto?.slug || lead.slug_produto || "emotion-tab";
      const linkAcesso = `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso/${slugProduto}`;

      await transporter.sendMail({
        from: `"EsoteryOne" <${process.env.EMAIL_REMETENTE}>`,
        to: lead.email,
        subject: `Seu acesso ao ${nomeProduto}`,
        html: `
          <div style="background:#030712;padding:40px 20px;font-family:Arial,sans-serif;color:#e6f6ff;">
            <div style="max-width:600px;margin:0 auto;background:#071827;border-radius:20px;padding:30px;border:1px solid rgba(34,211,238,0.2);">
              <p style="font-size:12px;letter-spacing:3px;color:#22d3ee;text-transform:uppercase;">EsoteryOne</p>
              <h1 style="font-size:26px;margin-top:10px;">Pagamento confirmado</h1>
              <p style="margin-top:20px;color:#cde7f5;">Seu acesso ao <strong>${nomeProduto}</strong> está liberado.</p>
              <p style="margin-top:10px;color:#9fbccc;">Clique no botão abaixo para acessar imediatamente:</p>
              <div style="text-align:center;margin:30px 0;">
                <a href="${linkAcesso}" style="background:#22d3ee;color:#031018;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:bold;display:inline-block;">
                  Acessar agora
                </a>
              </div>
              <div style="margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);font-size:13px;color:#7aa6b8;">
                Se você tiver qualquer dúvida, responda este email.
              </div>
            </div>
          </div>
        `,
      });

      await supabase
        .from("leads")
        .update({ status: "pago" })
        .eq("codigo_pedido_pagarme", codigoPedido);
    }

    if (evento === "order.payment_failed" || evento === "charge.payment_failed") {
      await supabase
        .from("leads")
        .update({
          status: "falhou",
          erro_pagamento: "Pagamento recusado pelo emissor.",
        })
        .eq("codigo_pedido_pagarme", codigoPedido);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro webhook:", error);
    return NextResponse.json({ ok: true });
  }
}