import { Footer, MainNav } from '@/components/shared';
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';

const FrontendLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <TooltipProvider>
      <main>
        <MainNav />
        {children}
        <Footer />
      </main>
    </TooltipProvider>
  );
};

export default FrontendLayout;
