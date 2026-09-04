'use server';

import db from '@/db';
import { auth } from './auth';
import { headers } from 'next/headers';

export const getAllContacts = async () => {
  try {
    const data = await db.query.ContactTable.findMany({
      columns: {
        name: true,
        id: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    });

    return data;
  } catch (error) {
    console.error('Fetch all contact error', error);
    return [];
  }
};

export const getContactById = async ({ id }: { id: string }) => {
  try {
    const data = await db.query.ContactTable.findFirst({
      with: {
        messages: {
          columns: {
            message: true,
            createdAt: true,
            direction: true,
            id: true,
          },
        },
      },
      columns: {
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error('Get Contact Data with ID error', error);
    throw error;
  }
};

export const getUserIdFromSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const userId = session.user.id;

  return userId;
};

export const getUser = async (id: string) => {
  try {
    const data = await db.query.UserTable.findFirst({
      columns: {
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        role: true,
      },
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error('Ger User Error', error);
    throw error;
  }
};
