import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type AdminDashboardBoundaryProps = {
  children: React.ReactNode;
  className?: string;
};

export const AdminDashboardBoundary = ({
  children,
  className,
}: AdminDashboardBoundaryProps) => {
  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-y-4 border border-border/20 p-4', className),
      )}
    >
      {children}
    </div>
  );
};
