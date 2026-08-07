import { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';

const WEEKDAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function formatHour(hour: number): string {
  const hour12 = ((hour + 11) % 12) + 1;
  const ampm = hour < 12 ? 'am' : 'pm';
  return `${hour12}:00 ${ampm}`;
}

interface AvailabilitySlot {
  weekday: number;
  hour: number;
  available: boolean;
}

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

export default function CourseBooking({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selected, setSelected] = useState<{ weekday: number; hour: number } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoadState('loading');
    setSubmitError(null);
    fetch('/api/availability')
      .then((res) => {
        if (!res.ok) throw new Error('bad status');
        return res.json();
      })
      .then((data) => {
        setSlots(data.slots ?? []);
        setLoadState('ready');
      })
      .catch(() => setLoadState('error'));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const byDay: AvailabilitySlot[][] = Array.from({ length: 7 }, (_, weekday) =>
    slots.filter((s) => s.weekday === weekday).sort((a, b) => a.hour - b.hour)
  );

  const canSubmit = name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && phone.trim() && selected;

  const handleSubmit = async () => {
    if (!canSubmit || !selected) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, weekday: selected.weekday, hour: selected.hour }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? 'No se pudo procesar la reserva.');
        if (res.status === 409) {
          setSelected(null);
          setLoadState('loading');
          fetch('/api/availability')
            .then((r) => r.json())
            .then((d) => {
              setSlots(d.slots ?? []);
              setLoadState('ready');
            })
            .catch(() => setLoadState('error'));
        }
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setSubmitError('No se pudo conectar con el servidor. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-surface p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Agendar curso"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-text">Agenda tu curso</h3>
            <p className="text-sm text-muted mt-1">
              Elige un horario semanal. Tus 3 sesiones quedan reservadas en esa misma franja.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="min-h-11 min-w-11 flex items-center justify-center text-muted hover:text-text transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Datos del estudiante */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-bg/40 border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-bg/40 border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary"
          />
          <input
            type="tel"
            placeholder="Teléfono / WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-bg/40 border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>

        {/* Calendario semanal */}
        {loadState === 'loading' && (
          <div className="flex items-center justify-center gap-2 text-muted py-10">
            <Loader2 size={18} className="animate-spin" />
            Cargando horarios disponibles...
          </div>
        )}
        {loadState === 'error' && (
          <p className="text-center text-sm text-red-400 py-10">
            No se pudo cargar el calendario. Intenta más tarde o escríbenos por WhatsApp.
          </p>
        )}
        {loadState === 'ready' && (
          <div className="grid grid-cols-7 gap-2 mb-6">
            {byDay.map((daySlots, weekday) => (
              <div key={weekday} className="flex flex-col gap-1.5">
                <span className="text-center text-xs font-mono text-muted mb-1">
                  {WEEKDAY_LABELS[weekday]}
                </span>
                {daySlots.map((slot) => {
                  const isSelected = selected?.weekday === weekday && selected?.hour === slot.hour;
                  return (
                    <button
                      key={slot.hour}
                      disabled={!slot.available}
                      onClick={() => setSelected({ weekday, hour: slot.hour })}
                      className={`text-[11px] leading-tight rounded-md px-1 py-1.5 border transition-colors duration-150 ${
                        !slot.available
                          ? 'opacity-30 cursor-not-allowed border-border text-muted'
                          : isSelected
                            ? 'bg-primary text-bg border-primary font-semibold'
                            : 'border-border text-text hover:border-primary'
                      }`}
                    >
                      {formatHour(slot.hour)}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {submitError && <p className="text-sm text-red-400 mb-4">{submitError}</p>}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-cyan disabled:opacity-40 disabled:cursor-not-allowed text-bg font-semibold px-5 py-3 rounded-lg transition-colors duration-200"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          Continuar al pago
        </button>
      </div>
    </div>
  );
}
