import { stringify } from "uuid"
import API from "../../../api/django"
import { getCsrfToken } from "../../../lib/utils"
import { adminAddDeviceIPAddressFailed, adminAddDeviceIPAddressSuccess, adminAddSheetsCronJobFailed, adminAddSheetsCronJobSuccess, adminDeleteImagesFailed, adminDeleteImagesSuccessful, adminEditCronJobFailed, adminEditCronJobSuccess, adminRequestImageDeletion,  adminSetActivePropertyFailed,  adminSetActivePropertySuccess,  adminSetImageIdsFailed, adminSetImageIdsSuccess, adminStageActivePropertyFailed, adminStageActivePropertySuccess, adminStartUpdate, adminUpdateSettingsFailed, adminUpdateSettingsSuccess } from "../../../reducers/adminActionsReducers"
import { addSelectedImagesSuccess, adminPostPropertyImagesSuccess, adminRequestData, cancelUploadingImages, imageUploadActionFailed, removeSelectedImagesSuccess } from "../../../reducers/adminFetchDataReducers"


export const previewUploadedFiles = (files) => async (dispatch) => {
    try{
        dispatch(addSelectedImagesSuccess(files))
    }
    catch (error){
dispatch(imageUploadActionFailed(error.message))
    }
} 

export const removePreviewImageFile = (fileName) => async (dispatch, getState) => {
    try{
        dispatch(adminRequestData())
        const { adminFetchData: { imageUpload = [] } = {} } = getState()
        const updatedImages = imageUpload.filter((imageFile) => imageFile.imageName !== fileName) 
        if (updatedImages.length === 0){
            dispatch(cancelUploadingImages());
        }
        dispatch(removeSelectedImagesSuccess(updatedImages))
    }
    catch (error){
dispatch(imageUploadActionFailed(error.message))
    }
} 

export const publishImageFiles = (propertyImageId, replaceImageIds = []) => async (dispatch, getState) => {
    try{

        
        const path ="admin/create-images/";

        const {
            userAuth: { userInfo },
         
        } = getState()

        const retrieveStagedFilesFromSessionStorage = () => {
            const fileDataArray = JSON.parse(sessionStorage.getItem('stagedImageFiles'));
            return fileDataArray || [];
          };
          
          // Usage:
          const stagedImageFiles = [];
          retrieveStagedFilesFromSessionStorage().forEach((fileData) => {
            const byteString = atob(fileData.data.split(",")[1]);
            const mimeString = fileData.type;
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
        
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
        
            const blob = new Blob([ab], { type: mimeString });
            const file = new File([blob], fileData.name, { type: mimeString });
            stagedImageFiles.push(file);
          });
          
          
// Client-side code
const formDataArray = stagedImageFiles.map((file, i) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('property', propertyImageId);
    formData.append('image_title', file.name);
  
    if (replaceImageIds.length > i) {
        console.log(replaceImageIds[i])
      formData.append('id', replaceImageIds[i]);
    }
  
    return formData;
  });
  
  // Now 'formDataArray' will be an array of FormData objects to send to the server
  // Make the API call using 'formDataArray'
  
        
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  
  const responseArray = await Promise.all(
    formDataArray.map((formData) => 
      API.post(path, formData, { headers: { 'Content-Type': 'multipart/form-data', ...config.headers } })
    )
  );
  

        dispatch(adminPostPropertyImagesSuccess())
    }
    catch (error){
dispatch(imageUploadActionFailed(error.message))
    }
} 

export const updateConfigurationsSettings = (formData) => async (dispatch, getState) => {
    try{
        dispatch(adminStartUpdate())
        
        const path ="admin/site-settings/update/";

        const {
            userAuth: { userInfo },
         
        } = getState()

       

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const response = await API.put(
            path,
            formData,
            config,
        )

        dispatch(adminUpdateSettingsSuccess(response.data))
     
    }
    catch (error){
dispatch(adminUpdateSettingsFailed(error.message))

    }
} 

export const deletePropertyImages = (formData) => async (dispatch, getState) => {
    try{
        dispatch(adminRequestImageDeletion())
        
        const path ="admin/delete-images/";


        const {
            userAuth: { userInfo },
         
        } = getState()



        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                'X-CSRFToken': getCsrfToken(),
               
            }
        }

        const response = await API.post(
            path,
            formData,
            config,
        )

        dispatch(adminDeleteImagesSuccessful(response.data))
     
    }
    catch (error){
dispatch(adminDeleteImagesFailed(error.message))

    }
} 

