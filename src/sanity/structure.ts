import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('snoomleng')
    .items([S.divider().title('Operations'), S.divider().title('Blogs')]);
