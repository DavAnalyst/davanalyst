// Colombia no tiene horario de verano: el offset UTC-5 es fijo todo el año,
// así que el cálculo de fechas se puede hacer con aritmética simple sin
// necesidad de una librería de timezones (Luxon, date-fns-tz, etc.).
const BOGOTA_OFFSET_HOURS = -5;
const MIN_LEAD_HOURS = 24;

export interface Slot {
  weekday: number; // 0 = domingo ... 6 = sábado (convención Date.getDay())
  hour: number; // hora de inicio, 0-23, hora Colombia
}

const WEEKDAY_HOURS = [17, 18, 19, 20, 21]; // Lun-Vie 5pm-10pm
const WEEKEND_HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // Sáb-Dom 8am-10pm

export const ALLOWED_SLOTS: Slot[] = [0, 1, 2, 3, 4, 5, 6].flatMap((weekday) => {
  const isWeekend = weekday === 0 || weekday === 6;
  const hours = isWeekend ? WEEKEND_HOURS : WEEKDAY_HOURS;
  return hours.map((hour) => ({ weekday, hour }));
});

export function isAllowedSlot(weekday: number, hour: number): boolean {
  return ALLOWED_SLOTS.some((s) => s.weekday === weekday && s.hour === hour);
}

/** "Ahora" expresado como si fuera hora de Bogotá (mismos campos de calendario). */
function nowInBogota(): Date {
  const utcMs = Date.now();
  return new Date(utcMs + BOGOTA_OFFSET_HOURS * 60 * 60 * 1000);
}

/** Construye un Date (en "campos de calendario de Bogotá") para un día/hora dado. */
function bogotaDateAt(base: Date, weekday: number, hour: number): Date {
  const d = new Date(base);
  const currentWeekday = d.getUTCDay();
  let diff = weekday - currentWeekday;
  if (diff < 0) diff += 7;
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(hour, 0, 0, 0);
  return d;
}

const WEEKDAY_LABELS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MONTH_LABELS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function formatBogotaLabel(d: Date, hour: number): string {
  const weekdayLabel = WEEKDAY_LABELS[d.getUTCDay()];
  const day = d.getUTCDate();
  const month = MONTH_LABELS[d.getUTCMonth()];
  const hour12 = ((hour + 11) % 12) + 1;
  const ampm = hour < 12 ? 'a.m.' : 'p.m.';
  return `${weekdayLabel} ${day} de ${month}, ${hour12}:00 ${ampm}`;
}

export interface SessionDate {
  /** Fecha en formato YYYY-MM-DD (campos de calendario de Bogotá) */
  date: string;
  label: string;
}

/**
 * Calcula las 3 fechas de sesión (semanal, misma franja) a partir de la
 * primera ocurrencia del weekday/hour elegido que quede al menos
 * MIN_LEAD_HOURS en el futuro respecto a "ahora" en hora Bogotá.
 */
export function computeSessionDates(weekday: number, hour: number): SessionDate[] {
  const now = nowInBogota();
  let first = bogotaDateAt(now, weekday, hour);

  const leadMs = MIN_LEAD_HOURS * 60 * 60 * 1000;
  if (first.getTime() - now.getTime() < leadMs) {
    first = new Date(first.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  return [0, 1, 2].map((i) => {
    const d = new Date(first.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    const iso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    return { date: iso, label: formatBogotaLabel(d, hour) };
  });
}
