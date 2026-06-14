'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The rolling buffer, visualized: a ring of segments where a bright "head"
 * sweeps continuously and trails a glow that fades — the buffer always holding
 * the last few seconds and renewing itself. Purely decorative.
 */
function Ring() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const COUNT = 72;
  const R = 2;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const base = useMemo(() => new THREE.Color('#1E5BD6'), []);
  const bright = useMemo(() => new THREE.Color('#8FC0FF'), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const head = (t * 0.7) % (Math.PI * 2);

    for (let i = 0; i < COUNT; i++) {
      const a = (i / COUNT) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      dummy.rotation.set(0, 0, a + Math.PI / 2);

      // angular distance trailing behind the sweeping head (0..2π)
      let d = head - a;
      d = ((d % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const glow = Math.max(0, 1 - d / 1.3);

      const len = 0.22 + glow * 0.22;
      dummy.scale.set(0.05, len, 0.05);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      color.copy(base).lerp(bright, glow);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.rotation.z = t * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 72]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.92} />
    </instancedMesh>
  );
}

export default function BufferRingScene() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 78 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.75]}
      style={{ pointerEvents: 'none' }}
    >
      <Ring />
    </Canvas>
  );
}
