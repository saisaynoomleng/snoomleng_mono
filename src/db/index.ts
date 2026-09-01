import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '@/lib/env/server';
import { relations } from 'drizzle-orm/_relations';

const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql, logger: true });

export default db;
export * from './schema';
