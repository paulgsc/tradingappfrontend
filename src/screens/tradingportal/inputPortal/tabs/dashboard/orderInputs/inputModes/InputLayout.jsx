import React from "react";
import TypeLayout from "../buyType/TypeLayout";
import ManualInput from "./ManualInput";
import Slider from "./Slider";
import OrderBarGraph from "./OrderBarGraph";

function InputLayout() {
  return (
    <div className="space-y-12 w-full h-full">
      <div className="flex items-center justify-between space-x-2 h-full w-full p-2 border-2 rounded-lg border-gray-300">
        <TypeLayout />
        <ManualInput />
      </div>
      <Slider />
      <OrderBarGraph />
    </div>
  );
}

export default InputLayout;
