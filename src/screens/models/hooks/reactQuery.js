import { useQuery } from "@tanstack/react-query";
import API from "../../../api/django";


export const getSheetsMetadata = (token, url) => {


    const fetchSheetsMetadata = async () => {
          const config = {
            headers: {
              "Content-type": "application/json",
            //   Authorization: `Bearer ${token}`,
            },
          };
          const data = {
            url: url,
          };
          const response = await API.post(
            "admin/google-api/sheets/create-pickle/",
            data,
            config
          );
            
          const formattedData = response?.data?.sheets.map((sheetObj) => {
            const {
              properties: {
                sheetId = null,
                title = "",
                index = null,
                sheetType = null,
                gridProperties = null,
              },
            } = sheetObj;
            return {
              sheetId: sheetId,
              title: title,
              index: index,
              sheetType: sheetType,
              gridProperties: gridProperties,
            };
          });
      
          return formattedData;
       
      };
      

    const sheetsQueryKey = ["sheets-metadata"];
    const { data = [], isLoading: sheetsMetaLoading, refetch: sheetsMetaRefetch, error } = useQuery(
    sheetsQueryKey,
    fetchSheetsMetadata,
    {
      enabled: false
    }
    );
return {
    data: data,
    isLoading: sheetsMetaLoading,
    refetch: sheetsMetaRefetch,
    error: error,
}
}

export const validateSheetRange = (token, url, range) => {



    const fetchSheetsValidRange = async () => {
          const config = {
            headers: {
              "Content-type": "application/json",
            //   Authorization: `Bearer ${token}`,
            },
          };
          const data = {
            url: url,
            range: range,
          };
          const response = await API.post(
            "admin/google-api/sheets/validate_range/",
            data,
            config
          );

          return response.data
            
    }
      

    const sheetsQueryKey = ["sheets-validrange"];
    const { data = [], isLoading: sheetsValidRangeLoading, refetch: sheetsValidRangeRefetch, error } = useQuery(
    sheetsQueryKey,
    fetchSheetsValidRange,
    {
      enabled: false
    }
    );
return {
    data: data,
    isLoading: sheetsValidRangeLoading,
    refetch: sheetsValidRangeRefetch,
    error: error,
}
}

export const getModelsMetadata = (token, queryParams) => {

    const fetchSheetsMetadata = async () => {
          const config = {
            headers: {
              "Content-type": "application/json", 
            //   Authorization: `Bearer ${token}`,
            },
          };

          const response = await API.get(
            "data/admin/property_meta/",
            {
              params: queryParams,
              ...config,
            }
          );
          return response.data;
       
      };
      
    const { model } = queryParams
    const sheetsQueryKey = ["models-metadata", model];
    const { data = [], isLoading: modelsMetadataLoading, refetch: modelsMetadataRefetch, isFetching } = useQuery(
    sheetsQueryKey,
    fetchSheetsMetadata,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true, // Disable automatic fetch on mount
      staleTime: Infinity,
      retry: 3,
    }
    );


return {
    data: data,
    isLoading: modelsMetadataLoading,
    isFetching: isFetching,
    refetch: modelsMetadataRefetch,
}
}

export const getModelsList = (token) => {

    const fetchModelsListdata = async () => {
          const config = {
            headers: {
              "Content-type": "application/json", 
            //   Authorization: `Bearer ${token}`,
            },
          };

          const response = await API.get(
            "/admin/models-list/",
            config
          );
          return response.data;
       
      };
      

    const sheetsQueryKey = ["models-list"];
    const { data = [], isLoading: modelsListLoading, refetch: modelsListRefetch, isFetching } = useQuery(
    sheetsQueryKey,
    fetchModelsListdata,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true, // Disable automatic fetch on mount
      staleTime: Infinity,
      retry: 3,
    }
    );



return {
    data: data,
    isLoading: modelsListLoading,
    isFetching: isFetching,
    refetch: modelsListRefetch,
}
}


