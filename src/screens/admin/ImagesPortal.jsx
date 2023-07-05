import React from "react";
import ImagesAction from "./ImagesAction";

function ImagesPortal({ headerContent, imageContent }) {
  return (
    <div
      className={`flex flex-col items-start min-h-screen  w-full bg-white border border-red-600`}
    >
      <div className="flex h-16 xl:h-24 w-full grid-rows-1 items-center justify-center border-red-600 border">
        <div> {headerContent || "+"} </div>
      </div>
      <div className="grid items-start grid-cols-9 xl:grid-cols-7 w-full h-full border border-red-600">
        <div className="flex items-center justify-center h-full border border-red-600 w-full col-span-1">
          +
        </div>
        <div className="flex items-start justify-center h-full border border-red-600 w-full col-span-4 xl:col-span-3">
          {(imageContent && (
            <PropertyImagesCard
              images={imageContent.images}
              description={imageContent.description}
            />
          )) ||
            "+"}
        </div>
        <div className="flex items-start justify-center h-full border border-red-600 w-full col-span-3 xl:col-span-2">
          {<ImagesAction /> || "+"}
        </div>
      </div>
    </div>
  );
}

const PropertyImagesCard = ({ images, description }) => (
  <>
    <div className="sm:hidden xl:block xl:col-span-1"></div>
    <div className="col-span-1 lg:col-span-2 xl:col-span-3">
      <div className="flex items-center justify-center rounded bg-gray-50 h-full dark:bg-gray-800">
        <div
          className={`grid  "grid-rows-3"
           gap-0 w-full h-full items-start`}
        >
          <div className=" row-span-1">{images || "+"}</div>

          <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
            {description || "+"}
          </div>
          <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ImagesPortal;
