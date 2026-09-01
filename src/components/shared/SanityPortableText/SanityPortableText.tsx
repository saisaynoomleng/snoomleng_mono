import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import { SectionTitle } from '../SectionTitle';
import Link from 'next/link';

export const SanityPortableText: PortableTextComponents = {
  types: {
    imageWithAlt: (props) =>
      props.value ? (
        <div className="w-150 aspect-square relative">
          <Image
            src={urlFor(props.value)
              .width(600)
              .height(600)
              .format('webp')
              .url()}
            alt={props.value?.alt}
            fill
            sizes="(max-width: 600px) 100vw, 66vw"
            className="object-cover min-w-full"
          />
        </div>
      ) : null,
  },
  list: {},
  listItem: {
    bullet: ({ children }) => (
      <li className="marker:text-primary">{children}</li>
    ),
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <SectionTitle label={children as string} as="h1" />,
    h2: ({ children }) => <SectionTitle label={children as string} as="h2" />,
    h3: ({ children }) => <SectionTitle label={children as string} as="h3" />,
    h4: ({ children }) => <SectionTitle label={children as string} as="h4" />,
    h5: ({ children }) => <SectionTitle label={children as string} as="h5" />,
    h6: ({ children }) => <SectionTitle label={children as string} as="h6" />,
    blockquote: ({ children }) => (
      <blockquote className="ml-2 border-l-2 border-primary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    highlight: ({ children }) => (
      <span className="bg-primary font-semibold text-white">{children}</span>
    ),

    strong: ({ children }) => <span className="font-semibold">{children}</span>,

    em: ({ children }) => <span className="italic">{children}</span>,

    underline: ({ children }) => (
      <span className="underline underline-offset-4 decoration-wavy decoration-primary">
        {children}
      </span>
    ),

    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;

      return (
        <Link
          href={value.href}
          className="link-url"
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
        >
          {children}
        </Link>
      );
    },
  },
};
