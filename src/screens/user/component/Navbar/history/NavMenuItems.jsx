import React from "react";
import { NavLink } from "react-router-dom";

function NavMenuItems({ dropdown }) {
  return (
    <div className="hidden dropdown-menu">
      <div
        className="absolute right-0 top-12 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
        role="menu"
      >
        {dropdown.map((item) => (
          <div
            key={item.id}
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            <NavLink to={item.path}>
              <button className="text-sm text-left leading-5 w-full">
                {item.title}
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavMenuItems;
