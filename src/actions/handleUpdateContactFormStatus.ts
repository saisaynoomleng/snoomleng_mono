'use server';

import db, { ContactTable } from '@/db';
import { ActionResponse } from '@/lib/types';
import {
  ContactFormStatusInput,
  ContactFormStatusSchema,
} from '@/lib/validations';
import { eq } from 'drizzle-orm';

export const handleUpdateContactFormStatus = async (
  data: ContactFormStatusInput,
): Promise<ActionResponse<ContactFormStatusInput>> => {
  try {
    const result = ContactFormStatusSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof ContactFormStatusInput,
      };
    }

    const { status, originalId } = result.data;

    await db
      .update(ContactTable)
      .set({
        status,
      })
      .where(eq(ContactTable.id, originalId));

    return {
      success: true,
      message: `Sucessful marked as ${status}`,
    };
  } catch (error) {
    console.error('Mark In Progress Error', error);

    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
