'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { env } from '@/lib/env/client';
import { authClient } from '@/lib/auth-client';
import { AdminBadge } from './AdminBadge';
import Link from 'next/link';

import { MdOutlinePhoneCallback } from 'react-icons/md';
import { PiGearLight } from 'react-icons/pi';

const ADMIN_LINKS = [
  {
    name: 'Contacts',
    href: '/admin/contacts',
    icon: <MdOutlinePhoneCallback />,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: <PiGearLight />,
  },
];

export const AdminSidebar = (): React.JSX.Element => {
  const logoURL = env.NEXT_PUBLIC_LOGO_URL;

  const { data: session } = authClient.useSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin" className="overflow-hidden apsect-square">
          <Image
            src={urlFor(logoURL).width(400).height(400).format('webp').url()}
            alt=""
            priority
            width={400}
            height={400}
            className="w-25 max-w-25 object-cover mx-auto"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {ADMIN_LINKS.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild>
                <Link href={link.href} className="flex gap-x-1 items-center">
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <AdminBadge
          name={session?.user.name as string}
          imageUrl={session?.user.image as string}
        />
      </SidebarFooter>
    </Sidebar>
  );
};
