import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function pegarCodigoPedido(dados: any) {
  return (
    dados?.order?.code ??
    dados?.code ??
    dados?.order_code ??
    dados?.charge?.order?.code ??
    dados?.charges?.[0]?.order?.code ??
    null
  );
}

function pegarIdEvento(evento: any, dados: any) {
  return evento?.id ?? dados?.id ?? dados?.code ?? null;
}

function pegarIdPedido(dados: any) {
  return dados?.order?.id ?? dados?.id ?? null;
}

function pegarIdCobranca(dados: any) {
  return dados?.charge?.id ?? dados?.charges?.[0]?.id ?? dados?.id ?? null;
}

function pegarMetodoPagamento(dados: any) {
  return (
    dados?.payment_method ??
    dados?.charge?.payment_method ??
    dados?.charges?.[0]?.payment_method ??
    "desconhecido"
  );
}

function pegarValorPagoCentavos(dados: any, lead: any) {
  return Number(
    dados?.amount ??
      dados?.paid_amount ??
      dados?.charge?.amount ??
      dados?.charges?.[0]?.amount ??
      lead?.valor_final_centavos ??
      0
  );
}

export async function POST(req: Request) {
  try {
    const evento = await req.json();

    console.log("========== WEBHOOK PAGAR.ME ==========");
    console.log(JSON.stringify(evento, null, 2));
    console.log("======================================");

    const tipoEvento = evento?.type || evento?.event;
    const dados = evento?.data;

    const eventosPagos = ["order.paid", "charge.paid", "payment.paid"];

    if (!eventosPagos.includes(tipoEvento)) {
      return NextResponse.json({
        received: true,
        ignored: true,
        type: tipoEvento,
      });
    }

    const codigoPedido = pegarCodigoPedido(dados);

    if (!codigoPedido) {
      console.error("Webhook sem código do pedido:", dados);
      return NextResponse.json(
        { error: "Webhook sem código do pedido." },
        { status: 400 }
      );
    }

    const { data: lead, error: erroLeadBusca } = await supabase
      .from("leads")
      .select("*")
      .eq("codigo_pedido_pagarme", codigoPedido)
      .maybeSingle();

    if (erroLeadBusca || !lead) {
      console.error("Lead não encontrado para o pedido:", codigoPedido);
      return NextResponse.json(
        { error: "Lead não encontrado para este pedido." },
        { status: 400 }
      );
    }

    const email = lead.email;
    const nome = lead.nome;
    const telefone = lead.telefone;
    const produto_id = lead.produto_id;

    const idEvento = pegarIdEvento(evento, dados);
    const idPedido = pegarIdPedido(dados);
    const idCobranca = pegarIdCobranca(dados);
    const metodoPagamento = pegarMetodoPagamento(dados);
    const valorPagoCentavos = pegarValorPagoCentavos(dados, lead);

    const { data: usuarioExistente, error: erroBuscaUsuario } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (erroBuscaUsuario) {
      console.error("Erro ao buscar usuário:", erroBuscaUsuario);
      return NextResponse.json(
        { error: "Erro ao buscar usuário." },
        { status: 500 }
      );
    }

    let usuarioId = usuarioExistente?.id;

    if (!usuarioId) {
      const { data: novoUsuario, error: erroUsuario } = await supabase
        .from("usuarios")
        .insert([
          {
            nome,
            email,
            telefone,
            acesso_liberado: true,
          },
        ])
        .select("*")
        .single();

      if (erroUsuario) {
        console.error("Erro ao criar usuário:", erroUsuario);
        return NextResponse.json(
          { error: "Erro ao criar usuário." },
          { status: 500 }
        );
      }

      usuarioId = novoUsuario.id;
    } else {
      const { error: erroAtualizarUsuario } = await supabase
        .from("usuarios")
        .update({
          nome,
          telefone,
          acesso_liberado: true,
        })
        .eq("id", usuarioId);

      if (erroAtualizarUsuario) {
        console.error("Erro ao atualizar usuário:", erroAtualizarUsuario);
        return NextResponse.json(
          { error: "Erro ao atualizar usuário." },
          { status: 500 }
        );
      }
    }

    const { data: compraExistente, error: erroBuscaCompra } = await supabase
      .from("compras")
      .select("id")
      .eq("codigo_pedido_pagarme", codigoPedido)
      .maybeSingle();

    if (erroBuscaCompra) {
      console.error("Erro ao buscar compra:", erroBuscaCompra);
      return NextResponse.json(
        { error: "Erro ao buscar compra." },
        { status: 500 }
      );
    }

    if (!compraExistente) {
      const { error: erroCompra } = await supabase.from("compras").insert([
        {
          usuario_id: usuarioId,
          produto_id,
          status: "pago",
          email_compra: email,

          id_pagarme_evento: idEvento ? String(idEvento) : null,
          id_pagarme_checkout: codigoPedido,
          codigo_pedido_pagarme: codigoPedido,
          id_pagarme_pedido: idPedido ? String(idPedido) : null,
          id_pagarme_cobranca: idCobranca ? String(idCobranca) : null,

          valor_pago_centavos: valorPagoCentavos,
          cupom_usado: lead.cupom_usado || null,
          metodo_pagamento: metodoPagamento,
        },
      ]);

      if (erroCompra) {
        console.error("Erro ao registrar compra:", erroCompra);
        return NextResponse.json(
          { error: "Erro ao registrar compra." },
          { status: 500 }
        );
      }
    }

    await supabase
      .from("leads")
      .update({ status: "pago" })
      .eq("codigo_pedido_pagarme", codigoPedido);

    return NextResponse.json({
      received: true,
      paid: true,
      codigoPedido,
      usuario_id: usuarioId,
      produto_id,
    });
  } catch (err: any) {
    console.error("Erro webhook Pagar.me:", err);

    return NextResponse.json(
      {
        error: "Erro no webhook.",
        detalhe: err?.message,
      },
      { status: 500 }
    );
  }
}