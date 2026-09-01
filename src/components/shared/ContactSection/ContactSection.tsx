import { Bounded } from '../Bounded';
import { ContactForm } from '../ContactForm';
import { SectionTitle } from '../SectionTitle';
import { ContactDetail } from './ContactDetail';

export const ContactSection = () => {
  return (
    <Bounded
      centered={false}
      size="full"
      padding="none"
      className="grid md:grid-cols-2 gap-x-6 gap-y-4 justify-center"
      spacing="sm"
    >
      <SectionTitle label={`Let's work together`} className="col-span-full" />

      <ContactForm />

      <ContactDetail />
    </Bounded>
  );
};
