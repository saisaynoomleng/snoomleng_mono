import { defineArrayMember, defineField, defineType } from 'sanity';
import { PiGearLight } from 'react-icons/pi';
import { CiLink } from 'react-icons/ci';

export const siteSettingType = defineType({
  name: 'siteSetting',
  title: 'Site Setting',
  type: 'document',
  icon: PiGearLight,
  groups: [
    { title: 'Branding', name: 'branding' },
    { title: 'Navigation', name: 'navigation' },
    { title: 'Footer', name: 'footer' },
  ],
  fields: [
    // branding
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'primaryLogo',
      title: 'Primary Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      type: 'imageWithAlt',
      group: 'branding',
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          type: 'email',
          title: 'Email',
        }),
        defineField({
          name: 'city',
          type: 'string',
        }),
        defineField({
          name: 'state',
          type: 'string',
        }),
      ],
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'branding',
    }),
    defineField({
      name: 'isAvailableToHire',
      type: 'boolean',
      group: 'branding',
    }),

    // navigation
    defineField({
      name: 'navigation',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'navLink',
          type: 'object',
          icon: CiLink,
          fields: [
            defineField({
              name: 'label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              type: 'string',
            }),
            defineField({
              name: 'isButton',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
      group: 'navigation',
    }),

    // footer
    defineField({
      name: 'columns',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'footerColumn',
          type: 'object',
          icon: CiLink,
          fields: [
            defineField({
              name: 'columnTitle',
              type: 'string',
            }),
            defineField({
              name: 'columnLinks',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'href',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
