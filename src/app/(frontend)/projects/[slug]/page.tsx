import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { formatDate, formatTitle, replaceDashWithSpace } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_PROJECTS_QUERY, PROJECT_QUERY } from '@/sanity/lib/query';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { ProjectLink } from './ProjectLink';
import { PortableText } from 'next-sanity';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { SectionTitle } from '@/components/shared/SectionTitle/SectionTitle';
import { SanityPortableText } from '@/components/shared/SanityPortableText/SanityPortableText';

type SlugParamsProps = {
  params: Promise<{ slug: string }>;
};

const getProject = async ({ params }: SlugParamsProps) => {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: SlugParamsProps): Promise<Metadata> {
  const data = await getProject({ params });

  if (!data) return notFound();

  const { seo, name } = data;

  return {
    title: seo?.metaTitle || name,
    description: seo?.metaDescription,
    openGraph: seo?.imageUrl ? { images: [seo.imageUrl] } : undefined,
  };
}

export async function generateStaticParams() {
  const { data: projects } = await sanityFetch({
    query: ALL_PROJECTS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return projects.map((p) => ({
    slug: p.slug,
  }));
}

const ProjectDetailPage = async ({ params }: SlugParamsProps) => {
  const project = await getProject({ params });

  if (!project) return notFound();

  const { body, startedAt, endedAt, links, name, stacks, type } = project;

  return (
    <Bounded spacing="lg">
      <div>
        <Link href="/projects" className="my-3 group flex gap-x-2 items-center">
          <FaArrowLeft className="group-hover:-translate-x-2 duration-200 transition-transform ease-in-out" />
          <span className="group-hover:underline underline-offset-4 decoration-wavy decoration-primary">
            Back to All Projects
          </span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-y-4 md:gap-y-8 md:gap-x-12">
        <div className="flex flex-col gap-y-4">
          <p className="font-semibold text-fs-500 pl-2 border-l-2 border-primary text-muted-foreground">
            Metadata
          </p>
          {links && (
            <Table className="border-2">
              <TableBody>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell className="font-semibold">{name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Started Date</TableCell>
                  {startedAt && (
                    <TableCell className="font-semibold">
                      {formatDate(startedAt)}
                    </TableCell>
                  )}
                </TableRow>

                <TableRow>
                  <TableCell>Ended Date</TableCell>
                  {endedAt ? (
                    <TableCell className="font-semibold">
                      {formatDate(endedAt)}
                    </TableCell>
                  ) : (
                    <TableCell>Still baking</TableCell>
                  )}
                </TableRow>

                <TableRow>
                  <TableCell>Project Type</TableCell>
                  {type && (
                    <TableCell className="font-semibold">
                      {replaceDashWithSpace(formatTitle(type))}
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          )}

          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Live Previews: </p>
            {links &&
              links.map((l) => (
                <ProjectLink
                  key={l._key}
                  label={l.label || ''}
                  href={l.url || ''}
                />
              ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <p className="font-semibold text-fs-500 pl-2 border-l-2 border-primary text-muted-foreground">
            Tech Stack
          </p>
          <div className="flex gap-2 flex-wrap">
            {stacks &&
              stacks.map((stack) => (
                <p key={stack} className="px-2 py-1 border text-fs-300">
                  {stack}
                </p>
              ))}
          </div>
        </div>
      </div>

      <SectionTitle label="Project Detail" />

      <div className="prose prose-sm min-w-full">
        {body && <PortableText value={body} components={SanityPortableText} />}
      </div>
    </Bounded>
  );
};

export default ProjectDetailPage;
