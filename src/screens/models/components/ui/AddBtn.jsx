import { Link, useParams } from "react-router-dom";

function AddBtn() {
  const { model } = useParams();
  return (
    <div className="relative group">
      <button className="p-2 rounded-lg border border-gray-300 inline-flex items-center space-x-2 scale-90 hover:scale-100 focus:scale-100 hover:bg-gray-100 transition-all duration-300 ease-in-out">
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
        <svg
          className="w-2 h-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          />
        </svg>
      </button>
      <div className="hidden group-focus-within:block absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              to={`/models/${model}/uploads/gsheets/new`}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Schedule new upload
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddBtn;
