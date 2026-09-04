'use client';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

export const MarkInProgressContactForm = () => {
  return (
    <form>
      <Field>
        <Button className="bg-brand-success-400 hover:bg-brand-success-600 hover:text-brand-success-50">
          Mark As In Progress
        </Button>
      </Field>
    </form>
  );
};
