import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../reducers/userAuthReducer';
import plaidAuthReducer from '../reducers/plaidAuthReducer';
import stripeAuthReducer from '../reducers/stripeAuthReducer';
import fetchDataReducers from '../reducers/fetchDataReducers';
import fetchPropertyReducers from '../reducers/fetchPropertyReducers';
import tradingReducers from '../reducers/tradingReducers';
import firebaseReducer from '../reducers/firebaseReducer';
import adminFetchDataReducers from '../reducers/adminFetchDataReducers';
import adminActionsReducers from '../reducers/adminActionsReducers';
import envVariablesReducers from '../reducers/envVariablesReducers';
import userActionsReducers from '../reducers/userActionsReducers';

export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        plaid: plaidAuthReducer,
        stripe: stripeAuthReducer,
        fetchData: fetchDataReducers,
        propertyData: fetchPropertyReducers,
        trade: tradingReducers,
        firebase: firebaseReducer,
        adminFetchData: adminFetchDataReducers,
        adminActions: adminActionsReducers,
        env: envVariablesReducers,
        userActions: userActionsReducers,

    },
    devTools: process.env.NODE_ENV !== 'production',    
});