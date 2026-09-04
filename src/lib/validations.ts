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

/**
 * Validate Sign In Form Schema
 */
export const SignInFormSchema = z.object({
  email: z.email('Must be a valid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters'),
  rememberMe: z.boolean().default(false),
});
/**
 * Validate Sign In Form Input Schema
 */
export type SignInFormInputSchema = z.input<typeof SignInFormSchema>;
/**
 * Validate Sign In Form Output Schema
 */
export type SignInFormOutputSchema = z.output<typeof SignInFormSchema>;

/**
 * Validate Sign Up Form Schema
 */
export const SignUpFormSchema = z.object({
  name: z.string().min(1, 'Full Name must have at least 1 character'),
  email: z.email('Must be a valid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters'),
});
/**
 * Validate Sign Up Form Input Schema
 */
export type SignUpFormInputSchema = z.input<typeof SignUpFormSchema>;
/**
 * Validate Sign Up Form Output Schema
 */
export type SignUpFormOutputSchema = z.output<typeof SignUpFormSchema>;

/**
 * Validate Contact Reply Form Schema
 */
export const ContactReplyFormSchema = z.object({
  originalContactId: z.uuid(),
  email: z.email('Must be a valid email address').min(1, 'Email is required'),
  message: z
    .string()
    .min(1, 'Message must have at least 1 character')
    .max(3000, 'Message cannot exceeds 3000 character'),
});
/**
 * Validate Contact Reply Input Form Schema
 */
export type ContactReplyInput = z.input<typeof ContactReplyFormSchema>;
/**
 * Validate Contact Reply Output Form Schema
 */
export type ContactReplyOutput = z.output<typeof ContactReplyFormSchema>;

/**
 * Validate Cntact Form Status Schema
 */
export const ContactFormStatusSchema = z.object({
  status: z
    .enum(['new', 'in_progress', 'replied', 'resolved', 'spam'])
    .default('new'),
  originalId: z.uuid(),
});
/**
 * Validate Contact Form Status Input
 */
export type ContactFormStatusInput = z.infer<typeof ContactFormStatusSchema>;

/**
 * Validate Admin Change Password Form Schema
 */
export const AdminChangePasswordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'Current Password must have at least 8 characters')
    .max(128, 'Current Password cannot exceeds 128 characters'),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters'),
  revokeSessions: z.boolean().default(false),
});
/**
 * Validate Admin Change Password Form Input
 */
export type AdminChangePasswordInput = z.input<
  typeof AdminChangePasswordFormSchema
>;
/**
 * Vailate Admin Change Passowrd Form Output
 */
export type AdminChangePasswordOutput = z.output<
  typeof AdminChangePasswordFormSchema
>;

/**
 * Validate Change User Info Form Schema
 */
export const ChangeUserInfoFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
});
/**
 * Validate Change User Info Form input
 */
export type ChangeUserInfoFormInput = z.input<typeof ChangeUserInfoFormSchema>;
