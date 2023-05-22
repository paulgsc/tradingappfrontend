import { createSlice } from "@reduxjs/toolkit";


const firebaseReducer = createSlice({
    name: 'firebase',
    initialState: { loading: false, firebaseInfo: {} },
    reducers: {
        requestFirebaseStorage(state, action){
            return { ...state, loading: true  };
        },
        firebaseStorageRequestSuccess(state, action){
            return { ...state, loading: false, firebaseInfo: { ...action.payload } };
        },
        firebaseStorageRequestFailed(state, action){
            return { ...state, loading: false, error: action.payload };
        },
    },
})

export const {
    requestFirebaseStorage,
    firebaseStorageRequestSuccess,
    firebaseStorageRequestFailed,
} = firebaseReducer.actions;

export default firebaseReducer.reducer;