import { useQuery } from "@tanstack/react-query";
import { fetchSelectedProperty } from "../../../../contexts/redux/actions/tradingActions";
import { fetchUserBalance } from "../../../../contexts/redux/actions/userActions";


export const getActivePropertyData = (orderInput = null) => {
    const activePropertyQueryKey = orderInput ?  ["active-property", orderInput] : ["active-property"];
    const { data = {}, isLoading: propertyLoading, refetch: propertyRefetch, } = useQuery(
    activePropertyQueryKey,
    fetchSelectedProperty,
    {
        refetchOnWindowFocus: false, // Disable fetch on tab switch
        refetchOnMount: true, // Fetch on initial mount
    }
    );
return {
    data: data,
    isLoading: propertyLoading,
    refetch: propertyRefetch,
}
}

export const getUserBalance = (orderInput = null, token) => {
    const userBalanceQueryKey = orderInput ? ["user-balance", orderInput] : ["user-balance"];
    const { data = {}, isLoading: userBalanceLoading, } = useQuery(
      userBalanceQueryKey,
      async () => {
        return await fetchUserBalance(token);
      },
      {
        refetchOnWindowFocus: false, // Disable fetch on tab switch
        refetchOnMount: true, // Fetch on initial mount
      }
    );
    return {
        data: data,
        isLoading: userBalanceLoading,
    }
}