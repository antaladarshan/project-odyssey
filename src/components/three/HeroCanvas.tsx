"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

// Particle field
function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#48a0c8"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

// Constellation lines
function Constellation() {
  const ref = useRef<THREE.LineSegments>(null);

  const { positions, indices } = useMemo(() => {
    const pts = Array.from({ length: 12 }, () => [
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 4 - 6,
    ]);

    const pos: number[] = [];
    const idx: number[] = [];

    pts.forEach((p, i) => {
      pos.push(...p);
      // Connect to nearest 1-2 neighbors
      if (i > 0) { idx.push(i - 1, i); }
      if (i > 1 && Math.random() > 0.5) { idx.push(i - 2, i); }
    });

    return {
      positions: new Float32Array(pos),
      indices: new Uint16Array(idx),
    };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.01;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="index" args={[indices, 1]} />
      </bufferGeometry>
      <lineBasicMaterial color="#3078b8" transparent opacity={0.18} />
    </lineSegments>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Particles count={180} />
      <Constellation />
    </Canvas>
  );
}
