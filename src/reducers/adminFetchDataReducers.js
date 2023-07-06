import { createSlice } from "@reduxjs/toolkit";


const adminFetchDataReducers = createSlice({
    name: "adminFetchData",
    initialState: { loading: false,  recordId: localStorage.getItem("selectedPropertyId"), history: [], summary: {}, propertyData: [], sharesData: [], propertyOrders: [], linkedAccounts: [], siteTasks: [], imageUpload: [], },
    reducers: {
        adminRequestData(state, action){
            return { ...state, loading: true, updateSuccess: false, itFailed: false };
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
            return { ...state, imageUpload: [ ...action.payload  ] }
        },
        removeSelectedImagesSuccess(state, action){
            return { ...state, imageUpload: [ ...action.payload  ] }
        },
        imageUploadActionFailed(state, action){
            return { ...state, loading: false, error: action.payload}
        },
        adminCreatePropertyFailed(state, action){
            return { ...state, loading: false, error: action.payload, itFailed: true }
        },
        adminUpdatePropertyFailed(state, action){
            return { ...state, loading: false, error: action.payload, itFailed: true }
        },
        adminSelectedRecordId(state, action){
            return { ...state, recordId: action.payload }
        }
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
    imageUploadActionFailed,
    adminFetchPropertyDataFailed,
    adminCreatePropertyFailed,
    adminUpdatePropertyFailed,
    adminFetchSiteTasksFailed,
    adminSelectedRecordId,
} = adminFetchDataReducers.actions;

export default adminFetchDataReducers.reducer;