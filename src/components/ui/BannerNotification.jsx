import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BannerNotification() {
  const { userInfo: { banner_notification } = {} } = useSelector(
    (state) => state.userAuth
  );
  if (banner_notification) {
    return (
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-amber-600 to-blue-400 opacity-30"></div>
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
        </div>
        <BannerNotification.AdminInvite />
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  return <></>;
}

export default BannerNotification;

BannerNotification.AdminInvite = () => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
    <p className="text-sm leading-6 text-gray-900">
      <strong className="font-semibold">New Admin Invite</strong>
      <svg
        viewBox="0 0 2 2"
        className="mx-2 inline h-0.5 w-0.5 fill-current"
        aria-hidden="true"
      >
        <circle cx="1" cy="1" r="1" />
      </svg>
      You have been sent a new admin invite. Go to link to create admin account.
    </p>
    <Link
      to={"/personal/myprofile?tab=advanced"}
      className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    >
      Admin invite <span aria-hidden="true">&rarr;</span>
    </Link>
  </div>
);
