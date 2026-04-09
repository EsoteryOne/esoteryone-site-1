"use client";

import { useEffect, useRef } from "react";

type Ponto3D = {
  x: number;
  y: number;
  z: number;
  brilho: number;
  camada: number;
  fase: number;
};

export default function BastaoTecnologico() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let largura = window.innerWidth;
    let altura = window.innerHeight;
    let animacao = 0;
    let tempo = 0;

    const imagem = new Image();
    imagem.src = "/imagens/bastao-esoteryone.png";

    let pontos: Ponto3D[] = [];

    const ajustarCanvas = () => {
      largura = window.innerWidth;
      altura = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(largura * dpr);
      canvas.height = Math.floor(altura * dpr);
      canvas.style.width = `${largura}px`;
      canvas.style.height = `${altura}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const gerarPontos = () => {
      if (!imagem.complete) return;

      const canvasAux = document.createElement("canvas");
      const ctxAux = canvasAux.getContext("2d");
      if (!ctxAux) return;

      const alturaDesejada = altura * 0.78;
      const larguraDesejada =
        (imagem.width / imagem.height) * alturaDesejada;

      canvasAux.width = Math.max(1, Math.floor(larguraDesejada));
      canvasAux.height = Math.max(1, Math.floor(alturaDesejada));

      ctxAux.clearRect(0, 0, canvasAux.width, canvasAux.height);
      ctxAux.drawImage(imagem, 0, 0, canvasAux.width, canvasAux.height);

      const dados = ctxAux.getImageData(
        0,
        0,
        canvasAux.width,
        canvasAux.height
      ).data;

      const espacamento = 5;
      const profundidade = 18;

      const novosPontos: Ponto3D[] = [];

      for (let y = 0; y < canvasAux.height; y += espacamento) {
        for (let x = 0; x < canvasAux.width; x += espacamento) {
          const indice = (y * canvasAux.width + x) * 4;
          const alpha = dados[indice + 3];

          if (alpha < 45) continue;

          const xCentral = x - canvasAux.width / 2;
          const yCentral = y - canvasAux.height / 2;

          novosPontos.push({
            x: xCentral,
            y: yCentral,
            z: (Math.random() - 0.5) * profundidade,
            brilho: 0.45 + Math.random() * 0.55,
            camada: Math.random(),
            fase: Math.random() * Math.PI * 2,
          });
        }
      }

      pontos = novosPontos;
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, largura, altura);

      const centroX = largura * 0.22;
      const centroY = altura * 0.52;
      const perspectiva = 560;
      const escalaBase = 0.9;

      tempo += 0.012;

      const gradiente = ctx.createRadialGradient(
        centroX,
        centroY,
        20,
        centroX,
        centroY,
        260
      );
      gradiente.addColorStop(0, "rgba(110,170,255,0.05)");
      gradiente.addColorStop(0.5, "rgba(80,120,255,0.02)");
      gradiente.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradiente;
      ctx.fillRect(0, 0, largura, altura);

      for (const ponto of pontos) {
        // Núcleo principal: mantém a forma do bastão
        const anguloBase = tempo * 0.9;
        const cosBase = Math.cos(anguloBase);
        const sinBase = Math.sin(anguloBase);

        // Camada secundária: gira um pouco diferente, mas sem desmontar a forma
        const pesoEspiral = ponto.camada * 0.35;
        const anguloSecundario =
          anguloBase + Math.sin(tempo * 1.8 + ponto.fase) * 0.22 * pesoEspiral;

        const cosSec = Math.cos(anguloSecundario);
        const sinSec = Math.sin(anguloSecundario);

        // Mistura entre rotação firme e rotação solta
        const rotXBase = ponto.x * cosBase - ponto.z * sinBase;
        const rotZBase = ponto.x * sinBase + ponto.z * cosBase;

        const rotXSec = ponto.x * cosSec - ponto.z * sinSec;
        const rotZSec = ponto.x * sinSec + ponto.z * cosSec;

        const rotX = rotXBase * (1 - pesoEspiral) + rotXSec * pesoEspiral;
        const rotZ = rotZBase * (1 - pesoEspiral) + rotZSec * pesoEspiral;

        // Torção leve, só para dar vida
        const yTorcao =
          ponto.y +
          Math.sin(tempo * 1.5 + ponto.y * 0.01 + ponto.fase) * 1.2 * pesoEspiral;

        const profundidadePerspectiva =
          perspectiva / (perspectiva + rotZ + 120);

        const xTela = centroX + rotX * profundidadePerspectiva * escalaBase;
        const yTela = centroY + yTorcao * profundidadePerspectiva * escalaBase;

        const intensidade = Math.max(
          0.18,
          Math.min(1, profundidadePerspectiva * ponto.brilho)
        );

        const fluxo =
          0.5 +
          0.5 *
            Math.sin(
              ponto.y * 0.018 + ponto.x * 0.008 - tempo * 4.0 + ponto.fase
            );

        let r = 95;
        let g = 155;
        let b = 255;

        if (fluxo > 0.8) {
          r = 255;
          g = 120;
          b = 190;
        } else if (fluxo > 0.54) {
          r = 120;
          g = 220;
          b = 255;
        }

        const tamanho = 0.34 + intensidade * 0.9;
        const glow = tamanho * (1.9 + fluxo * 1.2);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.028 + intensidade * 0.07})`;
        ctx.arc(xTela, yTela, glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.24 + intensidade * 0.5})`;
        ctx.arc(xTela, yTela, tamanho, 0, Math.PI * 2);
        ctx.fill();

        if (fluxo > 0.86) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${0.08 + intensidade * 0.1})`;
          ctx.arc(xTela, yTela, tamanho * 0.36, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animacao = requestAnimationFrame(desenhar);
    };

    ajustarCanvas();

    imagem.onload = () => {
      gerarPontos();
      desenhar();
    };

    const aoRedimensionar = () => {
      ajustarCanvas();
      gerarPontos();
    };

    window.addEventListener("resize", aoRedimensionar);

    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("resize", aoRedimensionar);
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