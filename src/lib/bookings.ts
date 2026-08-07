import { getDb } from './db';
import { computeSessionDates, type Slot } from './bogota-time';
import type { RowDataPacket } from 'mysql2';

const ACTIVE_WHERE = `
  (status = 'confirmed' OR (status = 'pending' AND created_at > NOW() - INTERVAL 30 MINUTE))
  AND session3_date >= CURDATE()
`;

export async function getActiveSlots(): Promise<Slot[]> {
  const db = await getDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT weekday, start_hour FROM course_bookings WHERE ${ACTIVE_WHERE}`
  );
  return rows.map((r) => ({ weekday: r.weekday, hour: r.start_hour }));
}

export interface NewBookingInput {
  name: string;
  email: string;
  phone: string;
  weekday: number;
  hour: number;
}

export interface NewBookingResult {
  reference: string;
  sessionDates: { date: string; label: string }[];
}

export class SlotTakenError extends Error {
  constructor() {
    super('La franja seleccionada ya no está disponible.');
    this.name = 'SlotTakenError';
  }
}

export async function createPendingBooking(input: NewBookingInput): Promise<NewBookingResult> {
  const db = await getDb();
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT id FROM course_bookings
       WHERE weekday = ? AND start_hour = ? AND ${ACTIVE_WHERE}
       FOR UPDATE`,
      [input.weekday, input.hour]
    );
    if (rows.length > 0) {
      await conn.rollback();
      throw new SlotTakenError();
    }

    const sessionDates = computeSessionDates(input.weekday, input.hour);
    const reference = `curso-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    await conn.query(
      `INSERT INTO course_bookings
        (student_name, student_email, student_phone, weekday, start_hour,
         session1_date, session2_date, session3_date, status, wompi_reference)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [
        input.name,
        input.email,
        input.phone,
        input.weekday,
        input.hour,
        sessionDates[0].date,
        sessionDates[1].date,
        sessionDates[2].date,
        reference,
      ]
    );

    await conn.commit();
    return { reference, sessionDates };
  } catch (err) {
    await conn.rollback().catch(() => {});
    throw err;
  } finally {
    conn.release();
  }
}

export async function confirmBooking(reference: string, transactionId: string): Promise<void> {
  const db = await getDb();
  await db.query(
    `UPDATE course_bookings SET status = 'confirmed', wompi_transaction_id = ?
     WHERE wompi_reference = ?`,
    [transactionId, reference]
  );
}

export async function cancelBooking(reference: string): Promise<void> {
  const db = await getDb();
  await db.query(`UPDATE course_bookings SET status = 'cancelled' WHERE wompi_reference = ?`, [
    reference,
  ]);
}

export interface BookingRecord {
  status: 'pending' | 'confirmed' | 'cancelled';
  studentName: string;
  session1Date: string;
  session2Date: string;
  session3Date: string;
}

export async function getBookingByReference(reference: string): Promise<BookingRecord | null> {
  const db = await getDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT status, student_name, session1_date, session2_date, session3_date
     FROM course_bookings WHERE wompi_reference = ?`,
    [reference]
  );
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    status: r.status,
    studentName: r.student_name,
    session1Date: r.session1_date,
    session2Date: r.session2_date,
    session3Date: r.session3_date,
  };
}
