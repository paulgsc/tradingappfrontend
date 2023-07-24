import React from "react";
import ProgressBar from "../components/dashboard/ProgressBar";
import FlipCard from "../components/dashboard/FlipCard";
import ValidateAmount from "../components/validations/ValidateAmount";
import StageLiveOrder from "../components/validations/StageLiveOrder";
import ValidShares from "../components/validations/ValidShares";
import CTA from "../components/ui/CTA";

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
      <ValidShares />
      <ValidateAmount />
      <StageLiveOrder />
    </div>
  );
}

export default DashboardLayout;
