import { useEffect } from "react";
import { useState } from "react";
import Callout from "../../../../components/ui/Callout";

function SwitchBtn({ checked, label, result, error, handleChecked }) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (error) {
      setShowNotification(true);
    }

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000); // 10000 milliseconds (10 seconds)

    // Clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [result, error]);
  return (
    <div className="flex p-2 rounded hover:bg-gray-100 ">
      <label className="relative inline-flex items-center w-full cursor-pointer">
        <input
          checked={checked}
          onChange={handleChecked}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
        {result && <p className=" flex-1 text-end px-6">&#x2714;</p>}
        {showNotification && (
          <span className="flex flex-1 items-center justify-end text-end px-6">
            <p className="items-center text-center  w-5 h-5 rounded-full text-semibold text-pink-200 bg-red-900 ">
              &#x2718;
            </p>
          </span>
        )}
      </label>
      {showNotification && (
        <Callout
          className={
            "absolute z-50 top-0 max-w-[200px] w-fit -translate-y-full flex justify-center"
          }
          message={error}
        />
      )}
    </div>
  );
}

export default SwitchBtn;
