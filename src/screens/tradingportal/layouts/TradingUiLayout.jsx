import { useSelector } from "react-redux";
import TradingSummary from "../components/ui/TradingSummary";
import OrderPropertyImages from "../components/images/OrderPropertyImages";

function TradingUiLayout() {
  const { showSummaryPortal = false } = useSelector((state) => state.trade);

  return (
    <div className="flex justify-center w-full h-full overflow-clip">
      <div className="relative flex justify-center items-start w-full h-full p-0 m-0 ">
        <div
          className={`${
            !showSummaryPortal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full h-full`}
        >
          {!showSummaryPortal && <OrderPropertyImages />}
        </div>

        <div
          className={`${
            showSummaryPortal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full min-h-screen`}
        >
          {showSummaryPortal && <TradingSummary />}
        </div>
      </div>
    </div>
  );
}

export default TradingUiLayout;
