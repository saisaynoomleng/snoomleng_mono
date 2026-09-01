import { type SchemaTypeDefinition } from 'sanity';
import { blockContent, imageWithAlt, seoType, socialLink } from './shareTypes';
import { siteSettingType } from './documentTypes/siteSettingType';
import { aboutType } from './documentTypes/aboutType';
import { technologyType } from './documentTypes/technologyType';
import { heroType } from './documentTypes/heroType';
import { emplopymentType } from './documentTypes/employmentType';
import { projectType } from './documentTypes/projectType';
import { blogFocusType } from './documentTypes/blogFocusType';
import { blogCategoryType } from './documentTypes/blogCategoryType';
import { blogType } from './documentTypes/blogType';
import { certificateBadgeType } from './documentTypes/certificateBadgeType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    imageWithAlt,
    blockContent,
    seoType,
    socialLink,

    siteSettingType,
    heroType,
    aboutType,
    technologyType,
    projectType,
    emplopymentType,
    certificateBadgeType,

    blogFocusType,
    blogCategoryType,
    blogType,
  ],
};
