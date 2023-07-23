
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import API from '../api/django';
import { useDispatch } from 'react-redux';
import { storeBalanceInfo, storeOrderInfo } from '../reducers/tradingReducers';
import { setTradingProperty } from '../reducers/fetchPropertyReducers';




const websocketBaseUrl = import.meta.env.DEV ? "ws://127.0.0.1:8000" :  "wss://tradingapp.up.railway.app" ;

export function createWebSocket(endpoint) {
  return new WebSocket(`${websocketBaseUrl}/${endpoint}`);
}

export const fetchSiteTasksHook = (token) => {
    // Define your query key or URL
    const queryKey = ['site-tasks'];
  
    // Define your fetch function
    const fetchSiteTasks = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await API.get('admin/tasks/', config);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
  
    // Use the useQuery hook to fetch the site tasks
    const { data, isLoading, isError } = useQuery(queryKey, fetchSiteTasks);
  
    return {
      siteTasks: data,
      isLoading,
      isError,
    };
  };
  


export const fetchPropertiesQuery = (token) => {
    // Define your query key or URL
    const queryKey = ['property-data'];
  
    // Define your fetch function
    const fetchProperties = async () => {
      try {
        const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`
          }
      }
      const response = await API.get(
          'data/admin/property_list/',
          config,
      )
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
  
    // Use the useQuery hook to fetch the site tasks
    const { data, isLoading, isError } = useQuery(queryKey, fetchProperties);
  
    return {
      properties: data,
      isLoading,
      isError,
    };
  };

  export const fetchPropertiesByIdQuery = (token, propertyId) => {
    // Define your query key or URL
    const queryKey = ['property-id-data', propertyId];
  
    // Define your fetch function
    const fetchProperties = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await API.get(`data/admin/property_list/${propertyId}`, config);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
  
    // Use the useQuery hook to fetch the property data
    const { data, isLoading, isError } = useQuery(queryKey, fetchProperties);
  
    return {
      property: data,
      isLoading,
      isError,
    };
  };

  export const fetchPropertiesMetaData = (token) => {
    // Define your query key or URL
    const queryKey = ['property-meta-data'];
  
    // Define your fetch function
    const fetchProperties = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await API.get('data/admin/property_metadata/', config);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
  
    // Use the useQuery hook to fetch the property data
    const { data, isLoading, isError } = useQuery(queryKey, fetchProperties);
  
    return {
      property: data,
      isLoading,
      isError,
    };
  };
  

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
    const { data, isLoading, isError } = useQuery(queryKey, fetchUserMetrics);
  
    return {
      property: data,
      isLoading,
      isError,
    };
  };

  
  export const fetchSiteSettings = (token) => {
    // Define your query key or URL
    const queryKey = ['site-settings'];
  
    // Define your fetch function
    const fetchSettings = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await API.get('admin/site-settings/', config);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
  
    // Use the useQuery hook to fetch the property data
    const { data, isLoading, isError } = useQuery(queryKey, fetchSettings);
  
    return {
      settings: data,
      isLoading,
      isError,
    };
  };
  




  
  export const useFetchPropertyWithImages = (searchQuery) => {
    const queryKey = ['property-query'];
  
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
        enabled: true,
      }
    );
  
    return {
      propertyWithImages: data,
      isLoading,
      isError,
      refetch
    };
  };
  


export const fetchActiveProperty =  () => {
  const dispatch = useDispatch()
  const queryKey = ['property-active'];

  // Use the useQuery hook to fetch the property data
  const { data, isLoading, isError } = useQuery(
    queryKey,
    async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          }
        };

        const response = await API.get(
          `data/active_property/`,
          config
        );

        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    },
    {
      onSuccess: (data) => {
        try {
          // Dispatch the action to store the balance data in Redux when data is successfully fetched
          const {
            id = null,
            price_per_share = "",
            available_shares = "",
          } = data;
        
      
            dispatch(
              storeOrderInfo({
                propertyId: id,
                pricePerShare: price_per_share,
                availableShares: available_shares,
              }));
              dispatch(setTradingProperty(data))
      
        
        } catch (error) {
          // Handle the error that occurred during dispatch (if needed)
          console.error('Error dispatching action:', error);
        }
      },
    }
    
  );

  return {
    activeProperty: data,
    isLoading,
    isError,
  
  };
};




export const fetchUserBalance = (token) => {
  const dispatch = useDispatch(); // Import dispatch from react-redux

  // Define your query key or URL
  const queryKey = ['user-balance'];

  // Define your fetch function
  const fetchSettings = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await API.get('users/summary/', config);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  };

  // Use the useQuery hook to fetch the property data with refetchInterval
  const { data, isLoading, isError } = useQuery(queryKey, fetchSettings, {
    refetchInterval: 30000, // Fetch data every 30 seconds
    staleTime: 60000, // Cache data for 30 seconds before refetching
    onSuccess: (data) => {
      try {
        // Dispatch the action to store the balance data in Redux when data is successfully fetched
        dispatch(storeBalanceInfo(data));
      } catch (error) {
        // Handle the error that occurred during dispatch (if needed)
        console.error('Error dispatching action:', error);
      }
    },
  });

  return {
    balance: data,
    isLoading,
    isError,
  };
};


