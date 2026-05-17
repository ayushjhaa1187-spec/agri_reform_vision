import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const STALK_COUNT = window.innerWidth < 768 ? 400 : 800;
const STALK_BASE_HEIGHT = 2.5;
const STALK_WIDTH = 0.015;
const FIELD_WIDTH = 18;
const FIELD_DEPTH = 10;

const tempObject = new THREE.Object3D();

export default function WavingField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Create Stalk Data
  const stalks = useMemo(() => {
    const data = [];
    for (let i = 0; i < STALK_COUNT; i++) {
      const x = (Math.random() - 0.5) * FIELD_WIDTH;
      const z = (Math.random() - 0.5) * FIELD_DEPTH;
      const height = STALK_BASE_HEIGHT * (0.8 + Math.random() * 0.4);
      const phaseOffset = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 0.1;
      
      data.push({ x, z, height, phaseOffset, tilt });
    }
    return data;
  }, []);

  // Geometry with vertex colors for gradient
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(STALK_WIDTH * 0.2, STALK_WIDTH, 1, 4, 1, false);
    // Shift geometry so origin is at the base
    geo.translate(0, 0.5, 0);
    
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    
    const colorBase = new THREE.Color('#1a4a2e');   // Deep forest green
    const colorMid = new THREE.Color('#22c55e');    // Emerald
    const colorTip = new THREE.Color('#fbbf24');    // Golden amber
    
    const pos = geo.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + 0.5; // normalized 0 to 1
      let finalColor;
      if (y < 0.5) {
        finalColor = colorBase.clone().lerp(colorMid, y * 2);
      } else {
        finalColor = colorMid.clone().lerp(colorTip, (y - 0.5) * 2);
      }
      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;
    }
    
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Mouse parallax
    const pointer = state.pointer;
    mouseRef.current.x += (pointer.x * 0.5 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y * 0.3 - mouseRef.current.y) * 0.05;

    stalks.forEach((s, i) => {
      // Wind swaying logic
      const speed = 1.2;
      const waveX = Math.sin(time * speed + s.x * 0.3 + s.z * 0.2 + s.phaseOffset) * 0.15;
      const waveZ = Math.cos(time * speed * 0.8 + s.x * 0.2 + s.z * 0.4 + s.phaseOffset) * 0.08;

      tempObject.position.set(s.x, -STALK_BASE_HEIGHT * 1.5, s.z);
      tempObject.rotation.set(
        waveZ + s.tilt + mouseRef.current.y,
        0,
        waveX + mouseRef.current.x
      );
      tempObject.scale.set(1, s.height, 1);
      
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#bbf7d0" /> {/* Cool moonlight-ish */}
      <pointLight position={[-10, 2, -5]} intensity={2} color="#fbbf24" /> {/* Warm golden horizon */}
      <fog attach="fog" args={['#020617', 5, 25]} />

      <instancedMesh ref={meshRef} args={[geometry, undefined, STALK_COUNT]}>
        <meshStandardMaterial 
          vertexColors 
          emissive="#fbbf24" 
          emissiveIntensity={0.1}
          roughness={0.8}
          metalness={0.2}
        />
      </instancedMesh>
    </>
  );
}
