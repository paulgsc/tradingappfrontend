import { useQuery } from "@tanstack/react-query";
import API from "../../../api/django";

export const fetchUserMetrics = (token) => {
    // Define your query key or URL
    const queryKey = ['user-metrics'];
  
    // Define your fetch function
    const fetchUserMetrics = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await API.get('admin/user_metrics/', config);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
  
    // Use the useQuery hook to fetch the property data
    const { data, isLoading, isError } = useQuery(queryKey, fetchUserMetrics,
            {
                refetchOnWindowFocus: false,
                refetchOnMount: true, // Disable automatic fetch on mount
                staleTime: Infinity,
                retry: 3,
            }
        );
  
    return {
      data: data,
      isLoading,
      isError,
    };
  };
