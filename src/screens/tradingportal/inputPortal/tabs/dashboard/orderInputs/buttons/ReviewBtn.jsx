import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSummaryPortal } from "../../../../../../../reducers/tradingReducers";
import { useEffect } from "react";
import ValidShares from "../../validations/ValidShares";
import ValidateAmount from "../../validations/ValidateAmount";

function ReviewBtn() {
  const {
    orderInfo: { transactionType = null, orderInput = "" } = {},
    userBalance: { transfer_remaining } = {},
  } = useSelector((state) => state.trade);
  const { tradingPropertyInfo: { available_shares } = {} } = useSelector(
    (state) => state.propertyData
  );
  const [showSummary, setShowSummary] = useState(false);
  const dispatch = useDispatch();
  const handleReview = () => {
    setShowSummary(!showSummary);
  };
  useEffect(() => {
    dispatch(
      showSummaryPortal({
        showSummaryPortal: showSummary,
      })
    );
  }, [showSummary]);
  return (
    <div className="flex items-center justify-center w-full mx-auto my-auto py-6">
      <button
        disabled={!orderInput}
        onClick={handleReview}
        className=" h-12 w-24 shadow-sm rounded-md text-white bg-black enabled:hover:bg-blue-600 disabled:opacity-40 enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        Review
      </button>
      <ValidShares />
      <ValidateAmount />
    </div>
  );
}

export default ReviewBtn;
