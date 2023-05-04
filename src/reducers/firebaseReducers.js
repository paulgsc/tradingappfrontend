import { auth } from '../firebase';

export const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const firebaseActionTypes = {
    SET_USER_REQUEST: 'SET_USER_REQUEST',
    SET_USER_SUCCESS: 'SET_USER_SUCCESS',
    SET_USER_FAILURE: 'SET_USER_FAILURE',
};

export const firebaseReducer = (state, action) => {
    switch(action.type){
        case firebaseActionTypes.SET_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case firebaseActionTypes.SET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case firebaseActionTypes.SET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


