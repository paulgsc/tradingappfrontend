import React from "react";
import SideTabs from "../../../components/sidemenu/SideTabs";
import { Link, useLocation } from "react-router-dom";
import DetailsPage from "./DetailsPage";

function TradeGeneralSettings() {
  const location = useLocation();
  const links = [
    {
      id: 1,
      title: "Listings mode",
      path: "/admin/site/models/trade/settings/listings-mode",
    },
  ];
  return (
    <main className="relative flex justify-center bg-stone-50">
      <div className="grid grid-cols-6 items-start gap-2 w-full xl:w-9/12">
        <aside className="shadow-sm h-full border-l bg-stone-100 col-span-1">
          <SideTabs className={"min-h-screen flex justify-center items-start "}>
            <div className="flex flex-col mx-auto ">
              <SideTabs.Title>
                <Link to={"/personal/settings"}> General Settings</Link>
              </SideTabs.Title>
              <SideTabs.Links className={" my-1 "} items={links} />
            </div>
          </SideTabs>
        </aside>

        {location.pathname === "/admin/site/models/trade" && (
          <div className="border col-span-5 justify-center shadow-md bg-white h-full">
            <DetailsPage />
          </div>
        )}
      </div>
    </main>
  );
}

export default TradeGeneralSettings;
