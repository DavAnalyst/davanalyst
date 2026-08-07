import { createHash } from 'node:crypto';

export const COURSE_PRICE_COP = 180_000;
const CURRENCY = 'COP';

function getEnv(name: string): string {
  const value = import.meta.env[name];
  if (!value) throw new Error(`Falta configurar la variable de entorno ${name}`);
  return value;
}

interface CheckoutParams {
  reference: string;
  studentEmail: string;
}

/**
 * Construye la URL del Web Checkout de Wompi (redirect, sin SDK cliente).
 * Docs: https://docs.wompi.co/docs/colombia/widget-checkout-web/
 */
export function buildCheckoutUrl({ reference, studentEmail }: CheckoutParams): string {
  const publicKey = getEnv('WOMPI_PUBLIC_KEY');
  const integritySecret = getEnv('WOMPI_INTEGRITY_SECRET');
  const siteUrl = getEnv('PUBLIC_SITE_URL');
  const amountInCents = COURSE_PRICE_COP * 100;

  const signaturePayload = `${reference}${amountInCents}${CURRENCY}${integritySecret}`;
  const signature = createHash('sha256').update(signaturePayload).digest('hex');

  const params = new URLSearchParams({
    'public-key': publicKey,
    currency: CURRENCY,
    'amount-in-cents': String(amountInCents),
    reference,
    'signature:integrity': signature,
    'redirect-url': `${siteUrl}/curso/confirmacion?reference=${encodeURIComponent(reference)}`,
    'customer-data:email': studentEmail,
  });

  return `https://checkout.wompi.co/p/?${params.toString()}`;
}

export interface WompiWebhookEvent {
  event: string;
  data: {
    transaction: {
      id: string;
      status: string;
      reference: string;
      amount_in_cents: number;
    };
  };
  signature: {
    properties: string[];
    checksum: string;
  };
  timestamp: number;
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<any>((acc, key) => (acc == null ? acc : acc[key]), obj);
}

/**
 * Verifica el checksum del evento de Wompi.
 * Docs: https://docs.wompi.co/docs/colombia/eventos/
 */
export function verifyWebhookSignature(payload: WompiWebhookEvent): boolean {
  const eventsSecret = getEnv('WOMPI_EVENTS_SECRET');
  const { properties, checksum } = payload.signature;

  const concatenated = properties
    .map((prop) => getByPath(payload.data, prop))
    .join('');

  const toHash = `${concatenated}${payload.timestamp}${eventsSecret}`;
  const computed = createHash('sha256').update(toHash).digest('hex');

  return computed.toLowerCase() === checksum.toLowerCase();
}
