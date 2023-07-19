import React from "react";
import PropertyTitle from "./components/property/PropertyTitle";
import { notify } from "./lib/utils";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function Test() {
  // csrf.js
  function getCsrfToken() {
    const csrfCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("csrftoken="));
    if (csrfCookie) {
      return csrfCookie.split("=")[1];
    }
    return null;
  }
  useEffect(() => {
    notify("foo", "bottom-center");
    console.log(getCsrfToken());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-full w-full p-2 bg-gradient-to-br from-white via-blue-50 to-gray-100 overflow-y-auto">
        <div className="grid grid-cols-2">
          <div className="flex items-end gap-1">
            <span className="text-base xl:text-lg font-semibold capitalize  mx-2">
              Adding n images
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
          <div className="flex items-end gap-1">
            <span className="text-base xl:text-lg font-semibold capitalize  mx-2">
              Adding n images
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

        <div className="grid grid-cols-2 ">
          <ul className="border-r border-black shadow-inner">
            <li className="h-12 w-7/12 flex justify-between items-center gap-20 even:border-t border-gray-300">
              <span className="ml-4 text-sm font-normal">image name</span>
              <img
                src=""
                alt="proertyImage"
                className=" h-8 xl:h-10 w-8 xl:w-10 object-cover border rounded-full"
              />
            </li>
          </ul>
          <ul className="border-r border-black shadow-inner">
            <li className="h-12 w-7/12 flex justify-between items-center gap-20 even:border-t border-gray-300">
              <span className="ml-4 text-sm font-normal">image name</span>
              <img
                src=""
                alt="proertyImage"
                className=" h-8 xl:h-10 w-8 xl:w-10 object-cover border rounded-full"
              />
            </li>
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Test;
