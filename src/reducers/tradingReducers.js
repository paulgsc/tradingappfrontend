import { createSlice } from "@reduxjs/toolkit";


const tradingReducers = createSlice({
    name: "trade",
    initialState: { loading: false, showSummaryPortal: false, orderInfo: { shares: "", amount: "", 
    propertyId: null, pricePerShare: null, availableShares: null, transactionType: "", validOrder: false, }, balanceInfo: { transferAmountRemaining: "",
    amountPurchased: "" }, userBalance: {}, },
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
            return { ...state, orderInfo: { ...state.orderInfo, ...action.payload, validOrder: true } };
        },
        storeOrderInfoFailed(state, action){
            return { ...state, orderInfo: { ...state.orderInfo, validOrder: false } };
        },
        setTransactionType(state, action){
            return { ...state, orderInfo: { ...state.orderInfo, transactionType: action.payload } };
        },
        storeBalanceInfo(state, action){
            return { ...state, userBalance: { ...action.payload } }
        },
        showSummaryPortal(state, action){
            return { ...state, ...action.payload  };
        },
        tradeRequestSuccessful(state, action){
            return { loading: false, orderInfo: { ...state.orderInfo, ...action.payload } };
        },
        clearOrderInfo(state, action){
            return {  ...state, orderInfo: {  shares: "", amount: "", 
            propertyId: "", transactionType: "", } }
        },
        clearTradeInfoOnLogout(state, action){
            return { loading: false, orderInfo: { shares: "", amount: "", 
            propertyId: "", transactionType: "", }, balanceInfo: { transferAmountRemaining: "",
            amountPurchased: "" } };
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
    showSummaryPortal,
    storeBalanceInfo,
    setTransactionType,
    tradeRequestFailure,
    fetchBalanceInfoFailure,
    storeOrderInfoFailed,
    storeOrderInfo,
    clearOrderInfo,
    clearTradeInfoOnLogout,

} = tradingReducers.actions;

export default tradingReducers.reducer;