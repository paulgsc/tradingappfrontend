import React from "react";
import Account from "../profile/Account";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../components/sidemenu/SideBar";
import Timeline from "./Timeline";
import { useLocation, useParams } from "react-router";
import Forms from "../../components/ui/Forms";
import TableModels from "./TableModels";
import Dashbaord from "./Dashbaord";
import Tasks from "./Tasks";
import TaskStatusPage from "../../components/tasks/Status";

function AdminPage() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const { id: taskId, lineId } = useParams();
  const {
    summary: {
      amount_purchased = "",
      transfer_remaining = "",
      transfers_total = "",
    } = {},
    sharesData = [],
    propertyData = [],
    loading,
  } = useSelector((state) => state.fetchData);

  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const initLetter = () =>
    JSON.parse(localStorage.getItem("userInfo"))?.email?.charAt(0) || "";
  const [profileInitial, setProfileInitial] = useState(initLetter());

  const openAdminMenu = (e) => {
    e.preventDefault();
    const sideBar = document.getElementById("admin-sidebar");
    sideBar.classList.toggle("hidden");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const container = document.getElementById("admin-sidebar");
      const button = document.getElementById("hamburger-menu");
      const adminButton = document.getElementById("admin-hamburger-menu");
      if (adminButton && adminButton.contains(event.target)) {
        container.style.display = "none";
        setIsActive(false);
        return;
      } else if (container && !container.contains(event.target) && isActive) {
        container.style.display = "none";
        setIsActive(false);
      } else if (!isActive && button && button.contains(event.target)) {
        setIsActive(true);
        container.style.display = "block";
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  useEffect(() => {
    if (typeof initLetter === "function") {
      setProfileInitial(initLetter());
    }
  }, [token]);
  return (
    <div className="h-screen flex flex-col">
      <Sidebar />
      <Account.Nav openMenu={openAdminMenu} profileInitial={profileInitial} />
      {location.pathname === "/admin" && <Dashbaord />}
      {location.pathname === "/admin/timeline" && <Timeline />}
      {location.pathname.includes("admin/site/models") && (
        <div className="mt-14">
          <TableModels />
        </div>
      )}
      {location.pathname === `/admin/timeline/task/${taskId}` && (
        <TaskStatusPage />
      )}
      {location.pathname ===
        `/admin/timeline/task/${taskId}/taskline/${lineId}` && (
        <div className="mt-14">
          <Tasks />
        </div>
      )}
    </div>
  );
}

export default AdminPage;
