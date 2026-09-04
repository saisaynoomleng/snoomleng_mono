'use client';

import { handleUpdateContactFormStatus } from '@/actions/handleUpdateContactFormStatus';
import { handleReplyContactForm } from '@/actions/handleReplyContactForm';
import { getAllContacts, getContactById } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ContactFormStatusInput } from '@/lib/validations';
import { ContactTableStatusInput } from '@/db';

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

export const useUpdateContactFormStatus = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: ContactTableStatusInput) =>
      handleUpdateContactFormStatus({ status, originalId: id }),

    onSuccess: async (result) => {
      if (!result.success) return;

      await queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.all,
      });
    },

    onError: (err) => {
      console.error('update contact form status mutation error', err);
    },
  });
};
