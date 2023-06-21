import { useState } from "react";

function Input({ index, getValue }) {
  const [value, setValue] = useState("");

  function checkValue(event) {
    const currentValue = event.currentTarget.value.slice(-1);
    setValue(currentValue);
    getValue(currentValue, index);

    const nextElement = event.currentTarget.nextSibling;
    if (nextElement instanceof HTMLInputElement) {
      nextElement.disabled = false;
      nextElement.focus();
    }
  }

  return (
    <input
      value={value}
      disabled={index > 0}
      onChange={checkValue}
      className="transition ease-in-out duration-300 flex flex-1 items-center disabled:cursor-not-allowed border-2 outline-none focus:outline-none focus:shadow-[0_0_0_4px_rgba(209,213,218,0.45)] focus:border-2 h-[44px] md:h-[52px] w-full px-4 rounded-xl"
      type="number"
    />
  );
}

export default Input;
