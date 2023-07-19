import React from "react";
import ToggleButton from "./ToggleButton";

function ToggleSettings({ items = [] }) {
  return (
    <div className="grid grid-rows-4 mx-auto my-auto items-center xl:px-32 xl:py-4 p-4 gap-1 bg-red">
      I
      {items.map((item) => (
        <div className="flex w-full justify-between gap-2 text-sm lg:text-base font-normal text-neutral-600">
          <span>{item?.title}</span>
          <ToggleButton />
        </div>
      ))}
    </div>
  );
}

export default ToggleSettings;
