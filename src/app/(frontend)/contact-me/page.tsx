import { Bounded, ContactSection } from '@/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me',
  description:
    'Have a project, opportunity, or question? Get in touch with Snoomleng to discuss web development, collaboration, or freelance work.',
};

const ContactMePage = () => {
  return (
    <Bounded>
      <ContactSection />
    </Bounded>
  );
};

export default ContactMePage;
