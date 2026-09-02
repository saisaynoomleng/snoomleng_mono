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

    DATABASE_URL: z.string().startsWith('postgresql://'),

    AWS_ACCESS_KEY: z
      .string()
      .min(1, 'AWS Access Key must have at least 1 character'),
    AWS_SECRET_ACCESS_KEY: z
      .string()
      .min(1, 'AWS Secret Acesss Key must have at least 1 character'),
    AWS_REGION: z.string().min(1, 'AWS Region must have at least 1 character'),
  },
  runtimeEnv: {
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
    SANITY_WRITE_TOKEN: process.env.SANITY_READ_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  },
  skipValidation: !!process.env.SKIP_VALIDATION,
});
