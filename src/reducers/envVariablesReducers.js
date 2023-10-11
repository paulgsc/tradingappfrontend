import { createSlice } from "@reduxjs/toolkit";

const enfVariablesReducers = createSlice({
  name: "env",
  initialState: { loading: false, envVariables: {}, error: null },
  reducers: {
    requestEnvVariables(state, action) {
      return { ...state, loading: true, error: null, envVariables: {} };
    },
    envVariablesRequestSuccess(state, action) {
      return { ...state, loading: false, envVariables: { ...action.payload } };
    },
    envVariablesRequestFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    selectedRows(state, action) {
      return { ...state, selectedRows: action.payload };
    },
  },
});

export const {
  requestEnvVariables,
  envVariablesRequestSuccess,
  envVariablesRequestFailed,
  selectedRows,
} = enfVariablesReducers.actions;

export default enfVariablesReducers.reducer;
