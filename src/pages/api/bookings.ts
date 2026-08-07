import type { APIRoute } from 'astro';
import { isAllowedSlot } from '../../lib/bogota-time';
import { createPendingBooking, SlotTakenError } from '../../lib/bookings';
import { buildCheckoutUrl } from '../../lib/wompi';

export const prerender = false;

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return jsonError('Cuerpo de solicitud inválido.', 400);
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const weekday = Number(body.weekday);
  const hour = Number(body.hour);

  if (!name || name.length > 255) return jsonError('Nombre inválido.', 400);
  if (!EMAIL_RE.test(email)) return jsonError('Email inválido.', 400);
  if (!phone || phone.length > 50) return jsonError('Teléfono inválido.', 400);
  if (!Number.isInteger(weekday) || !Number.isInteger(hour) || !isAllowedSlot(weekday, hour)) {
    return jsonError('La franja horaria seleccionada no es válida.', 400);
  }

  try {
    const { reference, sessionDates } = await createPendingBooking({
      name,
      email,
      phone,
      weekday,
      hour,
    });
    const checkoutUrl = buildCheckoutUrl({ reference, studentEmail: email });
    return new Response(JSON.stringify({ checkoutUrl, sessionDates }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return jsonError(err.message, 409);
    }
    console.error('POST /api/bookings failed:', err);
    return jsonError('No se pudo crear la reserva. Intenta más tarde.', 500);
  }
};
