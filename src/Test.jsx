import { useState } from "react";

const MyComponent = () => {
  const [showContainer, setShowContainer] = useState(true);

  const handleClick = () => {
    setShowContainer(!showContainer);
  };

  return (
    <div>
      <div
        className={`${
          showContainer
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        } transition-all duration-1000 ease-in-out transform flex items-center justify-center h-16 bg-blue-500 text-white`}
      >
        Container 1
      </div>

      <div
        className={`${
          showContainer
            ? "opacity-0 translate-x-full"
            : "opacity-100 translate-x-0"
        } transition-all duration-1000 ease-in-out transform flex items-center justify-center h-16 bg-red-500 text-white`}
      >
        Container 2
      </div>

      <button onClick={handleClick} className="mt-4">
        Switch Container
      </button>
    </div>
  );
};

export default MyComponent;
