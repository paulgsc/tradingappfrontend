import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const userAuthentification = createSlice({
  name: "userAuth",
  initialState: {
    adminHash: null,
    access: false,
    smsVerified: false,
    loading: false,
    refreshingSession: false,
    userInfo: { ...userInfoFromStorage },
  },
  reducers: {
    userLoginRoute(state, action) {
      return { ...state, loading: false, ...action.payload };
    },
    userRegistration(state, action) {
      return { ...state, loading: true };
    },
    userRegistrationSuccess(state, action) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...state.userInfo, ...action.payload })
      );
      return {
        access: false,
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    },
    userRegistrationFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    userLoginRequest(state, action) {
      return { ...state, loading: true, error: null };
    },
    userRefreshLoginSession(state, action) {
      return { ...state, refreshingSession: true };
    },
    userLoginSuccess(state, action) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...state.userInfo, ...action.payload })
      );
      return {
        access: false,
        loading: false,
        refreshingSession: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    },
    userStartBroadcastChannel(state, action) {
      return { ...state, broadcasting: true };
    },
    userProcessChannelBroadcast(state, action) {
      return { ...state, broadcasting: false, userInfo: { ...action.payload } };
    },
    userLogOut(state, action) {
      return { access: false, loading: false, userInfo: {} };
    },
    userLoginWithGmailRequest(state, actiion) {
      return { ...state, loading: true, error: null };
    },
    userLoginWithGmailSuccessful(state, action) {
      return {
        access: false,
        userInfo: { ...state.userInfo, ...action.payload },
        loading: false,
      };
    },
    userRegisterWithGmailSuccessful(state, action) {
      return {
        access: false,
        userInfo: { ...state.userInfo, ...action.payload },
        loading: false,
      };
    },
    userVerifyEmailRequest(state, action) {
      return { ...state, loading: true };
    },
    userVerifyEmailSuccessful(state, action) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...state.userInfo, ...action.payload })
      );
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    },
    userLoginFailure(state, action) {
      return { ...state, access: false, loading: false, error: action.payload };
    },
    userProtectedView(state, action) {
      return { ...state, loading: false, access: true };
    },
    adminProtectedView(state, action) {
      return { ...state, loading: false, adminHash: action.payload };
    },
    userSMSVerificationComplete(state, action) {
      return { ...state, loading: false, smsVerified: action.payload };
    },
    userSMSVerificationFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const {
  userLoginRoute,
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
  userVerifyEmailRequest,
  userVerifyEmailSuccessful,
  userStartBroadcastChannel,
  userProcessChannelBroadcast,
  userRefreshLoginSession,
  userSMSVerificationComplete,
  userSMSVerificationFailed,
  userLoginFailure,
  userLogOut,
} = userAuthentification.actions;

export default userAuthentification.reducer;
