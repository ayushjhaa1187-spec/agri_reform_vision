import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const POINT_COUNT = 200;
const HELIX_RADIUS = 2.5;
const HELIX_HEIGHT = 8;
const POINT_SIZE = 0.06;

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export default function DNAHelix() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate helix positions
  const positions = useMemo(() => {
    const pts: { x: number; y: number; z: number; strand: number }[] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = (i / POINT_COUNT) * Math.PI * 4;
      const y = (i / POINT_COUNT) * HELIX_HEIGHT - HELIX_HEIGHT / 2;

      // Strand 1
      pts.push({
        x: Math.cos(t) * HELIX_RADIUS,
        y,
        z: Math.sin(t) * HELIX_RADIUS,
        strand: 0,
      });

      // Strand 2 (offset by PI)
      pts.push({
        x: Math.cos(t + Math.PI) * HELIX_RADIUS,
        y,
        z: Math.sin(t + Math.PI) * HELIX_RADIUS,
        strand: 1,
      });
    }
    return pts;
  }, []);

  const totalPoints = positions.length;

  // Colors for each instance
  const colors = useMemo(() => {
    const arr = new Float32Array(totalPoints * 3);
    positions.forEach((p, i) => {
      const color = p.strand === 0
        ? tempColor.setHSL(0.42, 0.8, 0.45 + Math.random() * 0.15) // emerald
        : tempColor.setHSL(0.47, 0.7, 0.5 + Math.random() * 0.1);  // teal
      arr[i * 3] = color.r;
      arr[i * 3 + 1] = color.g;
      arr[i * 3 + 2] = color.b;
    });
    return arr;
  }, [positions, totalPoints]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.3;

    // Mouse parallax
    const pointer = state.pointer;
    mouseRef.current.x += (pointer.x * viewport.width * 0.05 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y * viewport.height * 0.05 - mouseRef.current.y) * 0.05;

    positions.forEach((p, i) => {
      const waveOffset = Math.sin(time + p.y * 0.5) * 0.3;
      tempObject.position.set(
        p.x + waveOffset + mouseRef.current.x,
        p.y,
        p.z + waveOffset * 0.5 + mouseRef.current.y
      );

      // Scale pulse
      const scale = POINT_SIZE * (1 + Math.sin(time * 2 + i * 0.1) * 0.3);
      tempObject.scale.setScalar(scale * 10);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      <pointLight position={[-3, 2, -3]} intensity={0.3} color="#14b8a6" />

      <instancedMesh ref={meshRef} args={[undefined, undefined, totalPoints]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          toneMapped={false}
          emissive="#10b981"
          emissiveIntensity={0.5}
          transparent
          opacity={0.85}
        >
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </meshStandardMaterial>
      </instancedMesh>
    </>
  );
}
