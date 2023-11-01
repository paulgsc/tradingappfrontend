import { useSelector } from "react-redux";

import AdminInviteLink from "./AdminInviteLink";

function Roles() {
  const {
    userInfo: { banner_notification: { pending_new_admin_acct } = {} } = {},
  } = useSelector((state) => state.userAuth);
  return (
    <article className="w-full px-16 pb-4 space-y-4">
      <div className="w-full inline-flex justify-center">
        <p className="w-4/5">
          View, manage and update your user roles and permssions.
        </p>
      </div>
      <ul className="w-full flex flex-col gap-3 items-center ">
        <li className="w-4/5 flex items-center justify-between px-6 border-b pb-2 border-slate-300">
          <h3 className="text-end font-semibold leading-6">User Roles</h3>
        </li>
        {pending_new_admin_acct && (
          <AdminInviteLink adminInviteLink={pending_new_admin_acct} />
        )}
      </ul>
    </article>
  );
}

export default Roles;
