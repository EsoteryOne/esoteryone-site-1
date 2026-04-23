"use client";

import { usePathname } from "next/navigation";
import Cabecalho from "./cabecalho";

export default function EstruturaSite({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const esconderCabecalho = pathname.startsWith("/lp");

  return (
    <>
      {!esconderCabecalho && <Cabecalho />}
      {children}
    </>
  );
}