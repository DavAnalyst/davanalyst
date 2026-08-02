import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WHATSAPP_URL } from '../data/content';
import { useTypewriter } from '../hooks/useTypewriter';

const VIDEO_SRC = '/videos/hero-scrub.mp4';
const SCRUB_SENSITIVITY = 1.6;

function HeroVideo({ onError }: { onError: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef<number | null>(null);
  const targetTime = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (prevX.current === null) {
        prevX.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;
      if (!video.duration || Number.isNaN(video.duration)) return;

      const offset = (delta / window.innerWidth) * SCRUB_SENSITIVITY * video.duration;
      targetTime.current = Math.min(Math.max(targetTime.current + offset, 0), video.duration);
      // Asignación directa en cada movimiento: sin esperar el evento "seeked"
      // del anterior, así el video responde de inmediato al mouse.
      video.currentTime = targetTime.current;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      onError={onError}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ objectPosition: '70% center' }}
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}

function HeroBackground({ reduce }: { reduce: boolean | null }) {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: i % 2 === 0 ? 70 : -60,
          y: i % 2 === 0 ? -50 : 60,
          scale: 1.15,
          duration: 11 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        ref={(el) => {
          blobRefs.current[0] = el;
        }}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.16]"
        style={{
          background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
          left: '-10%',
          top: '0%',
          filter: 'blur(50px)',
        }}
      />
      <div
        ref={(el) => {
          blobRefs.current[1] = el;
        }}
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.13]"
        style={{
          background: 'radial-gradient(circle, #7DD3FC 0%, transparent 70%)',
          right: '-6%',
          top: '30%',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}

const TYPEWRITER_TEXT =
  'Software a medida para hacer crecer tu negocio. Somos DavAnalyst: sitios web, bots e IA con resultados medibles, no solo bonitos.';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState<boolean | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, { speed: 22, startDelay: 600 });

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden bg-circuit-grid"
    >
      {videoFailed ? (
        <HeroBackground reduce={reduce} />
      ) : (
        <HeroVideo onError={() => setVideoFailed(true)} />
      )}

      <div className="max-w-xl relative z-10">
        {/* Texto de máquina de escribir */}
        <p
          className="text-text mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: 54,
            textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          {reduce ? TYPEWRITER_TEXT : displayed}
          {!reduce && !done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-text align-middle ml-[2px]"
              style={{ animation: 'blink 1s step-end infinite' }}
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Pills de acción */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-text text-bg border border-bg/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] min-h-11 mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary transition-colors duration-200"
          >
            Cotizar proyecto
          </a>
          <a
            href="#portafolio"
            className="inline-flex items-center justify-center bg-text text-bg border border-bg/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] min-h-11 mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary transition-colors duration-200"
          >
            Ver portafolio
          </a>
        </div>
      </div>
    </section>
  );
}
