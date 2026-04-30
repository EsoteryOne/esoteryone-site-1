import type { Metadata } from "next";
import "./globals.css";
import EstruturaSite from "@/app/componentes/estrutura-site";

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
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ESHC13MRMW"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ESHC13MRMW');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wjsq3mpty2");
            `,
          }}
        />
      </head>

      <body className="bg-[#030712] text-white antialiased">
        <EstruturaSite>{children}</EstruturaSite>
      </body>
    </html>
  );
}