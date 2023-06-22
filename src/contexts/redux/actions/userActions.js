
import { adminProtectedView, userLogOut, userLoginFailure, userLoginRequest, userLoginSuccess, userLoginWithGmailRequest, userLoginWithGmailSuccessful, userProtectedView, userRegisterWithGmailSuccessful, userRegistration, userRegistrationFailure, userRegistrationSuccess } from "../../../reducers/userAuthReducer";
import API from '../../../api/django';
import { userLogoutPlaid } from "../../../reducers/plaidAuthReducer";
import { userLogOutClearData } from "../../../reducers/fetchDataReducers";
import { clearTradeInfoOnLogout } from "../../../reducers/tradingReducers";
import { firebaseLogout } from "../../../hooks/firebase-hooks";


function generatePassword(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  

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

export const gmailLogin = (gmailInfo) => async (dispatch) => {
    dispatch(userLoginWithGmailRequest());

    try{

        const {
            email = "",
            uid = "blank",
            displayName = "", metadata = {}, photoURL = "", providerId = "" 
          } = gmailInfo

          dispatch(userLoginWithGmailSuccessful(
      {gmailInfo : {
        email: email,
        uid: uid,
        displayName: displayName,
       
        photoURL: photoURL,
        providerId: providerId,
        ...metadata,
      }}
             ))

          const formdata = {
            username: email,
            password: uid,
          }
  
        
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await API.post(
            'users/gmail_login/',
            formdata,
            config
        );
        // localStorage.setItem('userInfo', JSON.stringify(response.data));
        dispatch(userLoginSuccess(response.data));
 
        
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
          dispatch(userLogOut());
          dispatch(userLoginFailure({
            error: payload,
          }));
 
}}



export const gmailRegister = (gmailInfo) => async (dispatch) => {
    dispatch(userLoginWithGmailRequest());

    try{
        dispatch(userRegisterWithGmailSuccessful({
            userInfo: {
                gmailInfo,
            }
        }))


        const {
            email = "",
            displayName = "",
            uid = "",
            photoURL = "",
          } = gmailInfo
          const formdata = {
            email: email,
            username: email,
            first_name: displayName,
            last_name: displayName,
            photoUrl: photoURL,
            password: uid,
          }
     
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
          dispatch(userLogOut());
          dispatch(userRegistrationFailure({
            error: payload,
          }));
 
}}

export const logout = ()  => async (dispatch, getState)  => {
    const { userAuth: { userInfo: { gmailInfo = "" } = {}  } = {} } = getState()
    firebaseLogout()
    localStorage.removeItem('userInfo');
    localStorage.removeItem('link_token');
    dispatch(userLogoutPlaid());
    dispatch(userLogOutClearData());
    dispatch(clearTradeInfoOnLogout());
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

export const accessAdminView = () => async (dispatch, getState) => {
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
            'admin/access/',
            config,
        )
        dispatch(adminProtectedView(response.data))
      

    }catch (error){
        localStorage.removeItem('userInfo');
        localStorage.removeItem('link_token');
        dispatch(userLoginFailure(error.message));
        return false;
    }
}