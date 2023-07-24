import React from "react";
import TypeLayout from "./TypeLayout";
import ManualInput from "../components/inputs/ManualInput";
import Slider from "../components/inputs/Slider";
import OrderBarGraph from "../components/ui/OrderBarGraph";

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
