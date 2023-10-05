import {
  adminProtectedView,
  userLogOut,
  userLoginFailure,
  userLoginRequest,
  userLoginRoute,
  userLoginSuccess,
  userLoginWithGmailRequest,
  userLoginWithGmailSuccessful,
  userProtectedView,
  userRegisterWithGmailSuccessful,
  userRegistration,
  userRegistrationFailure,
  userRegistrationSuccess,
  userVerifyEmailRequest,
  userVerifyEmailSuccessful,
} from "../../../reducers/userAuthReducer";
import API from "../../../api/django";
import { userLogoutPlaid } from "../../../reducers/plaidAuthReducer";
import { userLogOutClearData } from "../../../reducers/fetchDataReducers";
import { clearTradeInfoOnLogout } from "../../../reducers/tradingReducers";
import { firebaseLogout } from "../../../hooks/firebase-hooks";
import jwtDecode from "jwt-decode";

export const setLoginRoute = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await API.get("users/login_route/", {
      params: {
        email: email,
      },
      ...config,
    });

    dispatch(userLoginRoute(response.data));
  } catch (error) {
    console.log(error);
  }
};

const get_user_password = async (email) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await API.post(
    "users/user_key/",
    {
      email: email,
    },
    config
  );
  return response.data.key;
};

export const register = (formData) => async (dispatch) => {
  dispatch(userRegistration());
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await API.post("users/register/", formData, config);

    const { data: { token = null, email } = {} } = response;
    await dispatch(userRegistrationSuccess(response.data));

    const { redirect = "/", requiresOtp } = formData;

    if (requiresOtp) {
      await createOTPForNewUser(token, email);
      await sendOTPForNewUser(token, redirect, email);
    }
  } catch (error) {
    await dispatch(broadcastLogout());
    dispatch(userRegistrationFailure(error.message));
  }
};

const sendOTP = async (token, redirect) => {
  const decodedToken = jwtDecode(token);

  const formdata = {
    session_id: decodedToken?.session_id,
    redirect: redirect,
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await API.post("emails/send_otp/", formdata, config);
    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error sending OTP:", error);
    throw error;
  }
};

const sendOTPForNewUser = async (token, redirect, email) => {
  const decodedToken = jwtDecode(token);

  const formdata = {
    session_id: decodedToken?.session_id,
    redirect: redirect,
    email: email,
  };

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await API.post(
      "emails/new_user_send_otp/",
      formdata,
      config
    );
    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error sending OTP:", error);
    throw error;
  }
};

const createOTP = async (token) => {
  const decodedToken = jwtDecode(token);

  const formdata = {
    session_id: decodedToken?.session_id,
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await API.post("redis/create_otp/", formdata, config);
    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error sending OTP:", error);
    throw error;
  }
};

