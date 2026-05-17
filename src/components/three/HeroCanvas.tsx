import { Canvas } from '@react-three/fiber';
import WavingField from './WavingField';

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 4, 12], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <WavingField />
    </Canvas>
  );
}
