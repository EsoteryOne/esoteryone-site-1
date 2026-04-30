import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import EstruturaSite from "@/app/componentes/estrutura-site";
import BannerCookies from "@/app/componentes/banner-cookies";

export const metadata: Metadata = {
  title: "EsoteryOne",
  description: "Tecnologia para terapeutas do futuro",
};

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#030712] text-white antialiased">
        <EstruturaSite>{children}</EstruturaSite>
        <BannerCookies />

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wjsq3mpty2");
          `}
        </Script>
      </body>

      {/* Google Analytics (OFICIAL NEXT) */}
      <GoogleAnalytics gaId="G-ESHC13MRMW" />
    </html>
  );
}