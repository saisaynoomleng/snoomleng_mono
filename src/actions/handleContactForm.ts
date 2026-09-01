'use server';

import db, { ContactTable } from '@/db';
import { ActionResponse } from '@/lib/types';
import { ContactFormInputSchema, ContactFormSchema } from '@/lib/validations';

export const handleContactForm = async (
  data: ContactFormInputSchema,
): Promise<ActionResponse<ContactFormInputSchema>> => {
  try {
    const result = ContactFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];
      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof ContactFormInputSchema,
      };
    }

    const { name, email, message, subject } = result.data;

    await db.insert(ContactTable).values({
      name,
      email,
      message,
      subject,
      status: 'new',
    });

    return {
      success: true,
      message: 'Thank you for contacting me!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
