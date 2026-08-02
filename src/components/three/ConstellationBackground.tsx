import { lazy, Suspense, useEffect, useState, type ReactNode, type RefObject } from 'react';
import CanvasErrorBoundary from './CanvasErrorBoundary';

const HeroScene = lazy(() => import('./HeroScene'));

function detectCanUse3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
  fallback?: ReactNode;
}

/** Fondo de red de nodos animada, reutilizable en cualquier sección. */
export default function ConstellationBackground({ sectionRef, fallback = null }: Props) {
  const [use3D, setUse3D] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setUse3D(detectCanUse3D());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  if (!use3D) return <>{fallback}</>;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <HeroScene isVisible={isVisible} eventSource={sectionRef} />
      </Suspense>
    </CanvasErrorBoundary>
  );
}
