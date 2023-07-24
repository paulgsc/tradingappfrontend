import React from "react";
import { useSelector } from "react-redux";
import SummaryPage from "./SummaryPage";
import OrderPage from "./OrderPage";
import ReviewPage from "./ReviewPage";

function FlipCard() {
  const { showSummaryPortal = false } = useSelector((state) => state.trade);

  return (
    <div className="relative w-full">
      <ReviewPage flipped={!showSummaryPortal} />

      <OrderPage flipped={!showSummaryPortal} />
    </div>
  );
}

export default FlipCard;
