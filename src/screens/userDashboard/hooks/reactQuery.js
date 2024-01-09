import { useQuery } from "@tanstack/react-query";
import API from "../../../api/django";

export const fetchUserProfile = (token, profileId) => {
  const fetchProfile = async () => {
    if (!token) throw new Error("Authentication Required!");
    if (typeof profileId !== "number" || !Number.isInteger(profileId)) {
      throw new Error("profileId must be an integer");
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.get(`users/profile/${profileId}/`, config);
    return response.data;
  };
  const queryKey = ["user-profile"];
  const { data, isLoading, isError } = useQuery(queryKey, fetchProfile, {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    data: data,
    isLoading,
    isError,
  };
};

export const fetchUserHolding = (token) => {
  const fetchUserShares = async () => {
    if (!token) throw new Error("Authentication required.");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await API.get(`users/shares/`, config);
    return response.data;
  };

  const queryKey = ["user-shares"];
  const { data, isLoading, isError } = useQuery(queryKey, fetchUserShares, {
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return {
    data: data,
    isLoading,
    isError,
  };
};

export const useFetchCoinbaseActions = (token) => {
  const fetchUserShares = async () => {
    if (!token) throw new Error("Authentication required.");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await API.get(
      `users/coinbase/get/coinbase_actions/`,
      config
    );
    return response.data;
  };

  const queryKey = ["coinbase-scopes"];
  const { data, isLoading, isError } = useQuery(queryKey, fetchUserShares, {
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return {
    data: data,
    isLoading,
    isError,
  };
};
