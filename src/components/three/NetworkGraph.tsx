import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const POINT_COUNT = 34;
const CONNECT_DISTANCE = 0.95;
const BOUNDS = { x: 2.6, y: 1.6, z: 0.5 };
const SPEED = 0.35;

interface Point {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const points = useMemo<Point[]>(
    () =>
      Array.from({ length: POINT_COUNT }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS.x * 2,
          (Math.random() - 0.5) * BOUNDS.y * 2,
          (Math.random() - 0.5) * BOUNDS.z * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * SPEED,
          (Math.random() - 0.5) * SPEED,
          (Math.random() - 0.5) * SPEED * 0.5
        ),
      })),
    []
  );

  const maxPairs = (POINT_COUNT * (POINT_COUNT - 1)) / 2;
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxPairs * 2 * 3), 3));
    return geometry;
  }, [maxPairs]);

  useFrame((state, delta) => {
    // Si el frameloop estuvo pausado (Hero fuera de pantalla), el primer delta
    // tras reanudar puede representar todo ese tiempo de golpe — lo limitamos
    // para que los puntos no salgan disparados fuera de cámara.
    const dt = Math.min(delta, 1 / 30);

    // Mover cada punto y rebotar en los límites
    points.forEach((p, i) => {
      p.position.addScaledVector(p.velocity, dt);
      if (p.position.x > BOUNDS.x || p.position.x < -BOUNDS.x) {
        p.position.x = THREE.MathUtils.clamp(p.position.x, -BOUNDS.x, BOUNDS.x);
        p.velocity.x *= -1;
      }
      if (p.position.y > BOUNDS.y || p.position.y < -BOUNDS.y) {
        p.position.y = THREE.MathUtils.clamp(p.position.y, -BOUNDS.y, BOUNDS.y);
        p.velocity.y *= -1;
      }
      if (p.position.z > BOUNDS.z || p.position.z < -BOUNDS.z) {
        p.position.z = THREE.MathUtils.clamp(p.position.z, -BOUNDS.z, BOUNDS.z);
        p.velocity.z *= -1;
      }
      const mesh = meshRefs.current[i];
      if (mesh) mesh.position.copy(p.position);
    });

    // Recalcular qué pares están lo suficientemente cerca para conectarse
    const positionAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    let vertexIndex = 0;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].position.distanceTo(points[j].position) < CONNECT_DISTANCE) {
          positionAttr.setXYZ(vertexIndex++, points[i].position.x, points[i].position.y, points[i].position.z);
          positionAttr.setXYZ(vertexIndex++, points[j].position.x, points[j].position.y, points[j].position.z);
        }
      }
    }
    lineGeometry.setDrawRange(0, vertexIndex);
    positionAttr.needsUpdate = true;

    // Parallax sutil con el mouse en todo el grupo
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.15;
      const targetY = state.pointer.x * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.3} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={p.position}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#7DD3FC" emissive="#7DD3FC" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
