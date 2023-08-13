import React from "react";
import { fetchActiveProperty } from "../../hooks/react-query";
import TradingHeader from "./components/ui/TradingHeader";
import NoFunds from "./components/alerts/transfer/NoFunds";
import TradingInfoLayout from "./layouts/TradingInfoLayout";

function Trading() {
  const { activeProperty = {}, isLoading, isError } = fetchActiveProperty();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <hr className="mt-12" />
      <main className="flex flex-col items-center justify-center w-full h-full ">
        <div className="relative flex flex-col w-full  h-full justify-center items-center px-4 border-gray-200 rounded-lg ">
          <TradingHeader propertyName={activeProperty?.property_name} />
          <hr className="  w-full mb-2" />

          <NoFunds />

          <TradingInfoLayout />
        </div>
      </main>
    </div>
  );
}

export default Trading;
