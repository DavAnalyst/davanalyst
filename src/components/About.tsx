import { motion, useReducedMotion } from 'framer-motion';
import { techStack } from '../data/content';

const categoryColor: Record<string, string> = {
  frontend: 'border-primary/30 text-primary',
  backend:  'border-cyan/30 text-cyan',
  language: 'border-violet-600/30 text-violet-700',
  database: 'border-blue-600/30 text-blue-700',
  devops:   'border-muted/30 text-muted',
  ai:       'border-magenta/30 text-magenta',
  automation: 'border-cyan/30 text-cyan',
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
              desarrollo full-stack especializado en construir productos digitales que combinan
              ingeniería sólida con tecnología de vanguardia.
            </p>
            <p className="text-muted leading-relaxed">
              Nos especializamos en transformar ideas en realidad: desde sitios web de alto
              rendimiento hasta bots inteligentes y flujos de trabajo automatizados con
              inteligencia artificial. Cada proyecto es una oportunidad de resolver un problema
              real de manera eficiente y escalable.
            </p>
            <p className="text-muted leading-relaxed">
              Trabajamos de forma remota con clientes en toda Latinoamérica, entregando soluciones
              que generan impacto medible desde el primer día.
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
