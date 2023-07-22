import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../components/ui/Tabs";
import { storeOrderInfo } from "../../reducers/tradingReducers";
import TabWidget from "../../components/ui/TabWidget";
import Caraousel from "../../components/animation/Caraousel";
import TradingSummary from "./TradingSummary";
import { fetchActiveProperty } from "../../hooks/react-query";
import TradingHeader from "./TradingHeader";
import NoFunds from "./NoFunds";

function Trading() {
  const dispatch = useDispatch();
  const {
    showSummaryPortal = false,
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
    } = {},
  } = useSelector((state) => state.trade);

  const { activeProperty, isLoading, isError } = fetchActiveProperty();

  useEffect(() => {
    dispatch(
      storeOrderInfo({
        propertyId: activeProperty?.id,
      })
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col w-full ">
      <hr className="mt-12" />
      <div className="flex flex-col items-center justify-center w-full flex-1 ">
        <div className="relative flex flex-col w-full justify-center items-center flex-1 px-4 border-gray-200 rounded-lg dark:border-gray-700 ">
          <TradingHeader propertyName={activeProperty?.property_name} />
          <hr className="  w-full mb-2" />
          <NoFunds />
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-4  w-full h-full flex-1">
            <Trading.PropertyCard
              showSummaryPortal={showSummaryPortal}
              property={activeProperty}
            />

            <div className="hidden lg:block lg:col-span-1 xl:col-span-2 w-full h-fit sticky top-[80px] xl:top-32 ">
              <div className="flex items-center justify-center rounded  h-full w-full ">
                <div className="flex flex-col justify-start m-0 p-4 w-full h-full mb-4 bg-transparent">
                  <Tabs
                    soldShares={activeProperty?.total_purchased_shares}
                    totalShares={activeProperty?.total_property_shares}
                    raisedAmount={activeProperty?.total_purchased_amount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Trading.PropertyCard = ({ showSummaryPortal, property }) => (
  <>
    <div className="sm:hidden xl:block xl:col-span-1"></div>
    <div className="col-span-1 lg:col-span-2 xl:col-span-3">
      <div className="flex items-center justify-center rounded bg-gray-50 h-full dark:bg-gray-800">
        <div
          className={`grid ${
            !showSummaryPortal && "grid-rows-3"
          } gap-0 w-full h-full items-start`}
        >
          <div className=" row-span-1">
            <Trading.PropertyImage flipped={!showSummaryPortal} />
          </div>
          <div
            className={`${
              showSummaryPortal ? "hidden" : "block"
            } transition-all duration-1000 ease-in-out row-span-2`}
          >
            <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
              <Trading.PropertyTabs property={property} />
            </div>
            <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Trading.PropertyImage = ({ flipped = true }) => {
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
            flipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full`}
        >
          <Caraousel getClassname={getClassname} />
        </div>

        <div
          className={`${
            flipped ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
          } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full h-full`}
        >
          <TradingSummary />
        </div>
      </div>
    </div>
  );
};

Trading.PropertyTabs = ({ property }) => {
  const headers = [
    {
      id: "1_1",
      title: "Overview",
      content: <Trading.PropertyOverview />,
    },
    {
      id: "1_2",
      title: "Facts",
      content: "",
    },
    {
      id: "1_3",
      title: "Home value",
      content: "",
    },
  ];
  const getClassname = (name) => {
    switch (name) {
      case "main-container":
        return "relative";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col w-11/12">
      <Trading.PropertyHeader property={property} />
      <TabWidget
        getclassName={getClassname}
        active="Overview"
        tabHeaders={headers}
      />
    </div>
  );
};

Trading.PropertyHeader = ({ property }) => (
  <div className="flex flex-col">
    <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold">
      {property?.property_address}
    </span>
    <span className="text-sm xl:text-base font-extralight">{`${property?.city}, ${property?.state} ${property?.zip_code}`}</span>
    <span className="text-sm xl:text-base font-semibold">
      {property?.description}
    </span>
  </div>
);

Trading.PropertyOverview = () => (
  <div className="flex flex-col">
    <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
      $299,997
    </span>
    <span>rental status: 100% filled</span>
    <span>monthly rent: $1,200</span>
    <span>rental revenue: $10,000</span>
    <span>HOE: $2,000</span>
    <span>Maintanance: $2,000</span>
  </div>
);

export default Trading;
