import { useSelector } from "react-redux";
import API from "../../api/django";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Notification from "../ui/Notification";
import { createWebSocket } from "../../hooks/react-query";

function LiveNotifications() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const fetchNotifications = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 1,
        page_size: 5,
        max_page_size: 6,
      },
    };
    const response = await API.get("users/notifications/", config);

    return response.data.notifications;
  };

  const { data: { pages } = {}, fetchNextPage } = useInfiniteQuery(
    ["notifications"],
    ({ pageParam = 1 }) => fetchNotifications(pageParam, 2, 4),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const unpackPagesData =
    (Array.isArray(pages) &&
      pages.reduce((acc, curr) => acc.concat(curr), [])) ||
    [];

  useEffect(() => {
    const socket = createWebSocket("user-notifications/");

    const onNotificationReceived = () => {
      fetchNextPage();
    };

    socket.addEventListener("open", () => {
      const authMessage = {
        type: "authenticate",
        token: token,
      };
      socket.send(JSON.stringify(authMessage));
    });

    socket.addEventListener("message", onNotificationReceived);

    return () => {
      socket.removeEventListener("message", onNotificationReceived);
      socket.close();
    };
  }, [token, fetchNextPage]);

  return <Notification notifications={unpackPagesData} />;
}

export default LiveNotifications;
