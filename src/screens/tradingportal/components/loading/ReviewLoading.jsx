import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { fetchSelectedProperty } from "../../../../contexts/redux/actions/tradingActions";
import { fetchUserBalance } from "../../../../contexts/redux/actions/userActions";
import { useState } from "react";
import { useEffect } from "react";
import LoadingBtn from "../buttons/LoadingBtn";

function ReviewLoading({ children }) {
  const [loading, setLoading] = useState(false);

  const { orderInfo: { orderInput = "" } = {} } = useSelector(
    (state) => state.trade
  );

  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const activePropertyQueryKey = ["active-property", orderInput];
  const { isLoading: propertyLoading } = useQuery(
    activePropertyQueryKey,
    fetchSelectedProperty,
    {
      enabled: true,
    }
  );

  // Second API call
  const userBalanceQueryKey = ["user-balance", orderInput];
  const { isLoading: userBalanceLoading } = useQuery(
    userBalanceQueryKey,
    async () => {
      return await fetchUserBalance(token);
    },
    {
      enabled: true,
    }
  );

  useEffect(() => {
    setLoading(propertyLoading || userBalanceLoading);
  }, [propertyLoading, userBalanceLoading]);
  if (loading) {
    return <LoadingBtn />;
  }
  return <>{children}</>;
}

export default ReviewLoading;
