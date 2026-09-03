import React from 'react';

export const AdminLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <main>{children}</main>;
};
