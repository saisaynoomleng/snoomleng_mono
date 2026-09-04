import { AdminDashboardBoundary } from '@/components/admin/AdminDashboardBoundary';
import { ChangePasswordForm } from '@/components/admin/AdminSetting/ChangePasswordForm';
import { ChangeUserInfo } from '@/components/admin/AdminSetting/ChangeUserInfo';
import { SignOutButton } from '@/components/admin/AdminSetting/SignOutButton';
import { UpdateEmail } from '@/components/admin/AdminSetting/UpdateEmail';
import { Bounded } from '@/components/shared/Bounded/Bounded';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getUser, getUserIdFromSession } from '@/lib/dal';
import { formatDate, formatTitle } from '@/lib/formatter';
import { notFound } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const AdminSettingPage = async () => {
  const userId = await getUserIdFromSession();

  if (!userId) return notFound();

  const userInfo = await getUser(userId);

  if (!userInfo) return notFound();

  const { name, email, emailVerified, createdAt, role } = userInfo;

  return (
    <Bounded centered={false} size="full" className="grid grid-cols-2 gap-6">
      <AdminDashboardBoundary className="col-span-full">
        <div className="flex flex-col gap-y-4 ">
          <h2 className="font-semibold text-fs-500">Account Info</h2>

          <Table className="max-w-xl table-fixed">
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{formatTitle(name)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Verified</TableCell>
                <TableCell>
                  {emailVerified ? (
                    <span className="text-primary">
                      <FaCheck />
                    </span>
                  ) : (
                    <span className="text-brand-error-500">
                      <RxCross2 />
                    </span>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Member Since</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Role</TableCell>
                {role && <TableCell>{formatTitle(role)}</TableCell>}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <SignOutButton className="self-start" />
      </AdminDashboardBoundary>

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
    </Bounded>
  );
};

export default AdminSettingPage;
