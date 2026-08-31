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

export const socialLink = defineField({
  name: 'socialLink',
  type: 'object',
  icon: CiLink,
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'git-hub' },
          { title: 'LeetCode', value: 'leet-code' },
          { title: 'LinkedIn', value: 'linked-in' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'url',
      title: 'Link URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
    },
    prepare({ platform }) {
      return {
        title: platform,
        media: CiLink,
      };
    },
  },
});
