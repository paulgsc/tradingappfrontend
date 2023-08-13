import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CrossSign, HorizontalLine } from "../../../../constants/svgs/Svg";

function FaqSkeleton({ ...props }) {
  return (
    <div className="min-h-screen flex flex-1 mx-auto">
      <section className="bg-white w-full my-16">
        <div className="container mx-auto my-auto px-2 py-6" {...props} />
      </section>
    </div>
  );
}

FaqSkeleton.Body = ({ ...props }) => (
  <div className="flex space-x-6 " {...props} />
);

FaqSkeleton.Header = ({ ...props }) => (
  <title className="flex flex-1  justify-center">
    <h1
      className=" text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white"
      {...props}
    />
  </title>
);

FaqSkeleton.SideMenu = ({ items }) => (
  <div className=" w-32">
    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
      {items?.title}
    </h1>

    <div className="mt-4 space-y-4 lg:mt-8">
      {items?.content.map((item) => (
        <span key={item?.id}>
          <Link
            to={item?.path}
            className="block text-gray-500 active:text-blue-500  dark:text-blue-400 hover:underline"
          >
            {item?.title}
          </Link>
        </span>
      ))}
    </div>
  </div>
);

export default FaqSkeleton;
