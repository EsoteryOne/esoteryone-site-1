"use client";

import Image from "next/image";
import Link from "next/link";

type LogoEsoteryOneProps = {
  tamanho?: "sm" | "md" | "lg";
  clicavel?: boolean;
};

export default function LogoEsoteryOne({
  tamanho = "md",
  clicavel = true,
}: LogoEsoteryOneProps) {
  const larguras = {
    sm: "w-[150px] sm:w-[170px] lg:w-[185px]",
    md: "w-[170px] sm:w-[200px] lg:w-[220px]",
    lg: "w-[190px] sm:w-[220px] lg:w-[250px]",
  };

  const conteudo = (
    <div className="inline-flex items-center">
  <div className={`relative ${larguras[tamanho]}`}>
        <Image
          src="/imagens/logo.webp"
          alt="EsoteryOne"
          width={500}
          height={140}
          priority
          className="h-auto w-full object-contain brightness-[1.03] drop-shadow-[0_0_10px_rgba(34,211,238,0.12)] transition duration-300 group-hover:brightness-[1.08]"
        />
      </div>
    </div>
  );

  if (!clicavel) {
    return conteudo;
  }

  return (
    <Link
      href="/"
      aria-label="Voltar para a página inicial"
      className="inline-flex"
    >
      {conteudo}
    </Link>
  );
}