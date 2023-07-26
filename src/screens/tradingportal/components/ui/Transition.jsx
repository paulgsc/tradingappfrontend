import React from "react";

function Transition({ children }) {
  return <div className="w-full h-full">{children}</div>;
}

Transition.On = ({ toggle, children }) => {
  return (
    <div
      className={`bg-gray-50 ${
        toggle ? "opacity-100 scale-100" : "opacity-0 scale-50 "
      } transition-all duration-1000 ease-in-out w-full h-full`}
    >
      {toggle && children}
    </div>
  );
};

Transition.Off = ({ toggle, children }) => {
  return (
    <div
      className={` ${
        toggle ? "opacity-0 scale-50" : "opacity-100 scale-100"
      } transition-all duration-1000 ease-in-out h-full w-full`}
    >
      {!toggle && children}
    </div>
  );
};

export default Transition;
