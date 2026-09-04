'use server';

import db from '@/db';

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
