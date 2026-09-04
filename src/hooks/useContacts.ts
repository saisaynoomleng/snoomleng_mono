'use client';

import { getAllContacts, getContactById } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllContacts = () => {
  return useQuery({
    queryFn: getAllContacts,
    queryKey: queryKeys.contacts.all,
  });
};

export const useGetContactById = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: async () => await getContactById({ id }),
    queryKey: queryKeys.contacts.byId(id),
  });
};
