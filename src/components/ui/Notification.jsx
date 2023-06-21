import React from "react";
import { useEffect } from "react";
import { RiNotification3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsForUser } from "../../contexts/redux/actions/fetchDataActions";
import Dropdown from "./Dropdown";
import Table from "../tables/Table";
import { useState } from "react";

function Notification() {
  const dispatch = useDispatch();
  const {
    loading,
    loadingNotifications = false,
    notificationsCount = 0,
    notifications = [],
  } = useSelector((state) => state.fetchData);
  const [stack, setStack] = useState(notifications);
  const [isFetchingAll, setIsFetchingAll] = useState(false);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (
      scrollTop + clientHeight === scrollHeight &&
      !loading &&
      !loadingNotifications &&
      !isFetchingAll
    ) {
      dispatch(loadMoreNotifications());
    }
  };

  const loadMoreNotifications = () => async (dispatch, getState) => {
    const pageSize = 4;
    try {
      await dispatch(
        fetchNotificationsForUser(
          Math.ceil(stack.length / pageSize) + 1,
          pageSize
        )
      );

      const { notifications } = getState().fetchData;

      // Append new notifications to the stack
      setStack((prevStack) => [...prevStack, ...notifications]);
      // Check if all notifications have been fetched
      if (stack.length + notifications.length === notificationsCount) {
        setIsFetchingAll(true);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleRecordClick = () => {};
  useEffect(() => {
    dispatch(fetchNotificationsForUser());
  }, [dispatch]);

  useEffect(() => {
    stack.length === 0 && setStack(notifications);
  }, [notifications]);

  return (
    <div>
      <Dropdown
        icon={<Notification.Icon />}
        menu={
          <Notification.Table
            notifications={stack}
            handleRecordClick={handleRecordClick}
            handleScroll={handleScroll}
          />
        }
      />
    </div>
  );
}

Notification.Icon = () => (
  <div className="relative">
    <span className=" bg-[red] absolute inline-flex rounded-full h-[6px] lg:h-2 w-[6px] lg:w-2 right-0 -top-1" />
    <RiNotification3Line className="w-4 h-4 lg:w-6 lg:h-6 text-[#5AFF7A]" />
  </div>
);

Notification.Table = ({ notifications, handleScroll, handleRecordClick }) => {
  const columns = [
    {
      Header: "Notifications",
      accessor: "message",
      Cell: ({ row }) => <Notification.Item notification={row} />,
    },
  ];
  const updatedColumns = columns.map((column) => ({
    ...column,
    Cell: ({ row }) => (
      <div
        className=" cursor-pointer hover:text-emerald-500"
        onClick={(e) => handleRecordClick(e, row.original.id)}
      >
        {row.original[column.accessor] || ""}
      </div>
    ),
  }));

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "flex flex-col w-96 h-96";
      case "tbody":
        return " justify-center  overflow-y-auto";
      case "header-row":
        return "flex items-center justify-center w-full shadow-md border-b border-slate-50 bg-slate-800 text-white font-bold";
      case "header":
        return "flex w-11/12 py-2 text-base xl:text-lg text-slate-400 ";
      case "row":
        return "flex justify-center w-full border-b border-gray-400  ";
      case "cell":
        return "flex flex-col w-11/12 ";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col justify-center ">
      <Table
        history={notifications}
        columnData={columns}
        getClassName={getClassName}
        ColumnFilter={ColumnFilter}
        handleScroll={handleScroll}
      />
    </div>
  );
};

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full px-2 py-1 text-sm rounded-md bg-gray-100 border-gray-300"
      placeholder={`Filter ${column.Header}`}
    />
  );
};

Notification.Item = ({ notification }) => {
  // Customize the rendering of the notification item based on the notification data
  console.log(notification);
  return (
    <>
      <p>ID: {notification.original.id}</p>
      <p>Message: {notification.original.message}</p>
      <p>Status: {notification.original.status}</p>
      <p>Notification Type: {notification.original.notification_type}</p>
      <p>User: {notification.original.user}</p>
      <p>Content Type: {notification.original.content_type}</p>
      <p>Created At: {notification.original.created_at}</p>
    </>
  );
};

Notification.Footer = () => {
  return (
    <div className="p-4 bg-gray-200 flex justify-center items-center">
      <span>end of notifications!</span>
    </div>
  );
};

export default Notification;
