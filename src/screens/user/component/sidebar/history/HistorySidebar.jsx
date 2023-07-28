import React from "react";
import SideTabs from "../../../../../components/sidemenu/SideTabs";
import { Link } from "react-router-dom";
import HistorySearchbar from "../../searchbar/history/HistorySearchbar";

function HistorySidebar() {
  const links = [
    {
      id: 1,
      title: "Notfications",
      path: "/personal/settings/notifications",
    },
  ];
  return (
    <aside className="fixed min-h-screen w-40 xl:w-52 left-0 top-0 translate-y-12 translate-x-4 p-4 shadow-sm border-l bg-stone-100 ">
      <SideTabs className={"flex justify-center items-start "}>
        <div className="flex flex-col w-full">
          <SideTabs.Title>
            <Link to={"/personal/settings"}>Quick Filter</Link>
          </SideTabs.Title>

          <SideTabs.Links className={" my-1 "} items={links} />
        </div>
      </SideTabs>
    </aside>
  );
}

export default HistorySidebar;
