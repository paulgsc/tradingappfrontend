import React from "react";
import { fetchActiveProperty } from "../../hooks/react-query";
import TradingHeader from "./components/ui/TradingHeader";
import NoFunds from "./components/alerts/transfer/NoFunds";
import TradingInfoLayout from "./layouts/TradingInfoLayout";
import DataLayout from "./layouts/DataLayout";

function Trading() {
  const { activeProperty = {}, isLoading, isError } = fetchActiveProperty();

  return (
    <div className="min-h-screen flex flex-col w-full ">
      <hr className="mt-12" />
      <div className="flex flex-col items-center justify-center w-full flex-1 ">
        <div className="relative flex flex-col w-full justify-center items-center flex-1 px-4 border-gray-200 rounded-lg dark:border-gray-700 ">
          <TradingHeader propertyName={activeProperty?.property_name} />
          <hr className="  w-full mb-2" />
          <NoFunds />
          <TradingInfoLayout />
        </div>
      </div>
      <DataLayout />
    </div>
  );
}

export default Trading;
