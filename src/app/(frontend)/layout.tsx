import { Footer, MainNav } from '@/components/shared';
import React from 'react';

const FrontendLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <MainNav />
      {children}
      <Footer />
    </main>
  );
};

export default FrontendLayout;
