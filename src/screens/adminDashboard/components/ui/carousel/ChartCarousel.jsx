import { find } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserMetrics } from "../../../hooks/react_query";
import UserActivity from "../../charts/UserActivity";

function ChartCarousel() {
  const { metric } = useSelector((state) => state.adminActions);
  const [selectedSlide, setSelectedSlide] = useState(0); // Initialize with the default selected slide index
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { data } = fetchUserMetrics(token);

  const filteredData = Array.isArray(data)
    ? typeof metric === "string"
      ? find(data, (item) => item?.title === metric)
      : data[0]
    : {};

  useEffect(() => {
    setSelectedSlide(() => 0);
  }, [metric]);

  if (Array.isArray(filteredData?.content)) {
    return (
      <div className="relative bg-pink-900 min-w-full px-16 py-6">
        <div className="z-30 absolute top-2 left-1/2 flex flex-1 justify-center items-center space-x-3">
          {filteredData?.content.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`w-3 h-3 rounded-full bg-gray-600 aria-selected:bg-white`}
              aria-selected={i === selectedSlide ? "true" : "false"} // Conditionally set aria-selected
              aria-label={`Slide ${i + 1}`}
              data-carousel-slide-to={i}
              onClick={() => setSelectedSlide(i)} // Update selectedSlide state on button click
            ></button>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={() =>
            setSelectedSlide((prevSelectedSlide) =>
              Math.max(0, prevSelectedSlide - 1)
            )
          }
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={() =>
            setSelectedSlide(
              (prevSelectedSlide) =>
                (prevSelectedSlide + 1) % filteredData?.content.length
            )
          }
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
        <div
          className="flex items-center transform transition-transform duration-700"
          style={{ transform: `translateX(${-100 * selectedSlide}%)` }}
        >
          {filteredData?.content.map((metric, i) => (
            <div
              className={`min-w-full`}
              key={i}
              aria-current={i === selectedSlide}
            >
              <UserActivity title={metric?.title} data={metric?.data} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <></>;
}

export default ChartCarousel;
