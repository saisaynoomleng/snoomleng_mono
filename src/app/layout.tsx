import type { Metadata } from 'next';
import './globals.css';
import { josefin_slab, open_sans } from '@/lib/font';
import clsx from 'clsx';
import { SanityLive } from '@/sanity/lib/live';

export const metadata: Metadata = {
  title: {
    template: '%s | snoomleng',
    default: 'snoomleng',
  },
  description: `Portfolio of Sai Say Noom Leng, a software engineer building modern web applications with a focus on frontend development, full-stack architecture, and thoughtful user experiences.`,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full',
        'antialiased',
        josefin_slab.variable,
        open_sans.variable,
      )}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
