import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCalloutAlert,
  showSummaryPortal,
} from "../../../../reducers/tradingReducers";

function ReviewBtn() {
  const dispatch = useDispatch();
  const {
    orderInfo: { orderInput = "", validOrder = false } = {},
    orderValidation: { isWholeShares = false, isLessThanBalance = false } = {},
  } = useSelector((state) => state.trade);

  const handleReview = () => {
    orderInput && handleValidOrder();
    orderInput && handleNotEnoughFunds();
    orderInput && handleNotWholeShares();
  };
  const handleValidOrder = () => {
    if (isWholeShares && isLessThanBalance && validOrder) {
      dispatch(
        showSummaryPortal({
          showSummaryPortal: true,
        })
      );
    }
  };
  const handleNotEnoughFunds = () => {
    if (validOrder && !isLessThanBalance) {
      dispatch(
        showCalloutAlert({
          showNotEnoughFundsAlert: true,
        })
      );
    }
  };
  const handleNotWholeShares = () => {
    if (!isWholeShares && validOrder && isLessThanBalance) {
      dispatch(
        showCalloutAlert({
          showNotWholeSharesAlert: true,
        })
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full mx-auto my-auto py-6">
      <button
        disabled={!orderInput}
        onClick={handleReview}
        className=" h-12 w-24 shadow-sm rounded-md text-white bg-black enabled:hover:bg-blue-600 disabled:opacity-40 enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        Review
      </button>
    </div>
  );
}

export default ReviewBtn;
