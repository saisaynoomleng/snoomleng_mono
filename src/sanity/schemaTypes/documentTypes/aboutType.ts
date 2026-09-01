import { defineArrayMember, defineField, defineType } from 'sanity';
import { GiStairsGoal } from 'react-icons/gi';
import { formatTitle } from '@/lib/formatter';

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  icon: GiStairsGoal,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'info',
      type: 'object',
      fields: [
        defineField({
          name: 'city',
          type: 'string',
        }),
        defineField({
          name: 'state',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mode',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'expertises',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'blockContent',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'workFlow',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      const formatName = name ? formatTitle(name) : 'Name not provided';
      return {
        title: formatName,
        media: GiStairsGoal,
      };
    },
  },
});
