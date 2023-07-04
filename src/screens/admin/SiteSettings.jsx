import React from "react";
import SideTabs from "../../components/sidemenu/SideTabs";
import { Link } from "react-router-dom";
import IpAdresses from "./IpAdresses";

function SiteSettings() {
  return <General />;
}

export default SiteSettings;

const General = () => {
  const links = [
    {
      id: 1,
      title: "Network Security",
      path: "/admin/site/models/site-settings/network-security",
    },
  ];
  return (
    <main className="relative flex justify-center w-full bg-stone-50 border">
      <div className="grid grid-cols-6 items-start gap-2 w-full">
        <aside className="shadow-md h-full border-l bg-white col-span-1">
          <SideTabs className={"min-h-screen flex justify-center items-start "}>
            <div className="flex flex-col mx-auto ">
              <SideTabs.Links className={" my-1 "} items={links} />
            </div>
          </SideTabs>
        </aside>
        {location.pathname === "/personal/settings" && "+"}
        {location.pathname ===
          "/admin/site/models/site-settings/network-security" && (
          <div className=" border col-span-5 justify-center items-center shadow-md h-full">
            <div className="w-full xl:hidden">
              <IpAdresses />
            </div>
            <div className="hidden xl:grid grid-cols-7">
              <div className="col-span-1 border-red-600 border">+</div>
              <div className=" col-span-5">
                <IpAdresses />
              </div>
              <div className="col-span-1 border-red-600 border">+</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
