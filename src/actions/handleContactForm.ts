'use server';

import { ActionResponse } from '@/lib/types';
import { ContactFormInputSchema } from '@/lib/validations';

export const handleContactForm = async (
  data: ContactFormInputSchema,
): Promise<ActionResponse<ContactFormInputSchema>> => {
  try {
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
