import React from "react";
import SummaryPageLayout from "../../layouts/SummaryPageLayout";
import { useSelector } from "react-redux";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";

function ReviewPage({ flipped }) {
  const {
    loading = false,
    error = null,
    tradeComplete = false,
  } = useSelector((state) => state.trade);

  if (loading && !tradeComplete) {
    return <SkeletonLoading size={3} />;
  }
  return (
    <div
      className={`${
        flipped
          ? "opacity-0 translate-y-full pointer-events-none"
          : "opacity-100 translate-y-0"
      } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full h-full`}
    >
      <SummaryPageLayout />
    </div>
  );
}

export default ReviewPage;
