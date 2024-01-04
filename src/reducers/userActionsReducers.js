import { createSlice } from "@reduxjs/toolkit";

const userActionsReducers = createSlice({
  name: "userActions",
  initialState: { loading: false },
  reducers: {
    userRequestPDF(state, action) {
      return { loading: true };
    },
    userRequestPDFSuccesful(state, action) {
      return { ...state, loading: false, pdfUrl: action.payload };
    },
    userRequestPDFFailed(state, action) {
      return { ...state, error: action.payload };
    },
  },
});

export const { userRequestPDF, userRequestPDFFailed, userRequestPDFSuccesful } =
  userActionsReducers.actions;

export default userActionsReducers.reducer;
