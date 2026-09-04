import {
  Html,
  Body,
  Section,
  Container,
  Tailwind,
  Head,
  Preview,
  Text,
} from 'react-email';
import { LogoEmail } from '../LogoEmail';
import { MyLinkEmail } from '../MyLinkEmail';

type ContactReplyEmailProps = {
  message: string;
};

export const ContactReplyEmail = ({ message }: ContactReplyEmailProps) => {
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
          <title>snoomleng Reply Contact Email</title>
        </Head>

        <Body>
          <Preview>Reply Contact Email</Preview>

          <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-160">
            <LogoEmail />

            <Section>
              <Text>{message}</Text>
            </Section>

            <MyLinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
