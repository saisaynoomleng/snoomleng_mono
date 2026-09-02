import { Bounded, SectionTitle } from '@/components/shared';
import { BlogCard } from '@/components/shared/BlogCard/BlogCard';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_BLOGS_QUERY } from '@/sanity/lib/query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Explore articles on web development, JavaScript, TypeScript, React, Next.js, backend architecture, and modern software engineering.',
};

const BlogsPage = async () => {
  const { data: blogs } = await sanityFetch({
    query: ALL_BLOGS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!blogs) notFound();

  return (
    <Bounded spacing="lg">
      <SectionTitle label="What i found interesting" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blogs.map((b) => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
    </Bounded>
  );
};

export default BlogsPage;
