import { defineField, defineType } from 'sanity';
import { GrCertificate } from 'react-icons/gr';
import { formatTitle } from '@/lib/formatter';

export const certificateBadgeType = defineType({
  name: 'certificateBadge',
  type: 'document',
  icon: GrCertificate,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-badge`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const formatName = name ? formatTitle(name) : 'Badge name not provided';

      return {
        title: formatName,
        media: image,
      };
    },
  },
});
