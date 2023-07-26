import React from "react";

function SkeletonLoading({ size }) {
  return (
    <div
      role="status"
      className=" w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse md:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-60 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>

      {Array(size)
        .fill()
        .map((_, index) => (
          <div
            key={`loading_${index}`}
            className="flex items-center justify-between pt-4"
          >
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-60 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
        ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

SkeletonLoading.Basic = () => (
  <div className="flex animate-pulse">
    <div className="ml-4 mt-2 w-full">
      <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-[40%]"></h3>

      <ul className="mt-5 space-y-3">
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
      </ul>
    </div>
  </div>
);

export default SkeletonLoading;
