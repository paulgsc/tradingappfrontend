import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/firebase-hooks";

import "firebase/auth";
import TabWidget from "../../components/ui/TabWidget";
import Navbar from "../../components/navbar/Navbar";
import SideTabs from "../../components/sidemenu/SideTabs";
import ToggleButton from "../../components/ui/ToggleButton";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ProfileInfo from "../../components/ui/ProfileInfo";
import { CameraSvg, ProfileSvg } from "../../constants/svgs/Svg";
import ToggleTwoFactor from "../login/component/clients/firebase/multifactorOauth/ToggleTwoFactor";

function ProfileSettings() {
  const user = useCurrentUser();
  const headers = [
    {
      id: "tab1",
      title: "General",
      content: <General />,
    },
    {
      id: "tab2",
      title: "Security & privacy",
      content: <ToggleTwoFactor currentUser={user} />,
    },
    {
      id: "tab3",
      title: "Personal Info",
      content: [],
    },
    {
      id: "tab4",
      title: "Advanced",
      content: [],
    },
  ];
  return (
    <div className="min-h-screen">
      <Navbar
        showMenu={true}
        Menubar={() => <TabWidget tabHeaders={headers} active="General" />}
      />

      <div className=" inset-0 lg:max-w-2xl xl:max-w-6xl min-h-screen flex  justify-center mx-auto"></div>
    </div>
  );
}

export const General = () => {
  const links = [
    {
      id: 1,
      title: "Notfications",
      path: "/personal/settings/notifications",
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
        {location.pathname === "/personal/settings" && <Home />}
        {location.pathname === "/personal/settings/notifications" && (
          <div className="border col-span-5 justify-center shadow-md bg-white h-fit">
            <Notifications />
          </div>
        )}
      </div>
    </main>
  );
};

const Notifications = () => {
  return (
    <div className="grid grid-rows-4 mx-auto my-auto items-center xl:px-32 xl:py-4 p-4 gap-1 bg-red">
      <div className="flex w-full justify-between gap-2 text-sm lg:text-base font-normal text-neutral-600">
        <span>Receive notifications for new account events</span>
        <ToggleButton />
      </div>
      <div className="flex w-full justify-between gap-2 text-sm font-normal text-neutral-600">
        <span>Receive notifications for all trade orders</span>
        <ToggleButton />
      </div>
      <div className="flex w-full justify-between gap-2 text-sm font-normal text-neutral-600">
        <span>Receive notifications for new transfer events</span>
        <ToggleButton />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <ProfileInfo className={"relative col-span-5 w-full h-full bg-white"}>
      <ProfileInfo.Background
        className={
          "flex justify-end items-end w-full h-1/5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        }
      >
        <ProfileInfo.Button
          className={
            " hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-mediu items-end gap-2 w-20 p-1 bg-blue-600 rounded-sm shadow-md text-sm text-white flex  justify-center"
          }
        >
          <span>
            <CameraSvg />
          </span>
          <span>Edit</span>
        </ProfileInfo.Button>
      </ProfileInfo.Background>
      <ProfileInfo.Card className={"border "}>
        <ProfileInfo.ProfileImageCard
          className={
            "absolute top-11  xl:top-28 left-[45%] ring-4  w-28 h-28 xl:w-36 xl:h-36 "
          }
        >
          <ProfileSvg />
        </ProfileInfo.ProfileImageCard>
      </ProfileInfo.Card>
      <ProfileInfo.Card
        className={"h-36 flex items-start mx-auto p-2 bg-slate-50"}
      >
        <ProfileInfo.ProfileImageCard className={" w-24 h-24 xl:w-28 xl:h-28 "}>
          <ProfileSvg />
        </ProfileInfo.ProfileImageCard>
        <div className="flex flex-col justify-center gap-6 h-full ml-12">
          <span className="flex items-center font-semibold gap-2">
            pgathondu
            <i className="text-xs text-green-500 fa-solid fa-check"></i>
          </span>
          <div className="flex gap-8 items-end text-end text-xs xl:text-sm text-neutral-600 font-light">
            <span>account owner</span>
            <span>Joined July 2, 2023</span>
          </div>
        </div>
      </ProfileInfo.Card>
    </ProfileInfo>
  );
};

export default ProfileSettings;
