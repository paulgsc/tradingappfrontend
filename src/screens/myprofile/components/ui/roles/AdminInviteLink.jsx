import { Link } from "react-router-dom";

function AdminInviteLink({ adminInviteLink }) {
  return (
    <li className="w-4/5 flex items-center justify-between px-6 border-b pb-2 border-slate-200">
      <span
        role="text"
        tabIndex={-1}
        className="relative group inline-flex items-center gap-4 font-normal text-blue-600"
      >
        <p className="leading-10"> Create Admin</p>
        <svg
          className=" scale-90 flex-shrink-0 inline w-4 h4 text-blue-600/80 brightness-75 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="hidden absolute -top-1/4 right-0 translate-x-full w-96 max-w-xs rounded-md shadow-sm group-focus-within:block border border-neutral-200 p-4 space-y-4 bg-zinc-50 brightness-95">
          <p className="w-full font-normal">
            This is link to update account to have admin priviliges. To request
            new link reach out to the website administrator.
          </p>
          <div className="grid grid-cols-2 w-full text-xs font-thin text-amber-600">
            <span role="text" className="text-center">
              expires
            </span>
            <span role="text" className="text-center">
              some date
            </span>
            <span className="text-center">for</span>
            <span className="text-center">some role</span>
            <span className="text-center">link sent by</span>
            <span className="text-center">some sender</span>
            <span className="text-center">intended for</span>
            <span className="text-center">some recipient</span>
          </div>
        </div>
      </span>
      {adminInviteLink ? (
        <Link
          to={adminInviteLink}
          className="-translate-x-full flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Admin invite <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : (
        <button
          disabled
          aria-disabled
          className="-translate-x-full flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 disabled:bg-gray-600 disabled:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:blur-sm disabled:pointer-events-none"
        >
          Admin invite <span aria-hidden="true">&rarr;</span>
        </button>
      )}
    </li>
  );
}

export default AdminInviteLink;
