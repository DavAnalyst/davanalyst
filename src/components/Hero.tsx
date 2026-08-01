import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { WHATSAPP_URL } from '../data/content';

export default function Hero() {
  const reduce = useReducedMotion();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-circuit-grid"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center mt-[14vh] sm:mt-[18vh] lg:mt-[20vh]">
        {/* Eyebrow */}
        <motion.span
          {...fadeUp(0)}
          className="inline-block font-mono text-primary text-sm font-medium tracking-widest uppercase mb-5"
        >
          Desarrollo Web · IA · Automatización
        </motion.span>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.05)}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-[1.08] mb-6"
        >
          Software a medida para hacer crecer tu negocio.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Somos <strong className="text-text font-semibold">DavAnalyst</strong> — desarrollamos
          sitios web, bots y automatizaciones con inteligencia artificial para empresas que
          necesitan resultados medibles, no solo bonitos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-cyan text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200"
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 sm:mt-16 lg:mt-20 flex flex-col items-center gap-2 text-muted/60"
        >
          <div className="w-px h-12 bg-border" />
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
