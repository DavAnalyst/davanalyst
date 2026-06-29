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
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
            left: '5%',
            top: '10%',
            animation: reduce ? 'none' : 'blob-1 14s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            right: '5%',
            top: '5%',
            animation: reduce ? 'none' : 'blob-2 18s ease-in-out infinite',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #D946EF 0%, transparent 70%)',
            right: '20%',
            bottom: '15%',
            animation: reduce ? 'none' : 'blob-3 12s ease-in-out infinite',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            left: '30%',
            bottom: '5%',
            animation: reduce ? 'none' : 'blob-4 16s ease-in-out infinite',
            filter: 'blur(75px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center mt-[20vh]">
        {/* Headline */}
        <motion.h1
          {...fadeUp(0)}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text leading-[1.08] mb-6"
        >
          Tu web. Tu bot. Tu IA.{' '}
          <span className="bg-gradient-to-r from-primary via-cyan to-magenta bg-clip-text text-transparent">
            Todo bajo un mismo techo.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Soy <strong className="text-text font-semibold">DavAnalyst</strong> — desarrollador
          full-stack especializado en automatizaciones e inteligencia artificial para llevar tu
          negocio al siguiente nivel digital.
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
            className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-cyan text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95"
          >
            <MessageCircle size={18} />
            Cotizar proyecto
          </a>
          <a
            href="#portafolio"
            className="inline-flex items-center gap-2.5 border border-border hover:border-primary/60 text-text font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:bg-surface/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          >
            Ver portafolio
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex flex-col items-center gap-2 text-muted/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted/30" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
