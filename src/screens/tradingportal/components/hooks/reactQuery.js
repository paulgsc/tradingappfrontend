import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import API from "../../../../api/django";

export const getActivePropertyData = () => {
  const fetchSelectedProperty = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await API.get(`data/active_property/`, config);

    return response.data;
  };

  const activePropertyQueryKey = ["active-property"];
  const {
    data,
    isLoading: propertyLoading,
    refetch: propertyRefetch,
  } = useQuery(activePropertyQueryKey, fetchSelectedProperty, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: false,
  });

  return {
    data,
    propertyLoading,
    propertyRefetch,
  };
};

export const getUserBalance = (token) => {
  const fetchUserBalance = async (token) => {
    if (!token) {
      throw new Error("No Authentication provided");
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.get("users/summary/", config);
    return response.data;
  };

  const userBalanceQueryKey = ["user-balance"];
  const { data = {}, isLoading: userBalanceLoading } = useQuery(
    userBalanceQueryKey,
    async () => {
      return await fetchUserBalance(token);
    },
    {
      refetchOnWindowFocus: false, // Disable fetch on tab switch
      refetchOnMount: false, // Fetch on initial mount
      refetchOnReconnect: false,
      staleTime: Infinity,
      retry: false,
      enabled: !!token,
    }
  );
  return {
    data: data,
    isLoading: userBalanceLoading,
  };
};

export const fetchOrderById = async (token, orderId) => {
  if (!token) {
    throw new Error("No Authentication provided");
  }
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get(`users/orders/order/${orderId}`, config);
  return response.data;
};

export const fetchUserOrders = (token, page = 1) => {
  const fetchOrders = async (pageParam) => {
    if (!token) throw new Error("Authentication Required");
    if (!pageParam) throw new Error("Invalid page");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await API.get(
      `users/orders/history?page=${pageParam}&page_size=10`,
      config
    );
    return response.data;
  };

  const queryKey = ["user-orders"];
  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = page }) => fetchOrders(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage?.next;
        return nextUrl
          ? new URL(nextUrl).searchParams.get("page") || null
          : null;
      },

      pageSize: 10,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
  };
};
