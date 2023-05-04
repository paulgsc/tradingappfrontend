import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userLogOut, userLoginFailure, userLoginRequest, userLoginSuccess, userLoginWithGmailRequest, userLoginWithGmailSuccessful, userProtectedView, userRegisterWithGmailSuccessful, userRegistration, userRegistrationFailure, userRegistrationSuccess } from "../../../reducers/userAuthReducer";
import API from '../../../api/django';
import { auth } from '../../../firebase';
import { userLogoutPlaid } from "../../../reducers/plaidAuthReducer";
import { userLogOutClearData } from "../../../reducers/fetchDataReducers";

export const register = (formData) => async (dispatch) => {
    dispatch(userRegistration());
    try {
       const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
       const response = await API.post(
        'users/register/',
        formData,
        config
       );
       dispatch(userRegistrationSuccess(response.data));
    } catch (error){
        dispatch(userRegistrationFailure(error.message));
    };
};

export const login = (formData) => async (dispatch) => {
    try {
        dispatch(userLoginRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        const response = await API.post(
            'users/login/',
            formData,
            config
        );
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        dispatch(userLoginSuccess(response.data));
    } catch (error) {
        dispatch(userLoginFailure(
            
             error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
    };
};

export const gmailLogin = () => async (dispatch) => {
    dispatch(userLoginWithGmailRequest());

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user
    const { uid, email } = user
    const formdata = {
        username: email,
        password: uid,
    }
    dispatch(userLoginWithGmailSuccessful({
        firebaseInfo: user
    }));
    dispatch(login(formdata));

    }).catch((error) => {
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
          dispatch(userLoginFailure({
            error: payload,
          }));
 
})};

export const gmailRegister = (gmailInfo) => async (dispatch) => {
    dispatch(userLoginWithGmailRequest());
    dispatch(userRegisterWithGmailSuccessful({
        userInfo: {
            gmailInfo,
        }
    }))
    try{
        const {
            email = "",
            family_name = "",
            given_name = "",
            name = "",
            picture = "",
          } = gmailInfo
          const formdata = {
            email: email,
            username: email,
            first_name: given_name,
            last_name: family_name,
            photoUrl: picture,
          }
          console.log(formdata);
          dispatch(register(formdata));
    }catch(error)  {
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
          dispatch(userRegistrationFailure({
            error: payload,
          }));
 
}}

export const logout = ()  => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('link_token');
    dispatch(userLogoutPlaid());
    dispatch(userLogOutClearData());
    dispatch(userLogOut());
};


export const accessProtectedView = () => async (dispatch, getState) => {
    dispatch(userLoginRequest());
    try{
        const {
            userAuth: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const response = await API.get(
            'users/access/',
            config,
        )
        dispatch(userProtectedView())
        return true;

    }catch (error){
        localStorage.removeItem('userInfo');
        localStorage.removeItem('link_token');
        dispatch(userLoginFailure(error.message));
        return false;
    }
}