
import { userLogOut, userLoginFailure, userLoginRequest, userLoginSuccess, userLoginWithGmailRequest, userLoginWithGmailSuccessful, userProtectedView, userRegisterWithGmailSuccessful, userRegistration, userRegistrationFailure, userRegistrationSuccess } from "../../../reducers/userAuthReducer";
import API from '../../../api/django';
import { userLogoutPlaid } from "../../../reducers/plaidAuthReducer";
import { userLogOutClearData } from "../../../reducers/fetchDataReducers";
import { clearTradeInfoOnLogout } from "../../../reducers/tradingReducers";


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
        dispatch(userLoginWithGmailSuccessful({
            userInfo: {
                gmailInfo,
            }
        }))
        const {
            email = "",
            password = "blank",
          } = gmailInfo
          const formdata = {
            username: email,
            password: password,
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

        const password = generatePassword(10);

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
            password: password,
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

export const logout = ()  => (dispatch) => {
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