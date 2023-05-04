import { createSlice } from "@reduxjs/toolkit";


const fetchDataReducers = createSlice({
    name: "fetchData",
    initialState: { loading: false, transfers: [], summary: {}, },
    reducers: {
        userRequestData(state, action){
            return { ...state, loading: true };
        },
        userDataRequestSuccessful(state, action){
            return { ...state, transfers: [ ...action.payload ], loading: false, };
        },
        fetchSummaryDataSuccessful(state, action){
            return { ...state, loading: false, summary: { ...action.payload }  };
        },
        userDataRequestFailure(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        userLogOutClearData(state, action){
            return { state: {} };
        },
    },
});

export const {
    userDataRequestFailure,
    userDataRequestSuccessful,
    userRequestData,
    fetchSummaryDataSuccessful,
    userLogOutClearData,
} = fetchDataReducers.actions;

export default fetchDataReducers.reducer;