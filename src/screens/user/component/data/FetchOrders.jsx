import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeOrdersInfo } from "../../../../contexts/redux/actions/userActions";
import { useQuery } from "@tanstack/react-query";

function FetchOrders() {
  const dispatch = useDispatch();
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  // Define your query key or URL
  const queryKey = ["user-orders"];

  // Define your fetch function
  const fetchSettings = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await API.get("users/orders/", config);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Use the useQuery hook to fetch the balance data with refetchInterval
  const { data, isLoading, isError } = useQuery(queryKey, fetchSettings, {
    refetchInterval: 30000, // Fetch data every 30 seconds
    staleTime: 60000, // Cache data for 30 seconds before refetching
    onSuccess: (data) => {
      try {
        console.log(data);
        // Dispatch the action to store the balance data in Redux when data is successfully fetched
        dispatch(storeOrdersInfo(data));
      } catch (error) {
        // Handle the error that occurred during dispatch (if needed)
        console.error("Error dispatching action:", error);
      }
    },
  });

  return <></>;
}

export default FetchOrders;
