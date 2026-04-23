"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CurvaEnergia = {
  line: THREE.Line;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
};

export default function EsferaEnergia() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const host = container;
    let animationId = 0;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const grupo = new THREE.Group();
    scene.add(grupo);

    const luzAmbiente = new THREE.AmbientLight(0x88ccff, 1.15);
    scene.add(luzAmbiente);

    const luz1 = new THREE.PointLight(0x66e6ff, 3.2, 30, 2);
    luz1.position.set(2.8, 2.2, 5);
    scene.add(luz1);

    const luz2 = new THREE.PointLight(0x5ea8ff, 2.4, 30, 2);
    luz2.position.set(-3.2, -2.2, 4.5);
    scene.add(luz2);

    const luz3 = new THREE.PointLight(0xdffcff, 1.2, 20, 2);
    luz3.position.set(0, 0, 3.2);
    scene.add(luz3);

    const wireGeometry = new THREE.SphereGeometry(2.02, 28, 28);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7fdfff"),
      transparent: true,
      opacity: 0.14,
      wireframe: true,
      depthWrite: false,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    grupo.add(wire);

    const glowGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#6fe7ff"),
      transparent: true,
      opacity: 0.028,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    grupo.add(glow);

    function pontoCurva(
      p: number,
      scaleX: number,
      scaleY: number,
      scaleZ: number
    ) {
      const x =
        Math.cos(p) * 1.95 +
        Math.sin(p * 3.1) * 0.22 +
        Math.cos(p * 1.7) * 0.08;

      const y =
        Math.sin(p * 2.0) * 0.52 +
        Math.cos(p * 3.6) * 0.22;

      const z =
        Math.sin(p) * 1.75 +
        Math.sin(p * 2.7) * 0.15 +
        Math.cos(p * 4.2) * 0.06;

      return new THREE.Vector3(x * scaleX, y * scaleY, z * scaleZ);
    }

    const curvasEnergia: CurvaEnergia[] = [];

    function criarCurvaEnergia(
      cor: string,
      opacity: number,
      scaleX: number,
      scaleY: number,
      scaleZ: number,
      rotX: number,
      rotY: number,
      rotZ: number
    ) {
      const pontos: THREE.Vector3[] = [];
      const total = 320;

      for (let i = 0; i <= total; i++) {
        const p = (i / total) * Math.PI * 2;
        pontos.push(pontoCurva(p, scaleX, scaleY, scaleZ));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(pontos);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(cor),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);
      line.rotation.set(rotX, rotY, rotZ);
      grupo.add(line);

      curvasEnergia.push({
        line,
        rotSpeedX: 0.0008 + curvasEnergia.length * 0.00025,
        rotSpeedY: 0.0012 + curvasEnergia.length * 0.0003,
        rotSpeedZ: 0.0009 + curvasEnergia.length * 0.00022,
      });
    }

    criarCurvaEnergia("#6deaff", 0.22, 1, 1, 1, 0.2, 0.5, 0.0);
    criarCurvaEnergia("#baf8ff", 0.16, 1.05, 0.9, 1.0, 1.1, 0.2, 0.5);
    criarCurvaEnergia("#4fd8ff", 0.13, 0.95, 1.15, 0.9, 0.65, 1.0, 0.3);
    criarCurvaEnergia("#dffcff", 0.11, 1.08, 0.82, 1.04, 1.3, 0.7, 1.0);

    // Icosaedro central
    const icosaGroup = new THREE.Group();
    icosaGroup.scale.set(1.15, 1.15, 1.15);
    grupo.add(icosaGroup);

    const icosaGeometry = new THREE.IcosahedronGeometry(1.35, 0);
    const icosaMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#bff7ff"),
      emissive: new THREE.Color("#56e4ff"),
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.3,
      roughness: 0.15,
      metalness: 0.08,
      transmission: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      side: THREE.DoubleSide,
    });
    const icosa = new THREE.Mesh(icosaGeometry, icosaMaterial);
    icosaGroup.add(icosa);

    const icosaEdgesGeometry = new THREE.EdgesGeometry(icosaGeometry);
    const icosaEdgesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#e2fcff"),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const icosaEdges = new THREE.LineSegments(
      icosaEdgesGeometry,
      icosaEdgesMaterial
    );
    icosaGroup.add(icosaEdges);

    const icosaGlowGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const icosaGlowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#73eaff"),
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const icosaGlow = new THREE.Mesh(icosaGlowGeometry, icosaGlowMaterial);
    icosaGroup.add(icosaGlow);

    const nucleoGeometry = new THREE.SphereGeometry(0.08, 20, 20);
    const nucleoMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.95,
    });
    const nucleo = new THREE.Mesh(nucleoGeometry, nucleoMaterial);
    icosaGroup.add(nucleo);

    icosaGroup.rotation.x = 0.5;
    icosaGroup.rotation.y = 0.25;

    function resize() {
      const width = host.clientWidth;
      const height = host.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    }

    const clock = new THREE.Clock();

    function animate() {
      const tempo = clock.getElapsedTime();

      grupo.rotation.y = tempo * 0.22;
      grupo.rotation.x = Math.sin(tempo * 0.45) * 0.12;
      grupo.rotation.z = Math.cos(tempo * 0.28) * 0.04;

      wire.rotation.y += 0.0022;
      wire.rotation.x += 0.0009;

      glow.scale.setScalar(1 + Math.sin(tempo * 1.2) * 0.015);

      curvasEnergia.forEach((curva) => {
        curva.line.rotation.x += curva.rotSpeedX;
        curva.line.rotation.y += curva.rotSpeedY;
        curva.line.rotation.z += curva.rotSpeedZ;
      });

      icosaGroup.rotation.y += 0.0045;
      icosaGroup.rotation.x += 0.0015;
      icosaGroup.rotation.z = Math.sin(tempo * 0.7) * 0.12;

      icosaGlow.scale.setScalar(1 + Math.sin(tempo * 1.4) * 0.035);
      nucleo.scale.setScalar(1 + Math.sin(tempo * 2.1) * 0.1);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);

      wireGeometry.dispose();
      wireMaterial.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      curvasEnergia.forEach((curva) => {
        curva.line.geometry.dispose();
        (curva.line.material as THREE.Material).dispose();
      });

      icosaGeometry.dispose();
      icosaMaterial.dispose();

      icosaEdgesGeometry.dispose();
      icosaEdgesMaterial.dispose();

      icosaGlowGeometry.dispose();
      icosaGlowMaterial.dispose();

      nucleoGeometry.dispose();
      nucleoMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[380px] w-[380px] sm:h-[500px] sm:w-[500px] lg:h-[620px] lg:w-[620px]"
    />
  );
}