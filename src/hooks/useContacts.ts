'use client';

import { handleReplyContactForm } from '@/actions/handleReplyContactForm';
import { getAllContacts, getContactById } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useReplyContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleReplyContactForm,

    onSuccess: async (result) => {
      if (!result.success) return;

      await queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.all,
      });
    },

    onError: (error) => {
      console.error('Tanstack Reply Contact Form Error', error);
    },
  });
};
