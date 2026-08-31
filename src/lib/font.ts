import localFont from 'next/font/local';

export const josefin_slab = localFont({
  src: [
    {
      path: './fonts/josefin_slab/JosefinSlab-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/josefin_slab/JosefinSlab-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/josefin_slab/JosefinSlab-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/josefin_slab/JosefinSlab-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/josefin_slab/JosefinSlab-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/josefin_slab/JosefinSlab-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/josefin_slab/JosefinSlab-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
});

export const open_sans = localFont({
  src: [
    {
      path: './fonts/open_sans/OpenSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/open_sans/OpenSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/open_sans/OpenSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/open_sans/OpenSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/open_sans/OpenSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/open_sans/OpenSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-body',
});
