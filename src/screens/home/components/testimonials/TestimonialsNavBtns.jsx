import React from "react";

function TestimonialsNavBtns() {
  return (
    <div>
      <button className="prev-button rounded-full border border-teal-600 p-3 text-teal-600 hover:bg-teal-600 hover:text-white">
        <span className="sr-only">Previous Slide</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5 rtl:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button className="next-button rounded-full border border-teal-600 p-3 text-teal-600 hover:bg-teal-600 hover:text-white">
        <span className="sr-only">Next Slide</span>
        <svg
          className="h-5 w-5 rtl:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  );
}

export default TestimonialsNavBtns;
