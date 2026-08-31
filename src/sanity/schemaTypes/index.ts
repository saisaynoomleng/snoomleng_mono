import { type SchemaTypeDefinition } from 'sanity';
import { blockContent, imageWithAlt, seoType, socialLink } from './shareTypes';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [imageWithAlt, blockContent, seoType, socialLink],
};
