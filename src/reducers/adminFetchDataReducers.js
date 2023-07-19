import { createSlice } from "@reduxjs/toolkit";


const adminFetchDataReducers = createSlice({
    name: "adminFetchData",
    initialState: { loading: false, actionSuccess: false,  recordId: localStorage.getItem("selectedPropertyId"), history: [], summary: {}, propertyData: [], sharesData: [], propertyOrders: [], linkedAccounts: [], siteTasks: [], imageUpload: [], uploadState: { previewing: false, uploaded: false, cancel: false, failed: false, posted: false },  imagesSelectedQuery: {}, },
    reducers: {
        adminRequestData(state, action){
            return { ...state, loading: true, actionSuccess: false, updateSuccess: false, itFailed: false, error: null };
        },
        adminFetchPropertyDataSuccess(state, action){
            return { ...state, loading: false, propertyData: [ ...action.payload ] }
        },
        adminFetchPropertyDataFailed(state, action){
            return { ...state, loading: false, error: action.payload }
        },
        adminFetchSiteTasksSuccess(state, action){
            return { ...state, loading: false, siteTasks: [ ...action.payload ] }
        },
        adminFetchSiteTasksFailed(state, action){
            return { ...state, loading: false, error: action.payload }
        },
        adminCreatePropertySuccess(state, action){
            return { ...state, loading: false, ...action.payload, createSuccess: true }
        },
        adminUpdatePropertySuccess(state, action){
            return { ...state, loading: false, ...action.payload, updateSuccess: true }
        },
        addSelectedImagesSuccess(state, action){
            return { ...state, imageUpload: [ ...action.payload  ], uploadState: { ...state.uploadState, previewing: true, uploaded: false, cancel: false } }
        },
        removeSelectedImagesSuccess(state, action){
            return { ...state, actionSuccess: true, imageUpload: [ ...action.payload  ] }
        },
        uploadPreviewedImages(state, action){
            return { ...state, uploadState: { ...state.uploadState, previewing: false, uploaded: true, cancel: false,  } }
        },
        cancelUploadingImages(state, action){
            return { ...state, imageUpload: [ ],  uploadState: { ...state.uploadState, previewing: false, uploaded: false, cancel: true, } }
        },
        adminPostPropertyImagesSuccess(state, action){
            return { ...state, imageUpload: [ ],  uploadState: { ...state.uploadState, previewing: false, uploaded: false, cancel: false, posted: true, } }
        },
        imageUploadActionFailed(state, action){
            return { ...state, loading: false, error: action.payload, uploadState: { ...state.uploadState, failed: true, }}
        },
        adminCreatePropertyFailed(state, action){
            return { ...state, loading: false, error: action.payload, itFailed: true }
        },
        adminUpdatePropertyFailed(state, action){
            return { ...state, loading: false, error: action.payload, itFailed: true }
        },
        adminSelectedRecordId(state, action){
            return { ...state, recordId: action.payload }
        },
        adminSetImagePropertyQuery(state, action){
            return {  ...state, imagesSelectedQuery: { ...action.payload } }
        },
    },
});

export const {
    adminRequestData,
    adminFetchPropertyDataSuccess,
    adminCreatePropertySuccess,
    adminUpdatePropertySuccess,
    adminFetchSiteTasksSuccess,
    addSelectedImagesSuccess,
    removeSelectedImagesSuccess,
    uploadPreviewedImages,
    cancelUploadingImages,
    adminPostPropertyImagesSuccess,
    imageUploadActionFailed,
    adminFetchPropertyDataFailed,
    adminCreatePropertyFailed,
    adminUpdatePropertyFailed,
    adminFetchSiteTasksFailed,
    adminSelectedRecordId,
    adminSetImagePropertyQuery,
} = adminFetchDataReducers.actions;

export default adminFetchDataReducers.reducer;