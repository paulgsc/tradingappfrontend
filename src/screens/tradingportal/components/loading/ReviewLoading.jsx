import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import LoadingBtn from "../buttons/LoadingBtn";
import { getActivePropertyData, getUserBalance } from "../hooks/reactQuery";

function ReviewLoading({ children }) {
  const [loading, setLoading] = useState(false);

  const { orderInfo: { orderInput = "" } = {} } = useSelector(
    (state) => state.trade
  );

  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { isLoading: propertyLoading } = getActivePropertyData(orderInput);

  // Second API call

  const { isLoading: userBalanceLoading } = getUserBalance(orderInput, token);

  useEffect(() => {
    setLoading(propertyLoading || userBalanceLoading);
  }, [propertyLoading, userBalanceLoading]);
  if (loading) {
    return <LoadingBtn />;
  }
  return <>{children}</>;
}

export default ReviewLoading;
