import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_URL } from '../data/content';

export default function CTASection() {
  const reduce = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !glowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.11,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="contacto" className="py-24 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-xl bg-text p-10 sm:p-16 text-center overflow-hidden"
        >
          {/* Profundidad sutil, monocromática */}
          <div
            ref={glowRef}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.07] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <span className="relative font-mono text-sky-400 text-sm font-medium tracking-widest uppercase">
            Hablemos
          </span>
          <h2 className="relative font-display text-4xl sm:text-5xl font-bold text-white leading-tight mt-4 mb-5">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </h2>
          <p className="relative text-white/70 text-lg max-w-xl mx-auto mb-10">
            Cuéntanos tu idea — te respondemos en menos de 24 horas con una propuesta concreta y
            sin compromiso.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 bg-primary hover:bg-cyan text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <MessageCircle size={22} />
            Escribir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
