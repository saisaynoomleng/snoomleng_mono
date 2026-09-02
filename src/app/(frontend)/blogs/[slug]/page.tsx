import { Bounded, SanityPortableText, SectionTitle } from '@/components/shared';
import { BlogCard } from '@/components/shared/BlogCard/BlogCard';
import { formatDate } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_BLOGS_QUERY, BLOG_QUERY } from '@/sanity/lib/query';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from 'react-email';
import { PortableTextInput } from 'sanity';

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

const getBlog = async ({ params }: ParamsProps) => {
  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
    stega: false,
    perspective: 'published',
  });

  return blog;
};

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const blog = await getBlog({ params });

  if (!blog) return notFound();

  const { seo, name } = blog;

  return {
    title: seo?.metaTitle ?? name,
    description: seo?.metaDescription,
    openGraph: seo?.ogImage ? { images: [seo.ogImage] } : undefined,
  };
}

export async function generateStaticParams() {
  const { data: blogs } = await sanityFetch({
    query: ALL_BLOGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return blogs.slice(0, 200).map((b) => ({ slug: b.slug }));
}

const BlogDetailPage = async ({ params }: ParamsProps) => {
  const blog = await getBlog({ params });

  if (!blog) return notFound();

  const {
    name,
    publishedAt,
    body,
    imageUrl,
    imageAlt,
    focus,
    category,
    categorySlug,
    relatedBlogs,
  } = blog;

  return (
    <Bounded spacing="sm">
      {imageAlt && imageUrl && (
        <div className="overflow-hidden relative aspect-square max-w-150 mx-auto">
          <Image
            src={urlFor(imageUrl).format('webp').url()}
            alt={imageAlt}
            fill
            sizes="(max-width: 600px) 100vw, 66vw"
            className="min-w-full object-cover"
            priority
          />
        </div>
      )}

      <h2 className="font-semibold text-fs-500 text-center">{name}</h2>

      <div className="flex justify-between items-center font-bold text-muted-foreground text-fs-300">
        {publishedAt && <p>{formatDate(publishedAt)}</p>}
        <p>{focus}</p>
      </div>

      <p>
        <span>Category: </span>
        <span className="font-semibold">{category}</span>
      </p>

      <div className="prose prose-sm md:prose-lg min-w-full">
        {body && <PortableText value={body} components={SanityPortableText} />}
      </div>

      <div className="space-y-6 md:space-y-8">
        <SectionTitle as="h3" label="Related Blogs" />

        <div className="overflow-x-auto overflow-y-hidden flex gap-x-4 py-4">
          {blog.relatedBlogs.map((b) => (
            <BlogCard key={b._id} blog={b} className="w-100 h-auto" />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default BlogDetailPage;
