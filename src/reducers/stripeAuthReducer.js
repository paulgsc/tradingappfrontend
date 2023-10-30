import { createSlice } from "@reduxjs/toolkit";

const stripeAuthentification = createSlice({
  name: "stripe",
  initialState: {
    stripeInfo: {
      url: {
        url: "",
      },
    },
  },
  reducers: {
    stripePymtRequested(state, action) {
      return { ...state, loading: true };
    },
    stripeAuthSuccessful(state, action) {
      return {
        stripeInfo: { ...state.stripeInfo, ...action.payload },
        loading: false,
      };
    },
    stripeAuthFailure(state, action) {
      return { error: { ...action.payload }, loading: false };
    },
  },
});

export const { stripePymtRequested, stripeAuthSuccessful, stripeAuthFailure } =
  stripeAuthentification.actions;

export default stripeAuthentification.reducer;
