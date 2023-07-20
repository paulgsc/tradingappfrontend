import React from "react";
import { useSelector } from "react-redux";

function ImageUpdateTable({ toPubish = [], toReplace = [] }) {
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );
  return (
    <div className="flex flex-col justify-start h-full w-full shadow-inner ring-1 ring-gray-400 p-2 bg-gradient-to-br from-white via-blue-50 to-gray-100 ">
      <div className="grid grid-cols-2">
        <div className="flex items-start gap-1">
          <span className="text-sm xl:text-lg font-semibold capitalize  mx-2">
            {`Adding ${toPubish.length} images`}
          </span>
          <div tabIndex={-1} className="relative group">
            <span className="flex items-center justify-center mb-1 p-2 cursor-pointer bg-blue-50 hover:bg-blue-400 hover:text-white italic text-xs font-medium h-4 w-4 rounded-full border border-gray-500 ">
              i
            </span>
            <p className="hidden group-focus-within:block absolute z-50 bg-white mt-2 p-1 w-28 xl:w-36 h-20 xl:h-28 border rounded-sm border-gray-400 shadow-inner text-xs xl:text-sm font-thin">
              some helper text
            </p>
          </div>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-sm xl:text-lg font-semibold capitalize  mx-2">
            {`Replacing ${toReplace.length} images`}
          </span>
          <div tabIndex={-1} className="relative group">
            <span className="flex items-center justify-center mb-1 p-2 cursor-pointer bg-blue-50 hover:bg-blue-400 hover:text-white italic text-xs font-medium h-4 w-4 rounded-full border border-gray-500 ">
              i
            </span>
            <p className="hidden group-focus-within:block absolute z-50 mt-2 p-1 w-28 xl:w-36 h-20 xl:h-28 border rounded-sm border-gray-400 shadow-inner text-xs xl:text-sm font-thin">
              some helper text
            </p>
          </div>
        </div>
      </div>

      <hr className=" border-black" />
      <div className="grid grid-cols-2 items-start h-full ">
        <ul className="border-r border-black shadow-inner h-full">
          {toPubish.map((image, i) => (
            <li
              key={`publish_${i}`}
              className="h-12 w-10/12 flex justify-between items-center gap-20 border-b border-gray-300"
            >
              <span className="ml-4 text-xs xl:text-sm font-normal">
                {image?.imageName}
              </span>
              <img
                src={image?.imageUrl}
                alt="proertyImage"
                className=" h-8 xl:h-10 w-8 xl:w-10 object-cover border rounded-full"
              />
            </li>
          ))}
        </ul>
        <ul className="h-full shadow-inner">
          {toReplace.map((image, i) => {
            const formatUrl = (imageUrl) =>
              import.meta.env.DEV
                ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${imageUrl}`
                : `${VITE_APP_BACKEND_URL}${imageUrl}`;
            return (
              <li
                key={`replace_${i}`}
                className="h-12 w-10/12 flex justify-between items-center gap-20 even:border-t border-gray-300"
              >
                <span className="ml-4 text-xs xl:text-sm font-normal">
                  {image?.image_title}
                </span>
                <img
                  src={formatUrl(image?.image)}
                  alt="proertyImage"
                  className=" h-8 xl:h-10 w-8 xl:w-10 object-cover border rounded-full"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ImageUpdateTable;
