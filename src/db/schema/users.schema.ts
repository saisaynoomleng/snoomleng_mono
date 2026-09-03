import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const UserTable = t.pgTable('users', {
  id: t
    .uuid('id')
    .default(sql`pg_catalog.gen_random_uuid()`)
    .primaryKey(),
  name: t.text('name').notNull(),
  email: t.text('email').notNull().unique(),
  emailVerified: t.boolean('email_verified').default(false).notNull(),
  image: t.text('image'),
  createdAt: t.timestamp('created_at').defaultNow().notNull(),
  updatedAt: t
    .timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: t.text('role'),
  banned: t.boolean('banned').default(false),
  banReason: t.text('ban_reason'),
  banExpires: t.timestamp('ban_expires'),
});
