import { useSelector } from "react-redux";
import OrderPortalLayout from "./OrderPortalLayout";
import PropertyTabs from "../components/ui/PropertyTabs";
import OrderPropertyImages from "../components/images/OrderPropertyImages";
import TradingSummary from "../components/ui/TradingSummary";

function TradingInfoLayout() {
  const { showSummaryPortal = false } = useSelector((state) => state.trade);
  return (
    <div className="flex justify-between w-full h-full">
      <div className="flex flex-col w-3/5 p-2 ml-2 xl:ml-16 space-y-2">
        <div
          className={`${
            !showSummaryPortal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out h-full w-full`}
        >
          {!showSummaryPortal && <OrderPropertyImages />}
        </div>

        <div
          className={`${
            showSummaryPortal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out w-full h-full`}
        >
          {showSummaryPortal && <TradingSummary />}
        </div>

        <div
          className={`${
            showSummaryPortal ? "hidden" : "block"
          } transition-all duration-1000 ease-in-out`}
        >
          <PropertyTabs />
        </div>
      </div>

      <div className="w-2/5">
        <div className="w-11/12 ">
          <OrderPortalLayout />
        </div>
      </div>
    </div>
  );
}

export default TradingInfoLayout;
