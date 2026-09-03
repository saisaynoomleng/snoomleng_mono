'use client';

import { Bounded } from '@/components/shared/Bounded';
import { useGetAllContacts } from '@/hooks/useContacts';
import React from 'react';

const ContactDetailPage = (): React.JSX.Element => {
  const { data: contacts, isPending, isError } = useGetAllContacts();

  return <Bounded>ContactDetailPage</Bounded>;
};

export default ContactDetailPage;
