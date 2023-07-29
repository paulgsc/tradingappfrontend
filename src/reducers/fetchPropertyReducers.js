import { createSlice } from "@reduxjs/toolkit";


const fetchPropertyReducers = createSlice({
    name: "propertyData",
    initialState: { loading: false, count: "", next: "", previous: "",  propertyInfo: [] },
    reducers: {
        requestPropertyData(state, action){
            return { ...state, loading: true };
        },
        fetchPropertyDataSuccess(state, action){
            return { ...state, loading: false, count: action.payload?.count,
                next: action.payload?.next, previous: action.payload?.previous,
                propertyInfo: [ ...action.payload.results ] };
        },
        fetchProperyDataFailure(state, action){
            return {  ...state, loading: false, error: action.payload }
        },

    },
});

export const {
    requestPropertyData,
    fetchPropertyDataSuccess,
    fetchProperyDataFailure,


} = fetchPropertyReducers.actions;

export default fetchPropertyReducers.reducer;