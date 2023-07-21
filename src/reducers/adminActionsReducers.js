import { createSlice } from "@reduxjs/toolkit";


const adminActionsReducers = createSlice({
    name: "adminActions",
    initialState: { loading: false,  error: null, successMessage: null, imageActions: { publish: [], overwrite: [], delete: [] }  },
    reducers: {
      adminStartUpdate(state, action){
        return { ...state, loading: true, successMessage: null, error: null,  }
      },
      adminRequestImageDeletion(state){
        return { ...state, loading: true, error: null, successMessage: null, }
      },
      adminDeleteImagesSuccessful(state, action){
        return { ...state, loading: false, successMessage: action.payload }
      },
      adminDeleteImagesFailed(state, action){
        return { ...state, loading: false, error: action.payload }
      },
      adminUpdateSettingsSuccess(state, action){
        return { ...state, loading: false, successMessage: action.payload  }
      },
      adminUpdateSettingsFailed(state, action){
        return { ...state, loading: false, error: action.payload  }
      },
      adminSetImageIdsSuccess(state, action){
        return { ...state, loading: false, imageActions: { ...state.imageActions, publish: [ ...action.payload.publish ], overwrite: [ ...action.payload.overwrite ] }  }
      },
      adminSetImageIdsFailed(state, action){
        return { ...state, loading: false, imageActions: { ...state.imageActions, publish: [], overwrite: [] }, error: action.payload  }
      },
      adminAddDeviceIPAddressSuccess(state, action){
        return { ...state, loading: false, successMessage: action.payload }
      },
      adminAddDeviceIPAddressFailed(state, action){
        return { ...state, loading: false, error: action.payload }
      },
    }
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
} = adminActionsReducers.actions;

export default adminActionsReducers.reducer;