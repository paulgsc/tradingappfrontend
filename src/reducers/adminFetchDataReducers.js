import { createSlice } from "@reduxjs/toolkit";


const adminFetchDataReducers = createSlice({
    name: "adminFetchData",
    initialState: { loading: false, recordId: localStorage.getItem("selectedPropertyId"), history: [], summary: {}, propertyData: [], sharesData: [], propertyOrders: [], linkedAccounts: [], },
    reducers: {
        adminRequestData(state, action){
            return { ...state, loading: true };
        },
        adminFetchPropertyDataSuccess(state, action){
            return { ...state, loading: false, propertyData: [ ...action.payload ] }
        },
        adminFetchPropertyDataFailed(state, action){
            return { ...state, loading: false, error: action.payload }
        },
        adminCreatePropertySuccess(state, action){
            return { ...state, loading: false, ...action.payload }
        },
        adminCreatePropertyFailed(state, action){
            return { ...state, loading: false, error: action.payload }
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
    adminFetchPropertyDataFailed,
    adminCreatePropertyFailed,
    adminSelectedRecordId,
} = adminFetchDataReducers.actions;

export default adminFetchDataReducers.reducer;