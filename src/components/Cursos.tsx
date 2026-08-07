import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { courseSyllabus, COURSE_PRICE_USD, COURSE_PRICE_COP } from '../data/content';
import CourseBooking from './CourseBooking';

export default function Cursos() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section ref={sectionRef} id="cursos" className="relative overflow-hidden py-24 px-5 sm:px-8">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm font-medium tracking-widest uppercase">
            Aprende a hacerlo tú mismo
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mt-3">Curso: Sitios web con IA</h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            3 sesiones en vivo de 1 hora, por videollamada, en el horario que tú elijas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Temario */}
          <motion.ol
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-5"
          >
            {courseSyllabus.map((item, i) => (
              <li key={item.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-text">{item.title}</h3>
                  <p className="text-sm text-muted mt-1">{item.description}</p>
                </div>
              </li>
            ))}
          </motion.ol>

          {/* Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 rounded-xl border border-primary/30 bg-surface p-7 sm:p-8 sticky top-24"
          >
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Cupo individual</span>
            <div className="mt-3 mb-1">
              <span className="font-display text-4xl font-bold text-text">${COURSE_PRICE_USD} USD</span>
            </div>
            <p className="text-sm text-muted mb-6">
              ({COURSE_PRICE_COP.toLocaleString('es-CO')} COP) &middot; 3 sesiones de 1 hora
            </p>

            <ul className="space-y-3 mb-8">
              {['Clases 1 a 1, no grupales', 'Tú eliges el horario', 'Acceso a las herramientas que verás en clase'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    {item}
                  </li>
                )
              )}
            </ul>

            <button
              onClick={() => setBookingOpen(true)}
              className="w-full inline-flex items-center justify-center bg-primary hover:bg-cyan text-bg font-semibold px-5 py-3 rounded-lg transition-colors duration-200"
            >
              Agendar mi cupo
            </button>
          </motion.div>
        </div>
      </div>

      <CourseBooking isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
