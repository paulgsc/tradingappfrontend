import { createSlice } from "@reduxjs/toolkit";


const userActionsReducers = createSlice({
    name: "userActions",
    initialState: { loading: false,  error: null, userOrders: []  },
    reducers: {
        setUserOrdersSuccess(state, action){
            return { ...state, userOrders: [ ...action.payload ] }
        },
        setUserOrdersFailed(state, action){
            return { ...state, setOrdersError: action.payload }
        },
    }
});

export const {
   setUserOrdersSuccess,
   setOrdersError,
} = userActionsReducers.actions;

export default userActionsReducers.reducer;