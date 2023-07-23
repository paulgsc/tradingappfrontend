import React from "react";

function ReviewPage({ flipped }) {
  return (
    <div
      className={`${
        flipped ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
      } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full`}
    >
      <SummaryPage />
    </div>
  );
}

export default ReviewPage;
