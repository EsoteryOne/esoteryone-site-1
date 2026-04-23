"use client";

import { useEffect, useRef } from "react";

export default function OndaTecnologica() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const contexto = canvas.getContext("2d");
    if (!contexto) return;

    let largura = window.innerWidth;
    let altura = window.innerHeight;
    let animacao = 0;
    let tempo = 0;

    const ajustarCanvas = () => {
      largura = window.innerWidth;
      altura = window.innerHeight;

      const proporcao = window.devicePixelRatio || 1;
      canvas.width = Math.floor(largura * proporcao);
      canvas.height = Math.floor(altura * proporcao);
      canvas.style.width = `${largura}px`;
      canvas.style.height = `${altura}px`;

      contexto.setTransform(1, 0, 0, 1, 0, 0);
      contexto.scale(proporcao, proporcao);
    };

    ajustarCanvas();

    const desenhar = () => {
      tempo += 0.012;

      contexto.clearRect(0, 0, largura, altura);

      const gradiente = contexto.createLinearGradient(0, 0, 0, altura);
      gradiente.addColorStop(0, "#02040a");
      gradiente.addColorStop(0.55, "#050814");
      gradiente.addColorStop(1, "#02040a");

      contexto.fillStyle = gradiente;
      contexto.fillRect(0, 0, largura, altura);

      const espacamento = 18;
      const centroY = altura * 0.58;

      for (let x = 0; x < largura + espacamento; x += espacamento) {
        for (let y = 0; y < altura + espacamento; y += espacamento) {
          const distanciaCentro = Math.abs(y - centroY);

          const influenciaFaixa = Math.max(0, 1 - distanciaCentro / (altura * 0.42));

          if (influenciaFaixa <= 0) continue;

          const onda1 =
            Math.sin(x * 0.012 + tempo * 2.3) * 26 * influenciaFaixa;

          const onda2 =
            Math.cos(y * 0.02 + tempo * 1.7 + x * 0.004) * 14 * influenciaFaixa;

          const curvatura =
            Math.sin(x * 0.004 + tempo * 1.2) * 55 * influenciaFaixa;

          const posY = y + onda1 + onda2 + curvatura * 0.22;

          const brilho =
            0.18 +
            Math.max(
              0,
              Math.sin(x * 0.018 + tempo * 2.6) * 0.25 +
                Math.cos(y * 0.025 + tempo * 1.4) * 0.15
            );

          const tamanho = 1.1 + influenciaFaixa * 1.7;

          const corAzul = `rgba(160,190,255,${0.16 + brilho * 0.55})`;
          const corGlow = `rgba(110,150,255,${0.05 + brilho * 0.18})`;

          contexto.beginPath();
          contexto.fillStyle = corGlow;
          contexto.arc(x, posY, tamanho * 3.5, 0, Math.PI * 2);
          contexto.fill();

          contexto.beginPath();
          contexto.fillStyle = corAzul;
          contexto.arc(x, posY, tamanho, 0, Math.PI * 2);
          contexto.fill();
        }
      }

      animacao = requestAnimationFrame(desenhar);
    };

    desenhar();

    window.addEventListener("resize", ajustarCanvas);

    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("resize", ajustarCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}