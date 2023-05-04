import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../reducers/userAuthReducer';
import plaidAuthReducer from '../reducers/plaidAuthReducer';
import stripeAuthReducer from '../reducers/stripeAuthReducer';
import fetchDataReducers from '../reducers/fetchDataReducers';

export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        plaid: plaidAuthReducer,
        stripe: stripeAuthReducer,
        fetchData: fetchDataReducers,
    },
    // devTools: process.env.NODE_ENV !== 'production',    
});