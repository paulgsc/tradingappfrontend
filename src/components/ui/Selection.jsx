import React from "react";

function Selection({ options, selected, onSelectionChange }) {
  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    onSelectionChange(selectedValue);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <select
        className=" lg:h-12 xl:h-16 w-11/12 shadow-sm border-b border-gray-300 text-gray-900 text-sm lg:text-base break-normal rounded-xl  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelectionChange}
      >
        <option value="" className="">
          {selected}
        </option>
        {options.map((item) => (
          <option value={item.id} key={item.id} className="break-normal">
            {item.official_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selection;
