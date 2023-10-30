import { useSelector } from "react-redux";

function SubmissionError() {
  const { showSummaryPortal = false, error } = useSelector(
    (state) => state.trade
  );

  if (error && showSummaryPortal) {
    return (
      <div className="flex flex-1 w-full">
        <div className="flex items-center justify-center rounded bg-gray-50 w-full h-min ">
          <div className="w-full rounded-full m-0 px-1 py-0 bg-gradient-to-r from-pink-200 via-red-400 to-pink-200 border-t border-b border-orange-500 text-red-100 flex items-center justify-center">
            <div className="inline-flex items-center space-x-2 p-2">
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3 text-red-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
            </div>
            <div className="flex justify-center items-center">
              <p className="font-semibold text-xs md:text-sm lg:text-base ">
                Submission Failed!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

export default SubmissionError;
