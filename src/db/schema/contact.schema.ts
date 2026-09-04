import * as t from 'drizzle-orm/pg-core';
import { ContactStatus, timestamps } from './schema-helper';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  subject: t.text('subject').notNull(),
  message: t.text('message').notNull(),
  status: ContactStatus('status').notNull().default('new'),
  ...timestamps,
});

export type ContactTableStatusInput = NonNullable<
  InferInsertModel<typeof ContactTable>['status']
>;

export type SelectContactTable = InferSelectModel<typeof ContactTable>;
export type InsertContactTable = InferInsertModel<typeof ContactTable>;
