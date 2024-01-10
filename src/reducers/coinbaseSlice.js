import { createSlice } from "@reduxjs/toolkit";

const coinbaseSlice = createSlice({
  name: "coinbase",
  initialState: {
    loading: false,
    data: {},
    actionIds: [],
    requiredScopeIds: [],
    suggestedScopeIds: [],
    error: null,
  },
  reducers: {
    requestExchangeToken: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        data: {},
      };
    },
    requestAccessToken: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        data: {},
      };
    },
    requestExchangeTokenSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    requestAccessTokenSuccess: (state, action) => {
      return { ...state, loading: false, ...action.payload };
    },
    requestExchangeTokenFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestAccessTokenFailed: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userSetCoinbaseOauthScopes(state, action) {
      return { ...state, ...action.payload };
    },
    userAddCoinbaseOuathScopes(state, action) {
      return {
        ...state,
        suggestedScopeIds: [...state.suggestedScopeIds, action.payload],
      };
    },
    userRemoveCoinbaseOuathScopes(state, action) {
      return {
        ...state,
        suggestedScopeIds: [
          ...state.suggestedScopeIds.filter((id) => id !== action.payload),
        ],
      };
    },
  },
});

export const {
  requestExchangeToken,
  requestAccessToken,
  requestExchangeTokenFailed,
  requestAccessTokenFailed,
  requestExchangeTokenSuccess,
  requestAccessTokenSuccess,
  userSetCoinbaseOauthScopes,
  userAddCoinbaseOuathScopes,
  userRemoveCoinbaseOuathScopes,
} = coinbaseSlice.actions;

export default coinbaseSlice.reducer;
