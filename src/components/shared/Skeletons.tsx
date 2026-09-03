import React from 'react';
import { Bounded } from './Bounded/Bounded';
import { Skeleton } from '../ui/skeleton';

export const HomePageSkeleton = (): React.JSX.Element => {
  return (
    <Bounded spacing="sm">
      <div className="grid md:grid-cols-2 gap-6 w-full h-100">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-3" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>
    </Bounded>
  );
};

export const AboutPageSkeleton = (): React.JSX.Element => {
  return (
    <Bounded spacing="sm">
      <div className="grid md:grid-cols-2 gap-6 w-full h-100">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-[30%] h-3" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>
    </Bounded>
  );
};

export const ProjectPageSkeleton = () => {
  return (
    <Bounded className="spacing-sm">
      <div className="flex flex-col justify-center items-center h-100 w-full gap-y-6">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-[80%] h-5" />
        <Skeleton className="w-[80%] h-5" />
        <Skeleton className="w-[30%] h-5" />
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />

        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>
    </Bounded>
  );
};

export const BlogPageSkeleton = () => {
  return (
    <Bounded className="spacing-sm">
      <div className="flex flex-col h-30 w-full gap-y-6">
        <Skeleton className="w-[30%] h-5" />
        <Skeleton className="w-[80%] h-5" />
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />

        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />

        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />

        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
      </div>
    </Bounded>
  );
};

export const ContactPageSkeleton = () => {
  return (
    <Bounded spacing="sm">
      <Skeleton className="w-full h-10" />

      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="w-full h-100" />
        <Skeleton className="w-full h-100" />
      </div>
    </Bounded>
  );
};

export const DetailPageSkeleton = () => {
  return (
    <Bounded spacing="sm">
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>

      <div className="grid md:grid-cols-3">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>
    </Bounded>
  );
};

export const AdminContactPageSkeleton = () => {
  return (
    <Bounded spacing="sm" size="full" centered={false}>
      <div className="grid grid-cols-2 gap-x-2 ">
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>

      <Skeleton className="w-full h-20" />

      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
    </Bounded>
  );
};

export const AdminContactDataSkeleton = () => {
  return (
    <Bounded spacing="sm" size="full" centered={false}>
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </Bounded>
  );
};
