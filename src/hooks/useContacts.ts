'use client';

import { getAllContacts } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllContacts = () => {
  return useQuery({
    queryFn: getAllContacts,
    queryKey: queryKeys.contacts.all,
  });
};

// export const useGetContact = () => {
//   return useQuery({
//     queryFn: undefined,
//     queryKey: null,
//   });
// };
