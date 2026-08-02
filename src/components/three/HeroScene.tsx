import type { RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import NetworkGraph from './NetworkGraph';

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
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} color="#38BDF8" intensity={25} />
      <pointLight position={[-3, -2, -2]} color="#7DD3FC" intensity={18} />
      <NetworkGraph />
    </Canvas>
  );
}
