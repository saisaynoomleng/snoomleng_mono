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
      },
    });

    return data;
  } catch (error) {
    console.error('Fetch all contact error', error);
    return [];
  }
};
