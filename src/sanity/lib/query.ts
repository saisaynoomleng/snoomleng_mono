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
