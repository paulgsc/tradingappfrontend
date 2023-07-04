import React, { useState } from "react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

function Dropdown({ icon, menu, getClassname = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-selector")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={cn(
        `${getClassname("main-container")} dropdown-selector inline-block`
      )}
    >
      <button
        className="flex items-center justify-center rounded-md bg-transparent dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
        onClick={toggleDropdown}
      >
        <Dropdown.ButtonContent icon={icon} />
      </button>

      {isOpen && (
        <div
          className={cn(`${getClassname("menu-container")}  z-50 rounded-md `)}
        >
          <Dropdown.Menu menu={menu} />
        </div>
      )}
    </div>
  );
}

Dropdown.ButtonContent = ({ icon }) => <div>{icon}</div>;

Dropdown.Menu = ({ menu }) => <>{menu}</>;

export default Dropdown;
