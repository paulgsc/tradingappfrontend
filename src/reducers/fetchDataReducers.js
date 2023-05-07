import { createSlice } from "@reduxjs/toolkit";


const fetchDataReducers = createSlice({
    name: "fetchData",
    initialState: { loading: false, history: [], summary: {}, },
    reducers: {
        userRequestData(state, action){
            return { ...state, loading: true };
        },
        userTransferDataRequestSuccessful(state, action){
            return { ...state, history: [ ...action.payload ], loading: false, };
        },
        userOrdersDataRequestSuccessful(state, action){
            return { ...state, history: [ ...action.payload ], loading: false, };
        },
        userTransactionsDataRequestSuccessful(state, action){
            return { ...state, history: [ ...action.payload ], loading: false, };
        },
        fetchSummaryDataSuccessful(state, action){
            return { ...state, loading: false, summary: { ...action.payload }  };
        },
        userTransfersDataRequestFailure(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        userOrdersDataRequestFailure(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        userTransactionsDataRequestFailure(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        userLogOutClearData(state, action){
            return { state: {} };
        },
    },
});

export const {
    userTransfersDataRequestFailure,
    userOrdersDataRequestFailure,
    userTransferDataRequestSuccessful,
    userOrdersDataRequestSuccessful,
    userTransactionsDataRequestSuccessful,
    userTransactionsDataRequestFailure,
    userRequestData,
    fetchSummaryDataSuccessful,
    userLogOutClearData,
} = fetchDataReducers.actions;

export default fetchDataReducers.reducer;