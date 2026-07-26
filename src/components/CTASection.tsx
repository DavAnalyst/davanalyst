import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_URL } from '../data/content';

export default function CTASection() {
  const reduce = useReducedMotion();

  return (
    <section id="contacto" className="py-24 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-cyan -z-0" />

          {/* Mesh overlay */}
          <div
            className="absolute inset-0 opacity-20 -z-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Glow blobs inside the banner */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, #D946EF 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: reduce ? 'none' : 'blob-3 10s ease-in-out infinite',
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-white/80 mx-auto mb-5" />
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              ¿Listo para llevar tu proyecto al siguiente nivel?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Cuéntame tu idea — te respondo en menos de 24 horas con una propuesta concreta y sin
              compromiso.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-primary font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
            >
              <MessageCircle size={22} />
              Escribir por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
