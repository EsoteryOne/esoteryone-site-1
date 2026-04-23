import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import SucessoDownloadClient from "@/app/sucesso/[slug]/SucessoDownloadClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type PaginaProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PaginaSucesso(props: PaginaProps) {
  const params = await props.params;
  const slug = params.slug;

  const { data: produto, error } = await supabase
    .from("produtos")
    .select("nome, slug, descricao, caminho_arquivo")
    .eq("slug", slug)
    .single();

  if (error || !produto) {
    notFound();
  }

  return (
    <SucessoDownloadClient
      nome={produto.nome}
      descricao={produto.descricao ?? ""}
      caminhoArquivo={produto.caminho_arquivo}
    />
  );
}