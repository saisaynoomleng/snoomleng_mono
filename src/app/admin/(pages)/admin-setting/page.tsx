import { AdminDashboardBoundary } from '@/components/admin/AdminDashboardBoundary';
import { ChangePasswordForm } from '@/components/admin/AdminSetting/ChangePasswordForm';
import { ChangeUserInfo } from '@/components/admin/AdminSetting/ChangeUserInfo';
import { SignOutButton } from '@/components/admin/AdminSetting/SignOutButton';
import { UpdateEmail } from '@/components/admin/AdminSetting/UpdateEmail';
import { Bounded } from '@/components/shared/Bounded/Bounded';

const AdminSettingPage = () => {
  return (
    <Bounded centered={false} size="full" className="grid grid-cols-2 gap-6">
      <AdminDashboardBoundary>
        <AdminDashboardBoundary>
          <h2 className="font-semibold text-fs-500">Update Info</h2>

          <ChangeUserInfo />
        </AdminDashboardBoundary>

        <AdminDashboardBoundary>
          <h2 className="font-semibold text-fs-500">Update Email</h2>

          <UpdateEmail />
        </AdminDashboardBoundary>
      </AdminDashboardBoundary>

      <AdminDashboardBoundary>
        <h2 className="font-semibold text-fs-500">Change Password</h2>

        <ChangePasswordForm />
      </AdminDashboardBoundary>

      <SignOutButton className="col-span-full place-self-start" />
    </Bounded>
  );
};

export default AdminSettingPage;
