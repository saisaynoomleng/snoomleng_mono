import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const VerificationTable = t.pgTable(
  'verification',
  {
    id: t
      .uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    identifier: t.text('identifier').notNull(),
    value: t.text('value').notNull(),
    expiresAt: t.timestamp('expires_at').notNull(),
    createdAt: t.timestamp('created_at').defaultNow().notNull(),
    updatedAt: t
      .timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [t.index('verification_identifier_idx').on(table.identifier)],
);
