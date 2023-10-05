import { Link } from "react-router-dom";

function SuccessCard({ timer }) {
  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center py-20">
      <div className=" mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
            <svg
              className="h-6 w-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Successfull
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Login authentication successful.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <Link
              to={"/"}
              className="px-4 py-2 bg-purple-500 text-white
                        text-base font-medium rounded-md w-full
                        shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              OK
            </Link>
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-thin text-sm">
              <span>{`Logging out in ${timer} seconds`}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessCard;
