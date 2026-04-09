"use client";

import Link from "next/link";
import { useState } from "react";

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    { nome: "Início", rota: "/" },
    { nome: "Soluções", rota: "/solucoes" },
    { nome: "Visão", rota: "/visao" },
    { nome: "Tecnologias", rota: "/tecnologias" },
    { nome: "Minhas assinaturas", rota: "/minhas-assinaturas" },
    { nome: "Contato", rota: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
            <div className="absolute inset-[6px] rounded-xl border border-cyan-300/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_65%)]" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-cyan-300">
              EsoteryOne
            </p>
            <p className="text-xs text-white/45">
              tecnologia para terapeutas
            </p>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-7">
          {itensMenu.map((item) => (
            <Link
              key={item.rota}
              href={item.rota}
              className="text-sm text-white/68 transition duration-200 hover:text-cyan-300"
            >
              {item.nome}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/contato"
            className="hidden sm:inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-300/30 hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/tecnologias"
            className="inline-flex rounded-full bg-cyan-300 px-5 py-2 text-sm font-medium text-[#031018] transition hover:brightness-110"
          >
            Começar
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((valorAtual) => !valorAtual)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white transition hover:border-cyan-300/30 hover:text-cyan-300 sm:hidden"
        >
          <span className="text-2xl leading-none">{menuAberto ? "×" : "☰"}</span>
        </button>
      </div>

      {menuAberto && (
        <div className="border-t border-white/10 bg-[#050816]/95 px-6 pb-6 pt-4 sm:hidden">
          <nav className="flex flex-col gap-2">
            {itensMenu.map((item) => (
              <Link
                key={item.rota}
                href={item.rota}
                onClick={() => setMenuAberto(false)}
                className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-cyan-300/25 hover:text-cyan-300"
              >
                {item.nome}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/contato"
              onClick={() => setMenuAberto(false)}
              className="inline-flex justify-center rounded-full border border-white/12 px-4 py-3 text-sm text-white/75 transition hover:border-cyan-300/30 hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/tecnologias"
              onClick={() => setMenuAberto(false)}
              className="inline-flex justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-[#031018] transition hover:brightness-110"
            >
              Começar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}