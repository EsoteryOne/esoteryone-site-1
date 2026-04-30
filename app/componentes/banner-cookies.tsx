"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BannerCookies() {
  const [visivel, setVisivel] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // ❌ NÃO mostrar em páginas /lp
    if (pathname?.toLowerCase().startsWith("/lp")) {
      return;
    }

    const aceito = localStorage.getItem("cookies_ok");

    if (!aceito) {
      setVisivel(true);
    }
  }, [pathname]);

  function confirmar() {
    localStorage.setItem("cookies_ok", "true");
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[#020617]/90 backdrop-blur border-t border-cyan-500/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-gray-300 text-center md:text-left">
          Utilizamos cookies para melhorar sua experiência e analisar o uso do site.
          Ao continuar navegando, você concorda com essas condições.
        </p>

        <button
          onClick={confirmar}
          className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}