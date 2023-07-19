import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : {}


const userAuthentification = createSlice({
  name: "userAuth",
  initialState: { adminHash: null, access: false, smsVerified: false, loading: false, refreshingSession: false, userInfo: { ...userInfoFromStorage } },
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
      return { ...state, loading: true, error: null};
    },
    userRefreshLoginSession(state, action){
      return {  ...state, refreshingSession: true }
    },
    userLoginSuccess(state, action) {
      localStorage.setItem('userInfo', JSON.stringify({ ...state.userInfo, ...action.payload }));
      return { access: false, loading: false, refreshingSession: false, userInfo: { ...state.userInfo,  ...action.payload } };
    },
    userLogOut(state, action){
      return { access: false, loading: false, userInfo: {} };
    },
    userLoginWithGmailRequest(state, actiion) {
      return { ...state, loading: true, error: null }
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
    adminProtectedView(state, action){
      return { ...state, loading: false, adminHash: action.payload }
    },
    userSMSVerificationComplete(state, action){
      return { ...state, loading: false, smsVerified: action.payload }
    },
    userSMSVerificationFailed(state, action){
      return { ...state, loading: false, error: action.payload }
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
  adminProtectedView,
  userLoginWithGmailSuccessful,
  userRegisterWithGmailSuccessful,
  userRefreshLoginSession,
  userSMSVerificationComplete,
  userSMSVerificationFailed,
  userLoginFailure,
  userLogOut,
} = userAuthentification.actions;

export default userAuthentification.reducer;
