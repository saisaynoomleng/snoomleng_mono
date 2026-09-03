import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';

export const SessionTable = t.pgTable(
  'sessions',
  {
    id: t
      .uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    expiresAt: t.timestamp('expires_at').notNull(),
    token: t.text('token').notNull().unique(),
    createdAt: t.timestamp('created_at').defaultNow().notNull(),
    updatedAt: t
      .timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: t.text('ip_address'),
    userAgent: t.text('user_agent'),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    impersonatedBy: t.text('impersonated_by'),
  },
  (table) => [t.index('sessions_userId_idx').on(table.userId)],
);
