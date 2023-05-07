import { createSlice } from "@reduxjs/toolkit";


const tradingReducers = createSlice({
    name: "trade",
    initialState: { loading: false, orderInfo: { shares: "", amount: "", 
    propertyId: "", transcationType: "", } },
    reducers: {
        startTradeRequest(state, action){
            return { ...state, loading: true };
        },
        storeOrderInfo(state, action){
            return { ...state, orderInfo: { ...state.orderInfo, ...action.payload } };
        },
        tradeRequestSuccessful(state, action){
            return { loading: false, orderInfo: { ...state.orderInfo, ...action.payload } };
        },
        clearOrderInfo(state, action){
            return {  ...state, orderInfo: { ...state.orderInfo, shares: "", amount: "", 
            propertyId: "", transcationType: "", } }
        },
        tradeRequestFailure(state, action){
            return { ...state, loading: false, error: action.payload }
        },
    },
});

export const {
    startTradeRequest,
    tradeRequestSuccessful,
    tradeRequestFailure,
    storeOrderInfo,
    clearOrderInfo,

} = tradingReducers.actions;

export default tradingReducers.reducer;