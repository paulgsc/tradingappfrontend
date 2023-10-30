import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserOrders } from "../hooks/reactQuery";
import { useEffect } from "react";
import FetchNextOrders from "./FetchNextOrders";

function FetchOrders() {
  const [orders, setOrders] = useState([]);
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { data, isLoading, hasNextPage, fetchNextPage } =
    fetchUserOrders(token);
  const handleCellClick = () => {};
  useEffect(() => {
    try {
      const flattenedArray = [].concat(
        ...data.pages.map((page) => page.results)
      );
      setOrders(flattenedArray);
    } catch (error) {
      setOrders([]);
    }
  }, [data]);

  return (
    <FetchNextOrders
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      handleCellClick={handleCellClick}
      isLoading={isLoading}
      token={token}
      orders={orders}
    />
  );
}

export default FetchOrders;
