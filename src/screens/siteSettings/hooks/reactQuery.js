import { useQuery } from "@tanstack/react-query";
import API from "../../../api/django";

export const fetchSiteSettings = (token) => {
  // Define your query key or URL
  const queryKey = ["site-settings"];

  // Define your fetch function
  const fetchSettings = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await API.get("admin/site-settings/", config);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  // Use the useQuery hook to fetch the property data
  const { data, isLoading, isFetching, isError } = useQuery(
    queryKey,
    fetchSettings,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: Infinity,
    }
  );

  return {
    settings: data,
    isLoading,
    isFetching,
    isError,
  };
};
