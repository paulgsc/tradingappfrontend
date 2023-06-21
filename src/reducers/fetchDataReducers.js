import { createSlice } from "@reduxjs/toolkit";


const fetchDataReducers = createSlice({
    name: "fetchData",
    initialState: { loading: false, history: [], summary: {}, propertyData: [], sharesData: [], propertyOrders: [], linkedAccounts: [], notifications: [], },
    reducers: {
        userRequestData(state, action){
            return { ...state, loading: true, ...action.payload };
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
        fetchSharesDataSuccessful(state, action){
            return { ...state, loading: false, sharesData: [ ...action.payload ]  };
        },
        fetchOrdersByProperty(state, action){
            return { ...state, loading: false, propertyOrders: [ ...action.payload ] };
        },
        propertyTradeDataRequestSuccess(state, action){
            return { ...state, loading: false, propertyData: [ ...action.payload ]  };
        },
        fetchUserLinkedAccountsSusccess(state, action){
            return { ...state, loading: false, linkedAccounts: [ ...action.payload ] };
        },
        fetchUserNotificationsSuccess(state, action){
            return { ...state, loading: false, notifications: [ ...action.payload.notifications ], notificationsCount: action.payload.count, loadingNotifications: false };
        },
        fetchUserNotificationsFailed(state, action){
            return { ...state, loading: false, error: action.payload, loadingNotifications: false };
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
        userSummaryDataRequestFailure(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        propertyTradeDataRequestFailed(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        fetchSharesDataFailed(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        fetchOrdersByPropertyFailed(state, action){
            return { ...state, error: action.payload, loading: false }
        },
        fetchUserLinkedAccountsFailed(state, action){
            return { ...state, error: action.payload, loading: false };
        },
        userLogOutClearData(state, action){
            return { loading: false, history: [], summary: {}, propertyData: [], sharesData: [], propertyOrders: [], linkedAccounts: [],  };
        },
    },
});

export const {
    userTransfersDataRequestFailure,
    userOrdersDataRequestFailure,
    userTransferDataRequestSuccessful,
    userOrdersDataRequestSuccessful,
    userTransactionsDataRequestSuccessful,
    propertyTradeDataRequestSuccess,
    fetchUserLinkedAccountsSusccess,
    userTransactionsDataRequestFailure,
    userRequestData,
    fetchSummaryDataSuccessful,
    fetchSharesDataSuccessful,
    fetchOrdersByProperty,
    fetchUserNotificationsSuccess,
    fetchUserNotificationsFailed,
    propertyTradeDataRequestFailed,
    userSummaryDataRequestFailure,
    fetchSharesDataFailed,
    fetchOrdersByPropertyFailed,
    fetchUserLinkedAccountsFailed,
    userLogOutClearData,
} = fetchDataReducers.actions;

export default fetchDataReducers.reducer;