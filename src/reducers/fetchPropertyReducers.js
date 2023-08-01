import { createSlice } from "@reduxjs/toolkit";


const fetchPropertyReducers = createSlice({
    name: "propertyData",
    initialState: {},
    reducers: {


    },
});

export const {
    requestPropertyData,
  


} = fetchPropertyReducers.actions;

export default fetchPropertyReducers.reducer;