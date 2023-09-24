import { useDispatch } from "react-redux";
import { adminSelectMetric } from "../../../../../reducers/adminActionsReducers";

function MetricChart({ id }) {
  const dispatch = useDispatch();
  const handleViewMore = () => {
    dispatch(adminSelectMetric(id));
  };

  return (
    <div className="">
      <div className="w-full">
        <span>Tracks count of unique user accounts created.</span>
        <div className="flex justify-end w-full">
          <button
            onClick={handleViewMore}
            type="button"
            className="text-white bg-teal-700 hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MetricChart;
