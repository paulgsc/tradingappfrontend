import { createSlice } from "@reduxjs/toolkit";


const tradingReducers = createSlice({
    name: "trade",
    initialState: { loading: false, orderInfo: { shares: "", amount: "", 
    propertyId: "", transcationType: "", }, balanceInfo: { transferAmountRemaining: "",
    amountPurchased: "" } },
    reducers: {
        startTradeRequest(state, action){
            return { ...state, loading: true };
        },
        requestBalanceInfo(state, action){
            return { ...state, loading: true };
        },
        fetchBalanceInfoSuccessful(state, action){
            return { ...state, loading: false,  ...action.payload };
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
        clearTradeInfoOnLogout(state, action){
            return { state: {} };
        },
        fetchBalanceInfoFailure(state, action){
            return { ...state, loading: false, error: action.payload, balanceInfo: {} }
        },
        tradeRequestFailure(state, action){
            return { ...state, loading: false, error: action.payload }
        },
    },
});

export const {
    startTradeRequest,
    requestBalanceInfo,
    fetchBalanceInfoSuccessful,
    tradeRequestSuccessful,
    tradeRequestFailure,
    fetchBalanceInfoFailure,
    storeOrderInfo,
    clearOrderInfo,
    clearTradeInfoOnLogout,

} = tradingReducers.actions;

export default tradingReducers.reducer;