export const stageImageIds = (type, imageIds) => (dispatch, getState) => {
    try{
        dispatch(adminStartUpdate())
        
      

        const {
            adminActions: { imageActions: { publish, overwrite } },
         
        } = getState()

       const payload = () => {
        switch (type) {
            case "uploads":
                return { publish: imageIds, overwrite: overwrite }
            case "published":
                return { publish: publish, overwrite: imageIds }
            default:
                return { publish: publish, overwrite: overwrite }
        }
       }

        dispatch(adminSetImageIdsSuccess(payload()))
     
    }
    catch (error){
dispatch(adminSetImageIdsFailed(error.message))

    }
} 

export const addIPAddress = (ipAddresses) => async (dispatch, getState) => {
    try{
        dispatch(adminStartUpdate())
        
      

        const {
            userAuth: { userInfo: { token = "" } = {} },
         
        } = getState()

        const path ="admin/update-allowed-ips/";
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
          
               
            }
        }

        const formData = {
            allowed_ip_addresses: ipAddresses.split(','),
        }

        const response = await API.put(
            path,
            formData,
            config,
        )


       

        dispatch(adminAddDeviceIPAddressSuccess(response.data))
     
    }
    catch (error){
dispatch(adminAddDeviceIPAddressFailed(error.message))

    }
} 

export const stageNewActivePropertyId = (propertyId) => (dispatch) => {
    try{
        dispatch(adminStartUpdate())
        
        dispatch(adminStageActivePropertySuccess( { propertyId: propertyId, setToActive: true }))
     
    }
    catch (error){
dispatch(adminStageActivePropertyFailed(error.message))

    }
} 


export const setActiveProperty = () => async (dispatch, getState) => {
    try{
        dispatch(adminStartUpdate())
        
        const {
            userAuth: { userInfo: { token = "" } = {} },
            adminActions: { tradingActions: { propertyId } }
         
        } = getState()


        const path =`admin/properties/${propertyId}/update-active/`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-CSRFToken': getCsrfToken(),
            }
        }

        const requestData = {};

        const response = await API.put(
            path,
            requestData, // Pass the request data as the second argument
            { ...config } // Merge the config with the request data using spread operator
        );

        dispatch(adminSetActivePropertySuccess(response.data))
     
    }
    catch (error){
dispatch(adminSetActivePropertyFailed(error.message))

    }
} 

export const addGsheetCronJob = (data) => async (dispatch, getState) => {
    try{
        dispatch(adminStartUpdate())
        
        const {
            userAuth: { userInfo: { token = "" } = {} },
         
        } = getState()

        const path ="admin/add/sheet/cron/";
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`            
            }
        }

        const response = await API.post(
            path,
            data,
            config,
        )
        dispatch(adminAddSheetsCronJobSuccess(response.data))
    }
    catch (error) {
        let errorMsg = "An error occurred"; // Default error message
        if (error.response && error.response.data) {
            if (typeof error.response.data === "object") {
                // If response data is an object, stringify it
                errorMsg = JSON.stringify(error.response.data);
            } else {
                // If response data is not an object, use it as is
                errorMsg = error.response.data;
            }
        } else if (error.message) {
            // If there's an error message, use it
            errorMsg = error.message;
        }
    
        // Dispatch the action with the error message
        dispatch(adminAddSheetsCronJobFailed(errorMsg));
    }
    
} 


export const editCronJob = (data, queryParams, refetch) => async (dispatch, getState) => {
    try{
        dispatch(adminStartUpdate({ updating: data }))
        
        const {
            userAuth: { userInfo: { token = "" } = {} },
         
        } = getState()

        const path ="admin/edit_cron_job/";
        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${token}`            
            },
            params: queryParams,
        }
        const response = await API.post(
            path,
            data,
            config,
        )
        dispatch(adminEditCronJobSuccess(response.data))
        refetch();
    }
    catch (error){
dispatch(adminEditCronJobFailed({
    message: error.message,
    ...data
}))

    }
} 

