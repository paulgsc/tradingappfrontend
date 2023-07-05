import React from "react";
import LiveNotifications from "./components/alerts/LiveNotifications";
import Dropdown from "./components/ui/Dropdown";

function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Dropdown
        getClassname={() => {}}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8  bg-tranparent"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        }
        menu={
          <ul className="py-1">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Pending Orders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Recurring
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Completed
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Canceled
              </a>
            </li>
          </ul>
        }
      />
    </div>
  );
}

export default Test;
