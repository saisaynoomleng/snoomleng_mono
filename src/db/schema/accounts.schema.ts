import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';

export const AccountTable = t.pgTable(
  'accounts',
  {
    id: t
      .uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    issuer: t.text('issuer').notNull(),
    accountId: t.text('account_id').notNull(),
    providerId: t.text('provider_id').notNull(),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    accessToken: t.text('access_token'),
    refreshToken: t.text('refresh_token'),
    idToken: t.text('id_token'),
    accessTokenExpiresAt: t.timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: t.timestamp('refresh_token_expires_at'),
    scope: t.text('scope'),
    password: t.text('password'),
    createdAt: t.timestamp('created_at').defaultNow().notNull(),
    updatedAt: t
      .timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    t
      .uniqueIndex('accounts_issuer_accountId_uidx')
      .on(table.issuer, table.accountId),
    t.index('accounts_userId_idx').on(table.userId),
  ],
);
