import { useSelector } from "react-redux";

import AdminInviteLink from "./AdminInviteLink";

function Roles() {
  const { adminInviteLink } = useSelector((state) => state.userAuth);
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
        {adminInviteLink && (
          <AdminInviteLink adminInviteLink={adminInviteLink} />
        )}
      </ul>
    </article>
  );
}

export default Roles;
