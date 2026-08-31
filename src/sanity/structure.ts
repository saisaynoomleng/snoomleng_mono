import type { StructureResolver } from 'sanity/structure';

import { PiGearLight } from 'react-icons/pi';
import { GiFiles, GiNewspaper, GiStairsGoal, GiSuitcase } from 'react-icons/gi';
import { FaLaptopCode, FaLinux } from 'react-icons/fa';
import { MdCategory, MdOutlineViewQuilt } from 'react-icons/md';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('snoomleng')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSetting').title('Settings').icon(PiGearLight),
      S.documentTypeListItem('about').title('About Me').icon(GiStairsGoal),
      S.documentTypeListItem('technology').title('Technologies').icon(FaLinux),
      S.documentTypeListItem('project').title('Projects').icon(GiFiles),
      S.documentTypeListItem('employment')
        .title('Employment Histories')
        .icon(GiSuitcase),

      S.divider().title('Blogs'),
      S.documentTypeListItem('blogFocus').title('Focus').icon(FaLaptopCode),
      S.documentTypeListItem('blogCategory')
        .title('Blog Categories')
        .icon(MdCategory),
      S.documentTypeListItem('blog').title('Blogs').icon(GiNewspaper),

      S.divider().title('Pages'),
      S.documentTypeListItem('hero')
        .icon(MdOutlineViewQuilt)
        .title('Hero Banners'),
    ]);
