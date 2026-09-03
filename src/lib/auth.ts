import db, {
  AccountTable,
  SessionTable,
  UserTable,
  VerificationTable,
} from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from './env/server';
import { admin } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { handleSignUpVerification } from '../actions/handleSignUpVerification';

export const auth = betterAuth({
  appName: 'snoomleng',

  plugins: [admin(), nextCookies()],

  baseURL: {
    allowedHosts: ['snoomleng.com', 'www.snoomleng.com'],
    protocol: 'https',
    fallback: env.BETTER_AUTH_URL,
  },

  basePath: '/api/auth',

  trustedOrigins: ['http://localhost:3000', env.BETTER_AUTH_URL],

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: UserTable,
      sessions: SessionTable,
      accounts: AccountTable,
      verifications: VerificationTable,
    },
  }),

  secret: env.BETTER_AUTH_SECRET,

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void handleSignUpVerification({ user, url });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true,
  },

  user: {
    modelName: 'users',
    fields: {
      email: 'email',
      name: 'name',
    },
  },

  session: {
    modelName: 'sessions',
    fields: {
      userId: 'userId',
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github', 'email-password'],
    },
  },

  advanced: {
    database: {
      generateId: 'uuid',
    },
  },

  logger: {
    disabled: false,
    disableColors: false,
    level: 'warn',
  },
});
