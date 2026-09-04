import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const SanityPortableText: PortableTextComponents = {
  types: {
    imageWithAlt: (props) =>
      props.value ? (
        <div className="w-full">
          <Image
            src={urlFor(props.value).format('webp').url()}
            alt={props.value?.alt}
            width={800}
            height={600}
            className="object-cover w-150 mx-auto"
          />
        </div>
      ) : null,
  },
  list: {},
  listItem: {
    bullet: ({ children }) => (
      <li className="marker:text-primary">{children}</li>
    ),
    number: ({ children }) => (
      <li className="marker:text-primary">{children}</li>
    ),
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => (
      <h1 className="font-semibold text-fs-500">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-semibold text-fs-500">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-fs-500">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-semibold text-fs-500">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-semibold text-fs-500">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="font-semibold text-fs-500">{children}</h6>
    ),

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
