import React from "react";
import SideTabs from "../../components/sidemenu/SideTabs";
import IpAdresses from "./IpAdresses";
import SettingsHome from "./SettingsHome";
import LoginSettings from "./LoginSettings";

function SiteSettings() {
  return <General />;
}

export default SiteSettings;

const General = () => {
  const links = [
    {
      id: 1,
      title: "General",
      path: "/admin/site/settings",
    },
    {
      id: 1,
      title: "Login Settings",
      path: "/admin/site/settings/login",
    },
    {
      id: 1,
      title: "Network Security",
      path: "/admin/site/settings/network-security",
    },
  ];
  return (
    <main className=" relative flex justify-center w-full bg-stone-50 border">
      <nav className="z-[1055] fixed top-0 h-[74px] w-96 flex items-center justify-center ">
        <h3 className="font-semibold text-lg xl:text-xl text-neutral-600 p-1">
          Site Settings
        </h3>
      </nav>
      <div className="mt-16 flex gap-2 w-full">
        <aside className="shadow-md h-full w-72 border-l bg-white col-span-1">
          <SideTabs className={"min-h-screen flex justify-center items-start "}>
            <div className="flex flex-col mx-auto ">
              <SideTabs.Links className={" my-1 "} items={links} />
            </div>
          </SideTabs>
        </aside>
        {location.pathname === "/admin/site/settings/login" && (
          <LoginSettings />
        )}
        {location.pathname === "/admin/site/settings/network-security" && (
          <div className=" border col-span-5 justify-center items-center shadow-md h-full">
            <div className="w-full xl:hidden">
              <IpAdresses />
            </div>
            <div className="hidden xl:grid grid-cols-7">
              <div className="col-span-1 ">+</div>
              <div className=" col-span-5">
                <IpAdresses />
              </div>
              <div className="col-span-1 ">+</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
