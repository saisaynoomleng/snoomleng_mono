import {
  Html,
  Body,
  Container,
  Section,
  Link,
  Tailwind,
  Head,
  Preview,
  Text,
} from 'react-email';
import { LogoEmail } from '../LogoEmail';
import { MyLinkEmail } from '../MyLinkEmail';

type VerificationEmailProps = {
  url: string;
  verificationText: string;
};

export const VerificationEmail = ({
  url,
  verificationText,
}: VerificationEmailProps) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#2d93ad',
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <title>snoomleng.com Sign Up Email</title>
        </Head>

        <Body>
          <Preview>Verify Sign Up</Preview>

          <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-160">
            <LogoEmail />

            <Section>
              <Text>{verificationText}</Text>
              <Link href={url}>Click this link to verify</Link>
            </Section>

            <MyLinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
