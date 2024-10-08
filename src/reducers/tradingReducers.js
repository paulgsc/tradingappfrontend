import { createSlice } from "@reduxjs/toolkit";

const tradingReducers = createSlice({
  name: "trade",
  initialState: {},
  reducers: {
    startTradeRequest(state) {
      const newState = { ...state, loading: true };

      // Remove the error property if it exists
      if (newState?.error) {
        delete newState.error;
      }

      return newState;
    },
    requestBalanceInfo(state) {
      return { ...state, loading: true };
    },
    fetchBalanceInfoSuccessful(state, action) {
      return { ...state, loading: false, ...action.payload };
    },
    storeOrderInfo(state, action) {
      return {
        ...state,
        orderInfo: { ...state.orderInfo, ...action.payload, validOrder: true },
      };
    },
    storeOrderInfoFailed(state) {
      return { ...state, orderInfo: { ...state.orderInfo, validOrder: false } };
    },
    setTransactionType(state, action) {
      return {
        ...state,
        orderInfo: { ...state.orderInfo, transactionType: action.payload },
      };
    },
    storeBalanceInfo(state, action) {
      return { ...state, userBalance: { ...action.payload } };
    },
    showSummaryPortal(state, action) {
      return { ...state, error: undefined, ...action.payload };
    },
    validateOrder(state, action) {
      return {
        ...state,
        orderValidation: { ...state.orderValidation, ...action.payload },
      };
    },
    validateOrderError(state) {
      return { ...state, orderValidation: {} };
    },
    tradeRequestSuccessful(state, action) {
      return {
        loading: false,
        tradeComplete: true,
        orderInfo: { ...state.orderInfo, ...action.payload },
      };
    },

    clearOrderInfo(state, action) {
      return { ...state, orderInfo: { shares: 0, amount: 0 } };
    },
    clearTradeInfoOnLogout(state, action) {
      return {
        loading: false,
        orderInfo: {
          shares: "",
          amount: "",
          propertyId: "",
          transactionType: "",
        },
      };
    },
    fetchBalanceInfoFailure(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        balanceInfo: {},
      };
    },
    tradeRequestFailure(state, action) {
      return {
        ...state,
        tradeComplete: false,
        loading: false,
        error: action.payload,
      };
    },
    showCalloutAlert(state, action) {
      return { ...state, callouts: { ...state.callouts, ...action.payload } };
    },
    resetTradingState(state, action) {
      return {};
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
  showCalloutAlert,
  setTransactionType,
  tradeRequestFailure,
  validateOrder,
  validateOrderError,
  fetchBalanceInfoFailure,
  storeOrderInfoFailed,
  storeOrderInfo,
  clearOrderInfo,
  clearTradeInfoOnLogout,
  resetTradingState,
} = tradingReducers.actions;

export default tradingReducers.reducer;
