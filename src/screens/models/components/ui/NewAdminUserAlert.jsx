import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function NewAdminUserAlert() {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const handleShowDialog = () => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.set("sendInvite", "user@email.com");
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };

  return (
    <div>
      <div
        id="alert-additional-content-2"
        className=" p-4 mb-4 text-red-300/90 border border-red-300 rounded-lg bg-red-900"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Danger</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          More info about this info danger goes here. This example text is going
          to run a bit longer so that you can see how spacing within an alert
          works with this kind of content.
        </div>
      </div>
      <button
        type="button"
        onClick={handleShowDialog}
        className="w-full xl:max-w-4xl px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white bg-red-600/80 rounded-lg hover:bg-red-800/90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-3 h-3 text-white mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
        </svg>
        Send New Admin Invite
      </button>
    </div>
  );
}

export default NewAdminUserAlert;
