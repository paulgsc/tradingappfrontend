
import { useQuery } from '@tanstack/react-query';
import API from '../api/django';

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
  