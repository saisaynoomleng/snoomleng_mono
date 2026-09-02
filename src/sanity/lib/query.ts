import { defineQuery } from 'next-sanity';

export const MAIN_NAV_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "navigations": navigation[]{
    _key,
    label,
    isButton,
    href
  },
  "imageUrl": primaryLogo.asset->url,
  "imageAlt": primaryLogo.alt
 }`);

export const FOOTER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "footerColumns": columns[]{
    _key,
    columnTitle,
    columnLinks[],
  },
  "imageUrl": primaryLogo.asset->url,
  "imageAlt": primaryLogo.alt,
  footerText,
  socialLinks[]{
    _key,
    platform,
    url,
    icon
  },
  contactInfo
 }`);

export const HOME_PAGE_QUERY = defineQuery(`{
  "hero": *[_type == 'hero'
    && slug.current == "home-page"][0]{
      _id,
      title,
      body,
      actions[]{
        _key,
        label,
        href
      },
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      position[],
    },
  "about": *[_type == 'about'
  && defined(slug.current)][0]{
    body,
    "workflows": workFlow[]{
      _key,
      title,
      body
    },
    mode[],
    info{
      city,
      state
    }
  },
  "tech": *[_type == 'technology'
  && defined(slug.current)]{
    _id,
    icon,
    name
  },
  "employment": *[_type == 'employment'
  && defined(slug.current)]
  | order(startedAt desc){
    _id,
    name,
    startedAt,
    endedAt,
    body,
    companyName
  },
  "projects": *[_type == 'project'
    && defined(slug.current)]{
      _id,
      name,
      startedAt,
      endedAt,
      type,
      excerpt,
      stacks[],
      "slug": slug.current,
      links[]{
        _key,
        label,
        url
      }
    },
    "badges": *[_type == 'certificateBadge'
    && defined(slug.current)]{
      _id,
      name,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt
    },
}`);

export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == 'about'
 && slug.current == $slug][0]{
  body,
  expertises[]{
    _key,
    body,
    title
  },
  info{
    city,
    state,
  },
  mode[],
  "workflows": workFlow[]{
    _key,
    title,
    body
  },
  intro,
  "badges": *[_type == 'certificateBadge'
    && defined(slug.current)]{
      _id,
      name,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt
    },
  "tech": *[_type == 'technology'
    && defined(slug.current)]{
      _id,
      icon,
      name
    },
 }`);

export const CERTIFICATE_BADGE_QUERY =
  defineQuery(`*[_type == 'certificateBadge'
 && defined(slug.current)]{
  _id,
  name,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt
 }`);

export const ALL_PROJECTS_QUERY = defineQuery(`*[_type == 'project'
  && defined(slug.current)]
  | order(createdAt desc){
    _id,
    name,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    type
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == 'project'
  && slug.current == $slug][0]{
    body,
    startedAt,
    endedAt,
    links[]{
      _key,
      label,
      url
    },
    name,
    seo{
      metaTitle,
      metaDescription,
      "imageUrl": ogImage.asset->url,
      "imageAlt": ogImage.alt
    },
    stacks[],
    type,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
    }
`);

export const ALL_BLOGS_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)]{
    _id,
    name,
    "slug": slug.current,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    'imageAlt': mainImage.alt,
    excerpt,
    "focus": focus->name,
    "category": category->name
  }`);