export const getCeleryIntervals = (token) => {

  const fetchCeleryData = async () => {
        const config = {
          headers: {
            "Content-type": "application/json", 
          //   Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get(
          "admin/celery/schedules/",
          config
        );
        return response.data;
     
    };
    

  const sheetsQueryKey = ["celery-intervals"];
  const { data = [], isLoading: celeryIntervalsLoading, refetch: celeryIntervalsRefetch, isFetching } = useQuery(
  sheetsQueryKey,
  fetchCeleryData,
  {
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Disable automatic fetch on mount
    staleTime: Infinity,
    retry: 3,
  }
  );



return {
  data: data,
  isLoading: celeryIntervalsLoading,
  isFetching: isFetching,
  refetch: celeryIntervalsRefetch,
}
}
export const getScheduledCronActions = (token, queryParams) => {

  const fetchCronActions = async () => {
        const config = {
          headers: {
            "Content-type": "application/json", 
          //   Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get(
          "admin/admin-cron-actions/schedules/",
          {
            params: queryParams,
            ...config,
          },
        
        );
        return response.data;
     
    };
    
  const { model_name } = queryParams
  const sheetsQueryKey = ["cron-schedules", model_name];
  const { data = [], isLoading: cronActionsLoading, refetch: cronActionsRefetch, isFetching } = useQuery(
  sheetsQueryKey,
  fetchCronActions,
  {
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Disable automatic fetch on mount
    staleTime: Infinity,
    retry: 3,
  }
  );



return {
  data: data,
  isLoading: cronActionsLoading,
  isFetching: isFetching,
  refetch: cronActionsRefetch,
}
}

export const getActionTrace = (token, queryParams = {}) => {

  const fetchActionExecutionHistory = async () => {
        const config = {
          headers: {
            "Content-type": "application/json", 
          //   Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get(
          `admin/cron-actions/history/`,
          {
            params: queryParams,
            ...config,
          },
        );
        return response.data;
     
    };
    
  const { jobId, model_name } = queryParams || {}
  const sheetsQueryKey = ["cron-action-history", jobId, model_name];
  const { data = [], isLoading: cronActionsTraceLoading, refetch: cronActionsTraceRefetch, isFetching} = useQuery(
  sheetsQueryKey,
  fetchActionExecutionHistory,
  {
    
      refetchOnWindowFocus: false,
      refetchOnMount: !!jobId, // Disable automatic fetch on mount
      staleTime: Infinity,
      retry: jobId ? 3 : false,
      
  }
  );


return {
  data: data,
  isLoading: cronActionsTraceLoading,
  isFetching: isFetching,
  refetch: cronActionsTraceRefetch,
}
}

export const getSheetsPreview = (token, queryParams) => {

  const fetchSheetsDataRangePreview = async () => {
        const config = {
          headers: {
            "Content-type": "application/json", 
          //   Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get(
          `admin/sheets/preview/`,
          {
            params: queryParams,
            ...config
          }
        );
        return response.data;
     
    };
    
  const sheetsQueryKey = ["data-range-preview"];
  const { data = [], isLoading: dataRangePreviewLoading, refetch: dataRangePreviewRefetch, isFetching } = useQuery(
  sheetsQueryKey,
  fetchSheetsDataRangePreview,
  {
      refetchOnWindowFocus: false,
      refetchOnMount: true, // Disable automatic fetch on mount
      staleTime: Infinity,
      retry: 3,
  }
  );


return {
  data: data,
  isLoading: dataRangePreviewLoading,
  isFetching: isFetching,
  refetch: dataRangePreviewRefetch,
}
}

export const getCronActionById = (token, queryParams) => {

  const fetchCronAction = async () => {
        const config = {
          headers: {
            "Content-type": "application/json", 
          //   Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get(
          `admin/get_cron_job/`,
          {
            params: queryParams,
            ...config
          }
        );
        return response.data;
     
    };


    const { job_id } = queryParams;
    
  const sheetsQueryKey = ["cron-job", job_id];
  const { data = [], isLoading: cronJobLoading, refetch: cronJobRefetch, isFetching } = useQuery(
  sheetsQueryKey,
  fetchCronAction,
  {
      refetchOnWindowFocus: false,
      refetchOnMount: true, // Disable automatic fetch on mount
      staleTime: Infinity,
      retry: 3,
  }
  );

return {
  data: data,
  isLoading: cronJobLoading,
  isFetching: isFetching,
  refetch: cronJobRefetch,
}
}

export const getModelData = (token, model,  queryParams) => {

  const fetchModelData = async () => {
        const config = {
          headers: {
            "Content-type": "application/json", 
          //   Authorization: `Bearer ${token}`,
          },
        };

        const response = await API.get(
          `model-data/get/${model}/data/`,
          {
            params: queryParams,
            ...config
          }
        );
        return response.data;
     
    };


    
  const sheetsQueryKey = [`${model}-data`];
  const { data = [], isLoading: modelsMetadataLoading, refetch: modelsMetadataLoadingRefetch, isFetching } = useQuery(
  sheetsQueryKey,
  fetchModelData,
  {
    enabled: false,
    retry: false,
    refetchOnMount: true,
  }
  );

return {
  data: data,
  isLoading: modelsMetadataLoading,
  isFetching: isFetching,
  refetch: modelsMetadataLoadingRefetch,
}
}
