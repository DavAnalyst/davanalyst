import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.75;
const DETAIL = 1;

export default function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS, DETAIL), []);

  const nodePositions = useMemo(() => {
    const position = geometry.getAttribute('position');
    const unique = new Map<string, THREE.Vector3>();
    for (let i = 0; i < position.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(position, i);
      unique.set(`${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`, v);
    }
    return Array.from(unique.values());
  }, [geometry]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.7;
    const targetY = state.pointer.x * 0.9;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    groupRef.current.rotation.z += 0.0008;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#D4A017" transparent opacity={0.3} />
      </lineSegments>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshStandardMaterial color="#E8C46B" emissive="#E8C46B" emissiveIntensity={0.35} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}
