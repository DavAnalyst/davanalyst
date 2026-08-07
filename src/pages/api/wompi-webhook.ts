import type { APIRoute } from 'astro';
import { verifyWebhookSignature, type WompiWebhookEvent } from '../../lib/wompi';
import { confirmBooking, cancelBooking } from '../../lib/bookings';

export const prerender = false;

const DECLINED_STATUSES = new Set(['DECLINED', 'VOIDED', 'ERROR']);

export const POST: APIRoute = async ({ request }) => {
  let payload: WompiWebhookEvent;
  try {
    payload = await request.json();
  } catch {
    return new Response('Invalid payload', { status: 400 });
  }

  if (!payload?.signature?.checksum) {
    return new Response('Missing signature', { status: 400 });
  }

  let valid = false;
  try {
    valid = verifyWebhookSignature(payload);
  } catch (err) {
    console.error('Wompi webhook signature check failed:', err);
    return new Response('Server misconfigured', { status: 500 });
  }

  if (!valid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const tx = payload.data?.transaction;
  if (!tx?.reference) {
    return new Response('OK', { status: 200 });
  }

  try {
    if (tx.status === 'APPROVED') {
      await confirmBooking(tx.reference, tx.id);
    } else if (DECLINED_STATUSES.has(tx.status)) {
      await cancelBooking(tx.reference);
    }
  } catch (err) {
    console.error('Wompi webhook processing failed:', err);
    return new Response('Processing error', { status: 500 });
  }

  return new Response('OK', { status: 200 });
};
