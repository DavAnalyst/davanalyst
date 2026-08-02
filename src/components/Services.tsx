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
  featured = false,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
  featured?: boolean;
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
      className={`group relative rounded-xl border border-border shadow-elevated transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)] cursor-default overflow-hidden ${
        featured
          ? 'sm:col-span-3 p-10 bg-surface sm:flex sm:items-center sm:gap-8'
          : 'p-7 bg-surface'
      }`}
    >
      {/* Index */}
      <span className="absolute top-5 right-6 font-mono text-xs text-border">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className={`rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-200 flex-shrink-0 ${
          featured ? 'w-16 h-16 mb-5 sm:mb-0' : 'w-12 h-12 mb-5'
        }`}
      >
        <Icon size={featured ? 28 : 22} className="text-primary" />
      </div>

      <div>
        <h3 className={`font-display font-semibold text-text mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
          {title}
        </h3>
        <p className={`text-muted leading-relaxed ${featured ? 'text-base max-w-md' : 'text-sm'}`}>
          {description}
        </p>
      </div>
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
          <span className="font-mono text-primary text-sm font-medium tracking-widest uppercase">
            Qué ofrecemos
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mt-3 mb-4">
            Servicios
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Soluciones digitales a medida: desde sitios web de alto rendimiento hasta bots e
            integraciones con IA.
          </p>
        </motion.div>

        {/* Bento grid: primer servicio destacado, ocupa el ancho completo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
