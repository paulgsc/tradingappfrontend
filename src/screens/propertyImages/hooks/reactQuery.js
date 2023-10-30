import { useQuery } from "@tanstack/react-query";
import API from "../../../api/django";

export const useFetchPropertyWithImages = (searchQuery) => {
  const queryKey = [`property-query-${searchQuery}`];

  // Use the useQuery hook to fetch the property data
  const { data, isLoading, isError, refetch } = useQuery(
    queryKey,
    async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await API.get(
          `data/property_images/search?query=${searchQuery}`,
          config
        );

        return response.data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    }
  );

  return {
    propertyWithImages: data,
    isLoading,
    isError,
    refetch,
  };
};

export const fetchRentalPhotos = (token, searchParams) => {
  const { recordId, propertyId } = searchParams || {};
  // Define your fetch function
  const fetchImages = async () => {
    try {
      const path = "rental_photos/images/";
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await API.get(path, {
        params: {
          record_id: recordId,
          property_id: propertyId,
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const queryKey = [
    `rental-photos${
      recordId ? `-recordId-${recordId}` : `-propertyId${propertyId}`
    }`,
  ];

  // Use the useQuery hook to fetch the property data
  const { data, isLoading, isError } = useQuery(queryKey, fetchImages, {
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Disable automatic fetch on mount
    staleTime: Infinity,
    retry: false,
  });

  return {
    data: data,
    isLoading,
    isError,
  };
};
