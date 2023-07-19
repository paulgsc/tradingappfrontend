import React from "react";
import TabWidget from "../ui/TabWidget";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

function SideTabs({ className, ...props }) {
  return <div className={cn(`${className} `)} {...props} />;
}

SideTabs.Title = ({ className, ...props }) => {
  return (
    <h1
      className={cn(`${className} text-xl font-semibold text-gray-800`)}
      {...props}
    />
  );
};

SideTabs.ContentContainer = ({ className, ...props }) => {
  return (
    <div className={cn(`${className} mt-4 space-y-4 lg:mt-8`)} {...props} />
  );
};

SideTabs.Links = ({ items, className }) => {
  const location = useLocation();

  return (
    <>
      {items.map((item, i) => (
        <span key={item?.id + i}>
          <Link
            to={item?.path}
            className={cn(
              `${className}  text-gray-500  hover:underline ${
                location.pathname === item?.path
                  ? "border-l-blue-600 hover:border-opacity-50"
                  : "border-transparent hover:border-gray-200 hover:border-opacity-60"
              }    hover:text-blue-400 font-medium active:font-semibold h-12 align-middle items-center flex px-2 border-l-4`
            )}
          >
            {item?.title}
          </Link>
        </span>
      ))}
    </>
  );
};

export default SideTabs;
