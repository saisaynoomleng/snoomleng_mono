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
  }
}`);
