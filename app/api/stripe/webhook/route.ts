import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura Stripe ausente" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    console.error("Erro ao validar webhook:", error);
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (!email) {
      return NextResponse.json({ received: true });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EsoteryOne" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Seu acesso ao Emotion Tab",
      html: `
        <h1>Pagamento aprovado</h1>
        <p>Seu acesso ao Emotion Tab foi liberado.</p>

        <p><strong>Download:</strong></p>
        <p><a href="SEU_LINK_DE_DOWNLOAD">Baixar Emotion Tab</a></p>

        <p><strong>Guia de instalação:</strong></p>
        <p><a href="SEU_LINK_PDF">Baixar manual</a></p>
      `,
    });
  }

  return NextResponse.json({ received: true });
}