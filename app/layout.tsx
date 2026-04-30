import type { Metadata } from "next";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ESHC13MRMW"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ESHC13MRMW');
        `}
      </Script>

      <body className="bg-[#030712] text-white antialiased">
        <EstruturaSite>{children}</EstruturaSite>
        <BannerCookies />
      </body>
    </html>
  );
}