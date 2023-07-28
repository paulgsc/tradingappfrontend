import { createSlice } from "@reduxjs/toolkit";


const userActionsReducers = createSlice({
    name: "userActions",
    initialState: { loading: false,  error: null, userOrders: []  },
    reducers: {

    }
});

export const {

} = userActionsReducers.actions;

export default userActionsReducers.reducer;