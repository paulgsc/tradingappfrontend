import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import Tabs from "../../components/ui/Tabs";
import { Link } from "react-router-dom";
import SlideshowComponent from "../../components/animation/SlideShowComponent";
import { fetchPropertyRows } from "../../contexts/redux/actions/fetchPropertyActions";
import { fetchPropertyQuery } from "../../contexts/redux/actions/fetchDataActions";
import { storeOrderInfo } from "../../reducers/tradingReducers";

function Trading() {
  const dispatch = useDispatch();
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
    } = {},
    balanceInfo: { transferAmountRemaining = "", amountPurchased = "" } = {},
  } = useSelector((state) => state.trade);
  const {
    id = "",
    price_per_share = "",
    available_shares = "",
    total_purchased_shares = "",
    total_property_shares = "",
    total_purchased_amount = "",
    property_name = "",
    property_address = "",
  } = useSelector((state) => getPropertyById(state, propertyId));

  useEffect(() => {
    dispatch(fetchPropertyRows());
    dispatch(
      storeOrderInfo({
        propertyId: 55,
      })
    );
    dispatch(fetchPropertyQuery(""));
  }, [dispatch, total_property_shares]);

  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full flex-1 p-4">
        <div className="flex flex-col w-full justify-center items-center flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 z-60">
          <Trading.Header property_name={property_name} />
          <Trading.Alert transferAmountRemaining={transferAmountRemaining} />
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-4 w-full h-full flex-1">
            <Trading.PropertyCard />
            <div className="hidden lg:block lg:col-span-1 xl:col-span-2 w-full">
              <div className="flex items-center justify-center rounded bg-gray-50 h-full w-full dark:bg-gray-800">
                <div className="flex flex-col justify-start m-0 p-4 w-full h-full mb-4 rounded shadow-xl bg-white dark:bg-gray-800">
                  <Tabs
                    soldShares={total_purchased_shares}
                    totalShares={total_property_shares}
                    raisedAmount={total_purchased_amount}
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

Trading.Header = ({ property_name }) => (
  <div className="flex items-center justify-center h-24 w-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
    <h1 className="text-base lg:text-2xl xl:text-3xl leading-relaxed text-gray-600 dark:text-gray-500">
      Own a Piece of {property_name}: Invest Now, Reap the Benefits Forever
    </h1>
  </div>
);

Trading.Alert = ({ transferAmountRemaining }) => (
  <div className="grid lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-4 w-full">
    <div className=" lg:col-span-2 xl:col-span-4 invisible">
      <div className="flex items-center justify-center rounded bg-gray-50 h-4/5 dark:bg-gray-800">
        <p className="text-sm text-gray-400 dark:text-gray-500">+</p>
      </div>
    </div>

    <div className="lg:col-span-1 xl:col-span-2 w-full">
      <div className="flex items-center justify-center rounded bg-gray-50 w-full h-min dark:bg-gray-800">
        {!transferAmountRemaining && (
          <div className="w-full rounded-full m-0 px-1 py-0 bg-blue-100 border-t border-b border-blue-500 text-blue-700 flex items-center justify-center">
            <div className="">
              <svg
                className=" fill-current h-4 w-4 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex justify-center items-center">
              <p className="font-semibold text-xs xl:text-base">
                Transfer Funds To Trade
              </p>
              <Link
                className="p-0  m-0 text-sm xl:text-base mx-2 bg-gray-100 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded py-0 xl:py-2 px-4 mt-2 md:mt-0"
                to="/personal/banking"
              >
                <span className="">Transfer</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

Trading.PropertyCard = () => (
  <>
    <div className="sm:hidden xl:block xl:col-span-1"></div>
    <div className="col-span-1 lg:col-span-2 xl:col-span-3">
      <div className="flex items-center justify-center rounded bg-gray-50 h-full dark:bg-gray-800">
        <div className="grid grid-rows-3 gap-0 w-full h-full">
          <div className=" row-span-1">
            <Trading.PropertyImage />
          </div>
          <div className="row-span-2">
            <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Trading.PropertyImage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full rounded bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-center items-start w-full h-[440px] md:h-[524px] lg:h-[440px] xl:h-[524px] p-0 m-0 bg-center bg-no-repeat bg-cover">
        <SlideshowComponent />
      </div>
    </div>
  );
};

export default Trading;
