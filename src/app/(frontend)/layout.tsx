import { Footer, MainNav } from '@/components/shared';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SanityLive } from '@/sanity/lib/live';
import React from 'react';
import { Toaster } from 'sonner';

const FrontendLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <TooltipProvider>
      <main>
        <MainNav />
        {children}
        <Footer />

        <SanityLive />
      </main>

      <Toaster
        richColors
        duration={3000}
        closeButton
        position="bottom-center"
      />
    </TooltipProvider>
  );
};

export default FrontendLayout;
