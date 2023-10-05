import { createSlice } from "@reduxjs/toolkit";

const adminActionsReducers = createSlice({
  name: "adminActions",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    imageActions: { publish: [], overwrite: [], delete: [] },
    tradingActions: { propertyId: null, setToActive: false },
  },
  reducers: {
    adminStartUpdate(state, action) {
      return {
        ...state,
        loading: true,
        successMessage: null,
        error: null,
        ...action.payload,
      };
    },
    adminRequestImageDeletion(state) {
      return { ...state, loading: true, error: null, successMessage: null };
    },
    adminDeleteImagesSuccessful(state, action) {
      return { ...state, loading: false, successMessage: action.payload };
    },
    adminDeleteImagesFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    adminUpdateSettingsSuccess(state, action) {
      return { ...state, loading: false, successMessage: action.payload };
    },
    adminUpdateSettingsFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    adminSetImageIdsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        imageActions: {
          ...state.imageActions,
          publish: [...action.payload.publish],
          overwrite: [...action.payload.overwrite],
        },
      };
    },
    adminSetImageIdsFailed(state, action) {
      return {
        ...state,
        loading: false,
        imageActions: { ...state.imageActions, publish: [], overwrite: [] },
        error: action.payload,
      };
    },
    adminAddDeviceIPAddressSuccess(state, action) {
      return { ...state, loading: false, successMessage: action.payload };
    },
    adminAddDeviceIPAddressFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    adminStageActivePropertySuccess(state, action) {
      return {
        ...state,
        loading: false,
        tradingActions: { ...state.tradingActions, ...action.payload },
      };
    },
    adminStageActivePropertyFailed(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        tradingActions: {
          ...state.tradingActions,
          propertyId: null,
          setToActive: false,
        },
      };
    },
    adminSetActivePropertySuccess(state, action) {
      return { ...state, loading: false, successMessage: action.payload };
    },
    adminSetActivePropertyFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    adminAddSheetsCronJobSuccess(state, action) {
      return { ...state, loading: false, ...action.payload };
    },
    adminAddSheetsCronJobFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    adminEditCronJobSuccess(state, action) {
      return { ...state, loading: false, ...action.payload };
    },
    adminEditCronJobFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    adminStageCronChanges(state, action) {
      return { ...state, editedCronFields: { ...action.payload } };
    },
    adminSelectMetric(state, action) {
      return { ...state, metric: action.payload };
    },
    adminSendNewAdminInviteSuccessful(state, action) {
      return { ...state, loading: false, inviteStatus: action.payload };
    },
    adminSendNewAdminInviteFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    userCreateAdminAccountSuccessful(state, action) {
      return { ...state, loading: false, createAdminResult: action.payload };
    },
    userCreateAdminAccountFailed(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const {
  adminStartUpdate,
  adminUpdateSettingsFailed,
  adminUpdateSettingsSuccess,
  adminRequestImageDeletion,
  adminDeleteImagesFailed,
  adminDeleteImagesSuccessful,
  adminSetImageIdsFailed,
  adminSetImageIdsSuccess,
  adminAddDeviceIPAddressSuccess,
  adminAddDeviceIPAddressFailed,
  adminStageActivePropertySuccess,
  adminStageActivePropertyFailed,
  adminSetActivePropertySuccess,
  adminSetActivePropertyFailed,
  adminAddSheetsCronJobSuccess,
  adminAddSheetsCronJobFailed,
  adminEditCronJobSuccess,
  adminEditCronJobFailed,
  adminStageCronChanges,
  adminSelectMetric,
  adminSendNewAdminInviteFailed,
  adminSendNewAdminInviteSuccessful,
  userCreateAdminAccountFailed,
  userCreateAdminAccountSuccessful,
} = adminActionsReducers.actions;

export default adminActionsReducers.reducer;
