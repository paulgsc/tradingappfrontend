import React from "react";
import TradeAdminDashboard from "./TradeAdminDashboard";
import { useLocation } from "react-router";

function TradeLayout() {
  const location = useLocation();
  return (
    <div className="flex w-full h-full mt-3">
      {location.pathname.includes(`/admin/site/models/trade`) && (
        <TradeAdminDashboard />
      )}
    </div>
  );
}

export default TradeLayout;
