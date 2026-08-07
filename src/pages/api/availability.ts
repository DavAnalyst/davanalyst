import type { APIRoute } from 'astro';
import { ALLOWED_SLOTS } from '../../lib/bogota-time';
import { getActiveSlots } from '../../lib/bookings';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const active = await getActiveSlots();
    const slots = ALLOWED_SLOTS.map((slot) => ({
      weekday: slot.weekday,
      hour: slot.hour,
      available: !active.some((a) => a.weekday === slot.weekday && a.hour === slot.hour),
    }));
    return new Response(JSON.stringify({ slots }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/availability failed:', err);
    return new Response(
      JSON.stringify({ error: 'No se pudo cargar el calendario. Intenta más tarde.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
