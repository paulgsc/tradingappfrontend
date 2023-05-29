import React, { useState } from "react";
import { useEffect } from "react";

function Dropdown({ icon, menu }) {
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
    <div className="dropdown-selector relative inline-block">
      <button
        className="flex items-center justify-center rounded-md bg-transparent dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
        onClick={toggleDropdown}
      >
        <Dropdown.ButtonContent icon={icon} />
      </button>

      {isOpen && (
        <div>
          <Dropdown.Menu menu={menu} />
        </div>
      )}
    </div>
  );
}

Dropdown.ButtonContent = ({ icon }) => <div>{icon}</div>;

Dropdown.Menu = ({ menu }) => <>{menu}</>;

export default Dropdown;
