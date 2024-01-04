import { createSlice } from "@reduxjs/toolkit";

const coinbaseSlice = createSlice({
  name: "coinbase",
  initialState: { loading: false, data: {}, error: null },
  reducers: {
    requestExchangeToken: () => {
      return {
        loading: true,
        error: null,
        data: {},
      };
    },
    requestAccessToken: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestExchangeTokenSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
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
  },
});

export const {
  requestExchangeToken,
  requestAccessToken,
  requestExchangeTokenFailed,
  requestAccessTokenFailed,
  requestExchangeTokenSuccess,
  requestAccessTokenSuccess,
} = coinbaseSlice.actions;

export default coinbaseSlice.reducer;
