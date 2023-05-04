import { auth } from '../../../firebase';
import { SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILURE } from '../../../reducers/firebaseReducers';

export const firebaseUserLogin = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_USER_REQUEST
        })

        const provider = new auth.GoogleAuthProvider();
        const response = await auth.signInWithPopup(provider)
        dispatch({
            type: SET_USER_SUCCESS,
            payload: response.user
        })
    } catch(error){
        let payload
        switch (error.code) {
            case 'auth/invalid-email':
              payload = 'Invalid email address';
              break;
            case 'auth/user-disabled':
                payload = 'User account has been disabled';
              break;
            case 'auth/user-not-found':
                payload= 'User not found';
              break;
            case 'auth/wrong-password':
                payload = 'Invalid password';
              break;
            default:
                payload =  error.message;
              break;
          }
        dispatch({
            type: SET_USER_FAILURE,
            payload: payload
        })
    }
}