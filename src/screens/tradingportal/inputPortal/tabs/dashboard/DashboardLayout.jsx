import React from "react";
import ProgressBar from "./ProgressBar";
import FlipCard from "./FlipCard";
import CTA from "./CTA";

function DashboardLayout() {
  return (
    <div className="grid gap-4 mb-4">
      <div className="flex items-center justify-center rounded bg-gray-50  dark:bg-gray-800">
        <ProgressBar />
      </div>
      <CTA />
      <div className="flex w-full  items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <FlipCard />
      </div>
      <div className="row-span-2"></div>
    </div>
  );
}

export default DashboardLayout;
