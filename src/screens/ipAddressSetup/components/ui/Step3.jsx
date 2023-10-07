import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";
import { broadcastLogout } from "../../../../contexts/redux/actions/userActions";

function Step3({ loading, successMessage, error }) {
  const [queryParameters] = useSearchParams();
  const dispatch = useDispatch();

  return (
    <div>
      {loading ? (
        <SkeletonLoading size={3} />
      ) : successMessage ? (
        <div className="flex flex-col items-center gap-2 p-6 bg-[#FFFFEB] rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-2xl font-medium">{successMessage}</span>
          <button
            onClick={() => {
              dispatch(broadcastLogout());
              window.location.href = `/login?redirect${
                queryParameters.get("redirect") || "/admin"
              }`;
            }}
            className="p-3 bg-[#4F46E5] rounded-lg w-full text-white"
          >
            Login again to access Admin page
          </button>
        </div>
      ) : (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Error! Something went Wrong.</span>{" "}
          {error}
        </div>
      )}
    </div>
  );
}

export default Step3;
