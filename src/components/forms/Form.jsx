import React from "react";
import { DeleteIcon, FullScreen, SaveIcon } from "../../constants/svgs/Svg";

function Form({ ...props }) {
  return <div {...props} />;
}

Form.Items = ({ data, size, handleChange }) => {
  const ListItems = [];
  let index = 0;

  while (index < data.length) {
    const listItems = data.slice(index, index + size).map((item, i) => (
      <div key={item.id} className="flex items-center w-full  px-4">
        {item.element === "input" && (
          <Form.Input
            title={item.title}
            name={item.name}
            value={item.value}
            handleChange={handleChange}
          />
        )}
        {item.element === "date" && (
          <Form.Date
            title={item.title}
            name={item.name}
            value={item.value}
            handleChange={handleChange}
          />
        )}
        {item.element === "textArea" && (
          <Form.TextArea
            title={item.title}
            name={item.name}
            value={item.value}
            handleChange={handleChange}
          />
        )}
      </div>
    ));

    ListItems.push(
      <div key={index} className="items-center w-full flex flex-grow">
        {listItems}
      </div>
    );

    index += size;
  }
  return ListItems;
};

Form.Input = ({ title, name, value, handleChange }) => (
  <div className="relative w-full mb-3">
    <label
      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
      htmlFor="grid-password"
    >
      {title}
    </label>
    <input
      type="text"
      name={name}
      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      value={value}
      onChange={handleChange}
    />
  </div>
);

Form.Icons = () => (
  <div className="flex justify-between items-center p-3 ">
    <div className="flex-initial">
      <h6 className="flex items-center text-blueGray-400 text-lg mt-3 mb-6 font-light capitalize">
        Change property
      </h6>
    </div>
    <div className="flex flex-row-reverse items-center">
      <div className="flex-initial pl-3">
        <button
          type="button"
          className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
        >
          <SaveIcon />
          <span className="pl-2 mx-1">Save</span>
        </button>
      </div>
      <div className="flex-initial">
        <button
          type="button"
          className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
        >
          <DeleteIcon />
          <span className="pl-2 mx-1">Delete</span>
        </button>
      </div>
    </div>
  </div>
);

Form.TextArea = ({ title, name, value, handleChange }) => (
  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
      <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
        <div className="flex items-center space-x-1 sm:pr-4"></div>
      </div>
      <button
        type="button"
        data-tooltip-target="tooltip-fullscreen"
        className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <FullScreen />
        <span className="sr-only">Full screen</span>
      </button>
      <div
        id="tooltip-fullscreen"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Show full screen
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
      <label for="editor" className="sr-only">
        {title}
      </label>
      <textarea
        rows="8"
        className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
        placeholder="add text..."
        value={value}
        name={name}
        required
      ></textarea>
    </div>
  </div>
);

Form.Date = ({ title, name, value, handleChange }) => (
  <div className="relative w-full mb-3">
    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      {title}
    </label>
    <div className="relative">
      <input
        type="date"
        name={name}
        value={value}
        onChange={handleChange}
        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
    </div>
  </div>
);

export default Form;
