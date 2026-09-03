import { AdminSidebar } from '@/components/admin/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main>
          <SidebarTrigger className="border-0" />
          {children}
        </main>
      </SidebarProvider>
      ;
    </>
  );
}
