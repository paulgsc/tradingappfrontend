import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : {}


const userAuthentification = createSlice({
  name: "userAuth",
  initialState: { access: false, loading: false, userInfo: { ...userInfoFromStorage } },
  reducers: {
    userRegistration(state, action) {
      return { ...state, loading: true };
    },
    userRegistrationSuccess(state, action) {
      localStorage.setItem('userInfo', JSON.stringify({ ...state.userInfo, ...action.payload }));
      return { access: false, loading: false, userInfo: { ...state.userInfo,  ...action.payload } };
    },
    userRegistrationFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    userLoginRequest(state, action) {
      return { ...state, loading: true};
    },
    userLoginSuccess(state, action) {
      localStorage.setItem('userInfo', JSON.stringify({ ...state.userInfo, ...action.payload }));
      return { access: false, loading: false, userInfo: { ...state.userInfo,  ...action.payload } };
    },
    userLogOut(state, action){
      return {  };
    },
    userLoginWithGmailRequest(state, actiion) {
      return { ...state, loading: true }
    },
    userLoginWithGmailSuccessful(state, action) {
      return { access: false, userInfo: { ...state.userInfo, ...action.payload },  loading: false }
    },
    userRegisterWithGmailSuccessful(state, action) {
      return { access: false, userInfo: { ...state.userInfo, ...action.payload },  loading: false }
    },
    userLoginFailure(state, action) {
      return { ...state, access: false, loading: false, error: action.payload };
    },
    userProtectedView(state, action) {
      return { ...state, loading: false, access: true };
    },
  },
});

export const {
  userRegistration,
  userRegistrationSuccess,
  userRegistrationFailure,
  userLoginRequest,
  userLoginWithGmailRequest,
  userLoginSuccess,
  userProtectedView,
  userLoginWithGmailSuccessful,
  userRegisterWithGmailSuccessful,
  userLoginFailure,
  userLogOut,
} = userAuthentification.actions;

export default userAuthentification.reducer;
