import * as z from 'zod';

/**
 * Validate Contact Form
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  email: z.email('Must be a valid email address').min(1, 'Email is required'),
  subject: z.string().min(1, 'Subject must have at least 1 character'),
  message: z
    .string()
    .min(20, 'Message must have at least 20 characters')
    .max(3000, 'Message cannot exceeds 3000 characters'),
});
/**
 * Validate Contact Form Input Schema
 */
export type ContactFormInputSchema = z.input<typeof ContactFormSchema>;
/**
 * Validate Contact Form Output Schema
 */
export type ContactFormOutputSchema = z.output<typeof ContactFormSchema>;
