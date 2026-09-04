import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_READ_TOKEN: z
      .string()
      .min(1, 'Sanity Read Token must have at least 1 character'),
    SANITY_WRITE_TOKEN: z
      .string()
      .min(1, 'Sanity Write Token must have at least 1 character'),
    SANITY_STUDIO_DATASET: z
      .enum(['production', 'development'])
      .default('production'),
    SANITY_STUDIO_PROJECT_ID: z
      .string()
      .min(1, 'Sanity Studio Project ID must have at least 1 character'),

    DATABASE_URL: z.string().startsWith('postgresql://'),

    AWS_ACCESS_KEY: z
      .string()
      .min(1, 'AWS Access Key must have at least 1 character'),
    AWS_SECRET_ACCESS_KEY: z
      .string()
      .min(1, 'AWS Secret Acesss Key must have at least 1 character'),
    AWS_REGION: z.string().min(1, 'AWS Region must have at least 1 character'),

    BETTER_AUTH_SECRET: z
      .string()
      .min(1, 'Better Auth secret must have at least 1 character'),
    BETTER_AUTH_URL: z.url('Must be a valid URL'),
  },
  runtimeEnv: {
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
    SANITY_WRITE_TOKEN: process.env.SANITY_READ_TOKEN,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,

    DATABASE_URL: process.env.DATABASE_URL,

    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  },

  skipValidation: !!process.env.SKIP_VALIDATION,
});
