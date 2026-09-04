import * as t from 'drizzle-orm/pg-core';
import { ContactTable } from './contact.schema';
import { timestamps } from './schema-helper';
import { InferSelectModel } from 'drizzle-orm';

export const ContactMessageTable = t.pgTable(
  'contact_messages',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),

    contactId: t
      .uuid('contact_id')
      .references(() => ContactTable.id, { onDelete: 'cascade' })
      .notNull(),

    message: t.text('message').notNull(),

    direction: t.text('direction').$type<'inbound' | 'outbound'>().notNull(),

    ...timestamps,
  },

  (table) => [
    t.index('contact_message_contact_id_idx').on(table.contactId, table.id),
  ],
);

export type SelectContactMessageTable = InferSelectModel<
  typeof ContactMessageTable
>;
