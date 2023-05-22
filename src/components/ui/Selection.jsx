import React from "react";

function Selection({ options, selected, onSelectionChange }) {
  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    onSelectionChange(selectedValue);
  };
  return (
    <div className="">
      <select
        className=" lg:h-16 xl:h-32 w-full border bg-indigo-50 border-gray-300 text-gray-900 text-sm lg:text-2xl xl:text-4xl break-normal rounded-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelectionChange}
      >
        <option value="" className="w-2">
          {selected}
        </option>
        {options.map((item) => (
          <option value={item.id} key={item.id} className="w-10 break-normal">
            {item.official_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selection;