const createOTPForNewUser = async (token, email) => {
  const decodedToken = jwtDecode(token);

  const formdata = {
    session_id: decodedToken?.session_id,
    email: email,
  };

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await API.post(
      "redis/new_user_create_otp/",
      formdata,
      config
    );
    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const login = (formData) => async (dispatch, getState) => {
  try {
    dispatch(userLoginRequest());
    const { email } = formData;
    const {
      userAuth: { password_required },
    } = await getState();
    let password;
    let requestData;
    if (password_required) {
      requestData = { ...formData };
    } else {
      password = await get_user_password(email);
      requestData = { ...formData, password: password };
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await API.post("users/login/", requestData, config);
    const { redirect = "/" } = formData;
    const { data: { token = null } = {} } = response;
    await createOTP(token);
    await sendOTP(token, redirect);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    dispatch(userLoginSuccess(response.data));
  } catch (error) {
    dispatch(
      userLoginFailure(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const gmailLogin = (gmailInfo) => async (dispatch) => {
  dispatch(userLoginWithGmailRequest());
  try {
    const {
      email = "",
      uid = "blank",
      displayName = "",
      metadata = {},
      photoURL = "",
      providerId = "",
      providedPassword,
    } = gmailInfo;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const {
      data: { password_required },
    } = await API.get("users/login_route/", {
      params: {
        email: email,
      },
      ...config,
    });

    let password;
    let requestData;
    if (password_required && typeof providedPassword === "undefined") {
      dispatch(
        userLoginWithGmailSuccessful({
          gmailInfo: {
            email: email,
            uid: uid,
            displayName: displayName,
            password_required: password_required,
            photoURL: photoURL,
            providerId: providerId,
            ...metadata,
          },
        })
      );
      dispatch(
        userLoginRoute({
          password_required: password_required,
        })
      );
      return;
    } else if (password_required && typeof providedPassword === "string") {
      requestData = {
        username: email,
        email: email,
        password: providedPassword,
      };
    } else {
      password = await get_user_password(email);
      requestData = { username: email, email: email, password: password };
    }

    const response = await API.post("users/login/", requestData, config);
    // localStorage.setItem('userInfo', JSON.stringify(response.data));
    dispatch(userLoginSuccess(response.data));
  } catch (error) {
    let payload;
    switch (error.code) {
      case "auth/invalid-email":
        payload = "Invalid email address";
        break;
      case "auth/user-disabled":
        payload = "User account has been disabled";
        break;
      case "auth/user-not-found":
        payload = "User not found";
        break;
      case "auth/wrong-password":
        payload = "Invalid password";
        break;
      default:
        payload =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : "something went wrong!";
        break;
    }
    dispatch(logout());
    dispatch(userLoginFailure(payload));
  }
};

export const verifyLoginEmail =
  (otp, loginPath) => async (dispatch, getState) => {
    try {
      dispatch(userLoginRequest());

      const { userAuth: { userInfo: { token, refresh, email } = {} } = {} } =
        await getState();

      const decodedToken = jwtDecode(token);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let formdata;
      let response;

      if (loginPath.includes("/login")) {
        formdata = {
          session_id: decodedToken?.session_id,
          otp: otp,
          refresh: refresh,
          email: email,
        };
        response = await API.post(
          "users/email_login_verify/",
          formdata,
          config
        );
      }
      if (loginPath.includes("/register")) {
        const password = await get_user_password(email);
        formdata = {
          otp: otp,
          email: email,
          username: email,
          password: password,
        };
        response = await API.post(
          "users/email_signup_verify/",
          formdata,
          config
        );
      }

      dispatch(userVerifyEmailSuccessful(response.data));
    } catch (error) {
      try {
        const exception =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        if (exception.includes("Incorrect passcode provided. You have")) {
          dispatch(
            userLoginFailure(
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            )
          );
        } else {
          console.log(error);
          // await dispatch(broadcastLogout());
        }
      } catch (error) {
        throw new Error("can't catch me!");
      }
    }
  };

export const verifyGmailLogin = (idToken) => async (dispatch, getState) => {
  try {
    dispatch(userVerifyEmailRequest());

    const { userAuth: { userInfo: { token, refresh, email } = {} } = {} } =
      await getState();

    const decodedToken = jwtDecode(token);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const formdata = {
      session_id: decodedToken?.session_id,
      refresh: refresh,
      id_token: idToken,
      email: email,
    };

    const response = await API.post(
      "users/gmail_login_verify/",
      formdata,
      config
    );
    // localStorage.setItem('userInfo', JSON.stringify(response.data));
    dispatch(userVerifyEmailSuccessful(response.data));
  } catch (error) {
    dispatch(userLoginFailure(error.message));
    await dispatch(logout());
  }
};

export const verifyGmailSignup = (idToken) => async (dispatch, getState) => {
  try {
    dispatch(userVerifyEmailRequest());

    const { userAuth: { userInfo: { email } = {} } = {} } = await getState();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const password = await get_user_password(email);
    const formdata = {
      id_token: idToken,
      email: email,
      username: email,
      password: password,
    };

    const response = await API.post(
      "users/gmail_register_verify/",
      formdata,
      config
    );
    // localStorage.setItem('userInfo', JSON.stringify(response.data));
    dispatch(userVerifyEmailSuccessful(response.data));
  } catch (error) {
    dispatch(userLoginFailure(error.message));
    await dispatch(logout());
  }
};

export const gmailRegister = (gmailInfo) => async (dispatch) => {
  dispatch(userLoginWithGmailRequest());

  try {
    await dispatch(
      userRegisterWithGmailSuccessful({
        gmailInfo,
      })
    );

    const { email = "", displayName = "", photoURL = "" } = gmailInfo;
    const formdata = {
      email: email,
      username: email,
      first_name: displayName,
      last_name: displayName,
      photoUrl: photoURL,
      requiresOtp: false,
    };

    await dispatch(register(formdata));
  } catch (error) {
    let payload;
    switch (error?.code) {
      case "auth/invalid-email":
        payload = "Invalid email address";
        break;
      case "auth/user-disabled":
        payload = "User account has been disabled";
        break;
      case "auth/user-not-found":
        payload = "User not found";
        break;
      case "auth/wrong-password":
        payload = "Invalid password";
        break;
      default:
        payload = error.message;
        break;
    }
    await dispatch(broadcastLogout());
    dispatch(
      userRegistrationFailure({
        error: payload,
      })
    );
  }
};

export const logout = () => async (dispatch) => {
  await firebaseLogout();
  localStorage.clear();
  sessionStorage.clear();
  dispatch(userLogoutPlaid());
  dispatch(userLogOutClearData());
  dispatch(clearTradeInfoOnLogout());
  await dispatch(userLogOut());
};

export const broadcastLogout = () => (dispatch) => {
  const broadcastChannel = new BroadcastChannel("authChannel");
  broadcastChannel.postMessage({ type: "AUTH_LOGOUT" });
  dispatch(logout());
};

export const accessProtectedView = () => async (dispatch, getState) => {
  dispatch(userLoginRequest());
  try {
    const {
      userAuth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await API.get("users/access/", config);
    dispatch(userProtectedView());
    return true;
  } catch (error) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("link_token");
    dispatch(userLoginFailure(error.message));
    return false;
  }
};

export const accessAdminView = () => async (dispatch, getState) => {
  dispatch(userLoginRequest());
  try {
    const {
      userAuth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await API.get("admin/access/", config);
    dispatch(adminProtectedView(response.data));
  } catch (error) {
    dispatch(userLoginFailure(error.message));
    return false;
  }
};

export const SendSMS = () => async (dispatch, getState) => {
  dispatch(userLoginRequest());
  try {
    const {
      userAuth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await API.post("admin/access/", config);
    dispatch(adminProtectedView(response.data));
  } catch (error) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("link_token");
    dispatch(userLoginFailure(error.message));
    return false;
  }
};

export const fetchUserOrders = async (token, page = 1) => {
  if (!token) {
    return {};
  }
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get(`users/orders/?page=${page}`, config);
  return response.data;
};

export const fetchUserBalance = async (token) => {
  if (!token) {
    return {};
  }
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.get("users/summary/", config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
