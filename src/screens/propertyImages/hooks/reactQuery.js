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
              'Content-type': 'application/json',
            }
          };
  
          const response = await API.get(
            `data/property_images/search?query=${searchQuery}`,
            config
          );
  
          return response.data;
        } catch (error) {
          throw new Error('Error fetching data');
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
      refetch
    };
  };

  export const fetchRentalPhotos = (token, searchParams) => {
 
  
    // Define your fetch function
    const fetchUserMetrics = async () => {
      try {
        const path = 'rental_photos/images/'
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await API.get(path,
            {
                params: searchParams,
                ...config,
            },);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };

    // Define your query key or URL
    const { record_id, property_id } = searchParams || {}
    const queryKey = [`rental-photos${record_id ? `-recordId-${record_id}` : `-propertyId${property_id}`}`];
  
    // Use the useQuery hook to fetch the property data
    const { data, isLoading, isError } = useQuery(queryKey, fetchUserMetrics,
            {
                refetchOnWindowFocus: false,
                refetchOnMount: true, // Disable automatic fetch on mount
                staleTime: Infinity,
                retry: false,
            }
        );
  
    return {
      data: data,
      isLoading,
      isError,
    };
  };
