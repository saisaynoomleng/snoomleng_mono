import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/lib/env/server';
import { relations } from './relations';
import { Pool } from 'pg';
import { remember } from '@epic-web/remember';

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    min: 2,
    max: 20,
  });

  pool.on('error', (err) => {
    console.error('PG Pool Error', err);
  });

  return pool;
};

let client: Pool;

if (process.env.NODE_ENV === 'production') {
  client = createPool();
} else {
  client = remember('DB Pool', () => createPool());
}

const db = drizzle({ relations, client, logger: true });

export default db;
export * from './schema';
