import type { RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import NetworkGraph from './NetworkGraph';
import BackgroundParticles from './BackgroundParticles';

interface Props {
  isVisible: boolean;
  eventSource: RefObject<HTMLElement | null>;
}

export default function HeroScene({ isVisible, eventSource }: Props) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop={isVisible ? 'always' : 'never'}
      eventSource={eventSource}
      eventPrefix="client"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} color="#D4A017" intensity={40} />
      <pointLight position={[-3, -2, -2]} color="#E8C46B" intensity={25} />
      <NetworkGraph />
      <BackgroundParticles />
    </Canvas>
  );
}
