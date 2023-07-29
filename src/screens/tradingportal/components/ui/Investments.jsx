import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserBalance } from "../../../../contexts/redux/actions/userActions";
import currency from "currency.js";

function Investments() {
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const queryKey = ["user-balance"];
  const {
    data: {
      transfer_remaining = 0,
      amount_purchased = 0,
      transfers_total = 0,
    } = {},
    isLoading,
    isError,
    refetch,
  } = useQuery(
    queryKey,
    async () => {
      return await fetchUserBalance(token);
    },
    {
      enabled: !!token,
    }
  );
  const queryClient = useQueryClient();

  const clearCache = () => {
    queryClient.invalidateQueries("user-balance");
    queryClient.clear();
  };

  useEffect(() => {
    clearCache();

    refetch();
  }, [token]);
  return (
    <div className="flex flex-col flex-1 justify-start items-center  p-1">
      <div className="p-10 h-12 w-12 rounded-full flex flex-col items-center justify-center  border">
        <h1>{currency(transfers_total).format()}</h1>
      </div>
      <div className="grid grid-cols-2 w-11/12 p-2 space-y-2">
        <h3>Total Investment value</h3>
        <span className="text-end">{currency(transfers_total).format()}</span>
        <span>Property Holdings</span>
        <span className="text-end">{currency(amount_purchased).format()}</span>
        <span>Cash</span>
        <span className="text-end">
          {currency(transfer_remaining).format()}
        </span>
      </div>
    </div>
  );
}

export default Investments;
