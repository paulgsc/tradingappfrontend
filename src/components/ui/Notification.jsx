import React from "react";

import { RiNotification3Line } from "react-icons/ri";

import Dropdown from "./Dropdown";
import { CloseSvg } from "../../constants/svgs/Svg";
import { formatTimestamp } from "../../lib/utils";

const getClassname = (name) => {
  switch (name) {
    case "main-container":
      return "fixed";
    case "menu-container":
      return "absolute -right-6 h-96 overflow-y-auto border";
    default:
      return "";
  }
};
function Notification({ data, handleRecordClick, handleScroll }) {
  return (
    <div className="">
      <Dropdown
        getClassname={getClassname}
        icon={<Notification.Icon />}
        menu={
          <Notification.Table
            notifications={data}
            handleRecordClick={handleRecordClick}
            handleScroll={handleScroll}
          />
        }
      />
    </div>
  );
}

Notification.Icon = () => (
  <div className=" relative">
    <span className=" bg-[red] absolute inline-flex rounded-full h-[6px] lg:h-2 w-[6px] lg:w-2 right-0 -top-1" />
    <RiNotification3Line className="w-4 h-4 lg:w-6 lg:h-6 text-[#5AFF7A]" />
  </div>
);

Notification.Table = ({ notifications, handleScroll, handleRecordClick }) => {
  return (
    <div className="relative flex flex-col items-center w-96 ">
      <div className="z-30 bg-white sticky top-0 flex items-center px-4 h-14 w-full ring-2 ring-slate-300 mb-2">
        <span className="flex gap-1">
          {notifications && notifications?.length}{" "}
          <span className="font-extrabold">new</span>{" "}
          <h3 className="text-slate-400 text-base">Notifications</h3>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        {notifications &&
          notifications[0].map((item) => (
            <NoticeToaster
              key={item.id}
              title={item?.content_type}
              message={item?.message}
              id={item.id}
              time={item?.created_at}
            />
          ))}
      </div>
    </div>
  );
};

const NoticeToaster = ({ title, message, time }) => (
  <div className="flex items-center justify-center ">
    <div className="flex flex-col items-center justify-between w-full md:w-96 h-32 shadow-sm border-t border-r rounded-lg">
      <div className="flex justify-between align-middle my-auto w-10/12">
        <span className="text-base capitalize md:text-lg xl:text-xl">
          {title}
        </span>
        <span className="text-slate-400 hover:text-slate-600 focus:ring-1 cursor-pointer">
          <CloseSvg />
        </span>
      </div>
      <span className="text-sm font-light break-before-all px-6 text-cente">
        {message}
      </span>
      <div className="flex w-11/12 justify-between items-center mx-auto my-auto">
        <div className="flex gap-6 text-end">
          <span className="px-4 text-sm font-medium">Undo</span>
          <span className="text-sm font-medium">Dismiss</span>
        </div>
        <span className="text-xs text-slate-600 font-light">
          {time && formatTimestamp(time)}.
        </span>
      </div>
    </div>
  </div>
);

export default Notification;
