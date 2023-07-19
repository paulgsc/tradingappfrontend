import React from "react";
import { useEffect } from "react";
import { CloseSvg } from "../../constants/svgs/Svg";

function Dialog({ children, onClose }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      className="z-[1055] min-h-screen fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70"
    >
      <div className="relative bg-white flex h-72 w-96 rounded-lg shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className=" absolute right-0 top-0 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <CloseSvg />
        </button>
        <div className="h-full w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dialog;
