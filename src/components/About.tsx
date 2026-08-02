import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techStack, projects } from '../data/content';
import ConstellationBackground from './three/ConstellationBackground';

gsap.registerPlugin(ScrollTrigger);

const categoryColor: Record<string, string> = {
  frontend: 'border-primary/30 text-primary',
  backend:  'border-cyan/30 text-cyan',
  language: 'border-violet-400/30 text-violet-400',
  database: 'border-blue-400/30 text-blue-400',
  devops:   'border-muted/30 text-muted',
  ai:       'border-magenta/30 text-magenta',
  automation: 'border-cyan/30 text-cyan',
};

const statValues = [projects.length, techStack.length, 100];
const statSuffixes = ['', '', '%'];

export default function About() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  useEffect(() => {
    if (reduce || !statsRef.current) return;
    const ctx = gsap.context(() => {
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const proxy = { n: 0 };
        gsap.set(el, { textContent: `0${statSuffixes[i]}` });
        gsap.to(proxy, {
          n: statValues[i],
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(proxy.n)}${statSuffixes[i]}`;
          },
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} id="sobre-mi" className="relative overflow-hidden py-24 px-5 sm:px-8">
      <ConstellationBackground sectionRef={sectionRef} />
      {/* Scrim: suaviza la constelación detrás del bio para que se lea con claridad */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background:
            'radial-gradient(ellipse 100% 55% at 50% 22%, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 45%, rgba(15,23,42,0) 78%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.7) 35%, rgba(15,23,42,0) 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16"
        >
          <span className="font-mono text-magenta text-sm font-medium tracking-widest uppercase">
            Quiénes somos
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mt-3">
            Sobre nosotros
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div {...fadeUp(0.1)} className="space-y-5">
            <p className="text-muted leading-relaxed text-lg">
              Somos <strong className="text-text font-semibold">DavAnalyst</strong>, un estudio de
              desarrollo full-stack: sitios web de alto rendimiento, bots inteligentes y
              automatizaciones con IA, con ingeniería sólida detrás de cada línea de código.
            </p>
            <p className="text-muted leading-relaxed">
              Trabajamos de forma remota con clientes en toda Latinoamérica, entregando soluciones
              que generan impacto medible desde el primer día.
            </p>

            {/* Stats reales, con contador animado al hacer scroll */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p
                  ref={(el) => {
                    statRefs.current[0] = el;
                  }}
                  className="font-display text-3xl font-bold text-primary"
                >
                  {projects.length}
                </p>
                <p className="font-mono text-xs text-muted mt-1">Proyectos</p>
              </div>
              <div>
                <p
                  ref={(el) => {
                    statRefs.current[1] = el;
                  }}
                  className="font-display text-3xl font-bold text-primary"
                >
                  {techStack.length}
                </p>
                <p className="font-mono text-xs text-muted mt-1">Tecnologías</p>
              </div>
              <div>
                <p
                  ref={(el) => {
                    statRefs.current[2] = el;
                  }}
                  className="font-display text-3xl font-bold text-primary"
                >
                  100%
                </p>
                <p className="font-mono text-xs text-muted mt-1">Remoto</p>
              </div>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div {...fadeUp(0.2)}>
            <h3 className="font-display font-semibold text-text mb-6 text-lg">
              Stack tecnológico
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.04, duration: 0.35 }}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium border bg-surface ${
                    categoryColor[tech.category] ?? 'border-border text-muted'
                  }`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>

            {/* Visual decoration */}
            <div className="relative mt-10 p-5 rounded-xl border border-border bg-surface shadow-elevated overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
              <p className="text-text/80 text-sm leading-relaxed">
                "Creemos en el código limpio, en las soluciones que escalan y en los clientes
                satisfechos. Si tienes una idea, hablemos — podemos convertirla en realidad."
              </p>
              <p className="font-mono text-primary/80 text-xs mt-2 font-medium">— Equipo DavAnalyst</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
