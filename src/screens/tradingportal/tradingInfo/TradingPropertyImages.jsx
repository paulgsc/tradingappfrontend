import React from "react";
import Caraousel from "../../../components/animation/Caraousel";
import TradingSummary from "../TradingSummary";
import { useSelector } from "react-redux";

function TradingPropertyImages() {
  const { showSummaryPortal = false } = useSelector((state) => state.trade);

  const getClassname = (name) => {
    switch (name) {
      case "image-container":
        return "relative overflow-hidden rounded-lg  h-[440px] md:h-[524px] lg:h-[440px] xl:h-[524px]";
      case "full-screen":
        return "fixed flex flex-1 left-0 right-0 top-0 min-h-screen w-screen z-50";
      default:
        return "";
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-full rounded bg-gray-50 dark:bg-gray-800">
      <div className="relative flex justify-center items-start w-full h-[440px] md:h-[524px] lg:h-[440px] xl:h-[524px] p-0 m-0 bg-center bg-no-repeat bg-cover">
        <div
          className={`${
            !showSummaryPortal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full`}
        >
          {!showSummaryPortal && <Caraousel getClassname={getClassname} />}
        </div>

        <div
          className={`${
            showSummaryPortal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full h-full`}
        >
          {showSummaryPortal && <TradingSummary />}
        </div>
      </div>
    </div>
  );
}

export default TradingPropertyImages;
