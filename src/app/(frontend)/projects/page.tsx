import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_PROJECTS_QUERY } from '@/sanity/lib/query';
import { sanityFetch } from '@/sanity/lib/live';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { SectionTitle } from '@/components/shared/SectionTitle/SectionTitle';
import { ProjectCard } from '@/components/shared/ProjectCard/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore projects by Sai Say Noom Leng, including full-stack applications, modern web experiences, and software solutions built with thoughtful architecture and user-focused design.',
};

const ProjectsPage = async (): Promise<React.JSX.Element> => {
  const { data: projects } = await sanityFetch({
    query: ALL_PROJECTS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!projects) return notFound();

  return (
    <Bounded>
      <div className="flex flex-col h-100 justify-center items-center text-center gap-y-4 md:gap-y-6">
        <h2 className="text-fs-500 font-semibold text-primary">
          Building Ideas Into Digital Experiences
        </h2>
        <p className="font-semibold text-muted-foreground">
          A collection of projects where I explore product development, modern
          web technologies, and thoughtful engineering. Each project represents
          a journey of solving problems, designing solutions, and building
          reliable experiences from concept to completion.
        </p>
      </div>

      <div className="grid md:grid-cols-4 md:gap-x-4 gap-y-4">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project._id}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default ProjectsPage;
