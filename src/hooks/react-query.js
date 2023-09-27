
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import API from '../api/django';





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
  




  
  
  









