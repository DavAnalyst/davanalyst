import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let migrated = false;

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: import.meta.env.DB_HOST,
      port: import.meta.env.DB_PORT ? Number(import.meta.env.DB_PORT) : 3306,
      user: import.meta.env.DB_USER,
      password: import.meta.env.DB_PASSWORD,
      database: import.meta.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      timezone: 'Z',
    });
  }
  return pool;
}

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS course_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone VARCHAR(50) NOT NULL,
    weekday TINYINT NOT NULL,
    start_hour TINYINT NOT NULL,
    session1_date DATE NOT NULL,
    session2_date DATE NOT NULL,
    session3_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
    wompi_reference VARCHAR(100) NOT NULL UNIQUE,
    wompi_transaction_id VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slot (weekday, start_hour, status, session3_date)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

/** Crea la tabla si no existe. Se ejecuta una sola vez por proceso. */
export async function ensureSchema(): Promise<void> {
  if (migrated) return;
  const db = getPool();
  await db.query(CREATE_TABLE_SQL);
  migrated = true;
}

export async function getDb(): Promise<mysql.Pool> {
  await ensureSchema();
  return getPool();
}
