import { addSelectedImagesSuccess, imageUploadActionFailed, removeSelectedImagesSuccess } from "../../../reducers/adminFetchDataReducers"


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
        const { adminFetchData: { imageUpload = [] } = {} } = getState()
        const updatedImages = imageUpload.filter((imageFile) => imageFile.imageName !== fileName) 
        dispatch(removeSelectedImagesSuccess(updatedImages))
    }
    catch (error){
dispatch(imageUploadActionFailed(error.message))
    }
} 