import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type AdminBadgeProps = {
  className?: string;
  name: string;
  imageUrl: string | null;
};

export const AdminBadge = ({ className, name, imageUrl }: AdminBadgeProps) => {
  const adminName = name ?? 'admin';
  const adminProfile =
    imageUrl ?? `https://placehold.co/100?text=${adminName.slice(0, 1)}`;

  return (
    <Link
      href="/admin/admin-setting"
      className={twMerge(clsx('flex gap-x-1 items-center', className))}
    >
      <div>
        <Image
          src={adminProfile}
          alt="admin photo"
          width={100}
          height={100}
          className="w-10 rounded-full"
          priority
          unoptimized
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <p>{name}</p>
      </div>
    </Link>
  );
};
