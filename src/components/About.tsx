import { motion, useReducedMotion } from 'framer-motion';
import { techStack } from '../data/content';

const categoryColor: Record<string, string> = {
  frontend: 'border-primary/40 text-primary',
  backend:  'border-cyan/40 text-cyan',
  language: 'border-violet-400/40 text-violet-400',
  database: 'border-blue-400/40 text-blue-400',
  devops:   'border-muted/40 text-muted',
  ai:       'border-magenta/40 text-magenta',
  automation: 'border-cyan/40 text-cyan',
};

export default function About() {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="sobre-mi" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16"
        >
          <span className="text-magenta text-sm font-semibold tracking-widest uppercase">
            Quién soy
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mt-3">
            Sobre mí
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div {...fadeUp(0.1)} className="space-y-5">
            <p className="text-muted leading-relaxed text-lg">
              Soy <strong className="text-text font-semibold">DavAnalyst</strong>, desarrollador
              web full-stack apasionado por construir productos digitales que combinan diseño
              moderno con tecnología de vanguardia.
            </p>
            <p className="text-muted leading-relaxed">
              Me especializo en transformar ideas en realidad: desde sitios web de alto rendimiento
              hasta bots inteligentes y flujos de trabajo automatizados con inteligencia artificial.
              Cada proyecto es una oportunidad de resolver un problema real de manera eficiente y
              escalable.
            </p>
            <p className="text-muted leading-relaxed">
              Trabajo de forma remota con clientes en toda Latinoamérica, entregando soluciones que
              generan impacto medible desde el primer día.
            </p>

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
            <div className="relative mt-10 p-5 rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md shadow-elevated overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-cyan to-magenta" />
              <p className="text-text/80 text-sm leading-relaxed">
                "Creo en el código limpio, en las soluciones que escalan y en los clientes
                satisfechos. Si tienes una idea, hablemos — puedo convertirla en realidad."
              </p>
              <p className="text-primary/70 text-xs mt-2 font-semibold">— DavAnalyst</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
