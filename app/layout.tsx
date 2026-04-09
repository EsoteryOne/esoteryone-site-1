import type { Metadata } from "next";
import "./globals.css";
import Cabecalho from "./componentes/cabecalho";

export const metadata: Metadata = {
  title: "EsoteryOne",
  description: "Tecnologia para terapeutas do futuro",
};

export default function LayoutRaiz({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#030712] text-white antialiased">
        <Cabecalho />
        {children}
      </body>
    </html>
  );
}