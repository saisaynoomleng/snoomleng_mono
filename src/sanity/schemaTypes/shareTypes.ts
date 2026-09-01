import { formatTitle } from '@/lib/formatter';
import { CiLink } from 'react-icons/ci';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      validation: (rule) => rule.required(),
    }),
  ],
  options: {
    hotspot: true,
  },
});

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Highlight', value: 'highlight' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'imageWithAlt',
    }),
  ],
});

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export const socialLink = defineType({
  name: 'socialLink',
  type: 'object',
  validation: (rule) => rule.required(),
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: 'LinkedIn', value: 'linked-in' },
          { title: 'GitHub', value: 'git-hub' },
          { title: 'LeetCode', value: 'leet-code' },
        ],
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
    defineField({
      name: 'icon',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'platform',
    },
    prepare({ name }) {
      return {
        title: name ? formatTitle(name) : 'Platform not provided',
        media: CiLink,
      };
    },
  },
});
