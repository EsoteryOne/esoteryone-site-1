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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura do webhook não enviada." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Erro ao validar assinatura do webhook:", err?.message);
    return NextResponse.json(
      { error: `Webhook inválido: ${err?.message}` },
      { status: 400 }
    );
  }

  try {
    console.log("========== WEBHOOK RECEBIDO ==========");
    console.log("event.id:", event.id);
    console.log("event.type:", event.type);
    console.log("======================================");

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const emailCompra = session.customer_email || session.customer_details?.email || null;
      const slugProduto = session.metadata?.slug_produto || null;
      const nomeCliente = session.metadata?.nome || null;

      if (!emailCompra || !slugProduto) {
        console.error("Webhook sem emailCompra ou slugProduto.");
        return NextResponse.json({ received: true });
      }

      const checkoutSessionId = session.id;

        const { data: compraExistentePorEvento } = await supabase
        .from("compras")
        .select("id")
        .eq("stripe_event_id", event.id)
        .maybeSingle();

        if (compraExistentePorEvento) {
        console.log("Compra já registrada para este evento.");
        return NextResponse.json({ received: true });
        }

        const { data: compraExistentePorSessao } = await supabase
        .from("compras")
        .select("id")
        .eq("stripe_checkout_session_id", checkoutSessionId)
        .maybeSingle();

        if (compraExistentePorSessao) {
        console.log("Compra já registrada para esta sessão.");
        return NextResponse.json({ received: true });
        }

      const { data: produto, error: erroProduto } = await supabase
        .from("produtos")
        .select("id, slug")
        .eq("slug", slugProduto)
        .single();

      if (erroProduto || !produto) {
        console.error("Produto não encontrado no webhook:", erroProduto);
        return NextResponse.json({ received: true });
      }

      let usuarioId: string | null = null;

      const { data: usuarioExistente, error: erroUsuarioExistente } = await supabase
        .from("usuarios")
        .select("id, email")
        .eq("email", emailCompra)
        .maybeSingle();

      if (erroUsuarioExistente) {
        console.error("Erro ao buscar usuário existente:", erroUsuarioExistente);
        return NextResponse.json({ received: true });
      }

      if (usuarioExistente) {
        usuarioId = usuarioExistente.id;
      } else {
        const { data: novoUsuario, error: erroNovoUsuario } = await supabase
          .from("usuarios")
          .insert([
            {
              nome: nomeCliente || emailCompra,
              email: emailCompra,
            },
          ])
          .select("id")
          .single();

        if (erroNovoUsuario || !novoUsuario) {
          console.error("Erro ao criar usuário no webhook:", erroNovoUsuario);
          return NextResponse.json({ received: true });
        }

        usuarioId = novoUsuario.id;
      }

      const agora = new Date();
      const expiraEm = new Date(agora);
      expiraEm.setFullYear(expiraEm.getFullYear() + 1);

      const { error: erroCompra } = await supabase.from("compras").insert([
        {
          usuario_id: usuarioId,
          produto_id: produto.id,
          status: "pago",
          data_compra: agora.toISOString(),
          expira_em: expiraEm.toISOString(),
          email_compra: emailCompra,
          stripe_event_id: event.id,
          stripe_checkout_session_id: checkoutSessionId,
        },
      ]);

      if (erroCompra) {
        console.error("Erro ao registrar compra:", erroCompra);
        return NextResponse.json({ received: true });
      }

      console.log("✅ Compra registrada com sucesso no checkout.session.completed");
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;

      const emailCompra = invoice.customer_email || null;

      console.log("invoice.paid recebido");
      console.log("invoice.id:", invoice.id);
      console.log("emailCompra:", emailCompra);

      // Neste momento, como seu fluxo real é de pagamento único e a validade
      // anual é controlada internamente por você na liberação da chave,
      // este bloco fica apenas registrado para compatibilidade futura.
      // Ele não cria nova compra para não duplicar registro.
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Erro interno no webhook:", err);
    return NextResponse.json(
      { error: "Erro interno no webhook." },
      { status: 500 }
    );
  }
}