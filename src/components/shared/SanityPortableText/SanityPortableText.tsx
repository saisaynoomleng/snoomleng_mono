import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';

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
  listItem: {},
  block: {},
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
  },
};
