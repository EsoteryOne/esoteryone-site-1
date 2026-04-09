export async function POST() {
  console.log("Webhook recebido");

  return new Response("ok");
}