import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { WHATSAPP_URL, projects, techStack } from '../data/content';
import ConstellationBackground from './three/ConstellationBackground';

gsap.registerPlugin(TextPlugin);

const terminalLines = [
  { prompt: true, text: 'npm run build', color: 'text-white/80' },
  { prompt: false, text: '✓ Compiled successfully', color: 'text-emerald-400' },
  { prompt: true, text: 'npm run deploy', color: 'text-white/80' },
  { prompt: false, text: '✓ Deployed to production', color: 'text-emerald-400' },
  { prompt: false, text: '# Listo para tu próximo proyecto', color: 'text-white/40' },
];

function HeroTerminal({ reduce }: { reduce: boolean | null }) {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6, repeat: -1, repeatDelay: 1.8 });

      terminalLines.forEach((line, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        tl.set(el, { text: '' }, i === 0 ? 0 : '+=0.1');
        tl.to(
          el,
          { duration: Math.max(line.text.length * 0.028, 0.25), text: line.text, ease: 'none' },
          '<'
        );
      });

      if (cursorRef.current) {
        // Parpadeo finito (no infinito) para no bloquear el repeat del timeline padre
        tl.set(cursorRef.current, { opacity: 1 });
        tl.to(cursorRef.current, { opacity: 0, duration: 0.4, repeat: 5, yoyo: true, ease: 'steps(1)' });
        tl.set(cursorRef.current, { opacity: 0 });
      }
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="p-6 font-mono text-sm leading-loose">
      {terminalLines.map((line, i) => (
        <p key={i}>
          {line.prompt && <span className="text-sky-400">$ </span>}
          <span
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={line.color}
          >
            {line.text}
          </span>
        </p>
      ))}
      <span
        ref={cursorRef}
        className="inline-block w-2 h-4 bg-white/60 align-middle opacity-0"
        aria-hidden="true"
      />
    </div>
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

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-circuit-grid pt-28 pb-16"
    >
      <ConstellationBackground sectionRef={sectionRef} fallback={<HeroBackground reduce={reduce} />} />

      {/* Scrim: suaviza la constelación detrás del texto para que se lea con claridad */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background:
            'radial-gradient(ellipse 100% 75% at 50% 40%, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 45%, rgba(15,23,42,0) 78%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.8) 38%, rgba(15,23,42,0) 68%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <motion.span
              {...fadeUp(0)}
              className="inline-block font-mono text-primary text-sm font-medium tracking-widest uppercase mb-5"
            >
              Desarrollo Web · IA · Automatización
            </motion.span>

            <motion.h1
              {...fadeUp(0.05)}
              className="font-display text-5xl sm:text-6xl font-bold text-text leading-[1.08] mb-6"
            >
              Software a medida para hacer crecer tu negocio.
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-muted text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Somos <strong className="text-text font-semibold">DavAnalyst</strong>: sitios web,
              bots e IA con resultados medibles, no solo bonitos.
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-cyan text-bg font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200"
              >
                <MessageCircle size={18} />
                Cotizar proyecto
              </a>
              <a
                href="#portafolio"
                className="inline-flex items-center gap-2.5 border border-border hover:border-primary text-text font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 hover:bg-surface"
              >
                Ver portafolio
                <ArrowDown size={16} />
              </a>
            </motion.div>

            {/* Stats reales, derivados de los datos del sitio */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mt-10 font-mono text-xs text-muted"
            >
              <span>{projects.length} proyectos en producción</span>
              <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
              <span>{techStack.length} tecnologías</span>
              <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
              <span>100% remoto</span>
            </motion.div>
          </div>

          {/* Decorative code/terminal mockup */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <div className="rounded-xl border border-border bg-[#020617] shadow-elevated overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="ml-2 font-mono text-xs text-white/40">deploy.sh</span>
              </div>
              <HeroTerminal reduce={reduce} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
