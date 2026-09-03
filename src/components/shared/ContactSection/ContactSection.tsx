import { AnimateSlideIn } from '@/components/animations';
import { Bounded } from '../Bounded/Bounded';
import { ContactForm } from '../ContactForm/ContactForm';
import { SectionTitle } from '../SectionTitle/SectionTitle';
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
      <AnimateSlideIn direction="top" className="col-span-full">
        <SectionTitle label={`Let's work together`} />
      </AnimateSlideIn>

      <AnimateSlideIn direction="left" className="h-full">
        <ContactForm className="h-full" />
      </AnimateSlideIn>

      <AnimateSlideIn direction="right">
        <ContactDetail className="h-full" />
      </AnimateSlideIn>
    </Bounded>
  );
};
