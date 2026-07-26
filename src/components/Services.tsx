import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Zap, Bot, Brain } from 'lucide-react';
import { services } from '../data/content';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Zap,
  Bot,
  Brain,
};

function ServiceCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const Icon = iconMap[icon] ?? Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? {} : { y: -4 }}
      className="group relative p-6 rounded-2xl bg-surface border border-border shadow-elevated transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_30px_rgba(99,102,241,0.2),inset_0_0_30px_rgba(99,102,241,0.04)] cursor-default"
    >
      {/* Glow top line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:border-primary/50 group-hover:shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-all duration-300">
        <Icon size={22} className="text-primary" />
      </div>

      <h3 className="font-display font-semibold text-lg text-text mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="servicios" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Qué ofrezco
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mt-3 mb-4">
            Servicios
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Soluciones digitales a medida: desde sitios web de alto rendimiento hasta bots e
            integraciones con IA.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
