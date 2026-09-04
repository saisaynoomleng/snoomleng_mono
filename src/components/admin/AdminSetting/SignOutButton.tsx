'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const SignOutButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      className={twMerge(className)}
    >
      Sign Out
    </Button>
  );
};
