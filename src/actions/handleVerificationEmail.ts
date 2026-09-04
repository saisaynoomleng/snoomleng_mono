'use server';

import { VerificationEmail } from '@/components/email/VerificationEmail/VerificationEmail';
import { env } from '@/lib/env/server';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { User } from 'better-auth/types';
import { render } from 'react-email';

type handleSignUpVerificationProps = {
  user: User;
  url: string;
  verificationText: string;
};

export const handleVerificationEmail = async ({
  user,
  url,
  verificationText,
}: handleSignUpVerificationProps) => {
  const html = await render(VerificationEmail({ url, verificationText }));

  const client = new SESClient({
    region: env.AWS_REGION,
  });

  try {
    void client.send(
      new SendEmailCommand({
        Source: 'noreply@snoomleng.com',

        Destination: {
          ToAddresses: [user.email],
        },

        Message: {
          Subject: {
            Data: 'Verify Your Email',
          },

          Body: {
            Html: {
              Data: html,
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error('SES error', error);
    throw error;
  }
};
