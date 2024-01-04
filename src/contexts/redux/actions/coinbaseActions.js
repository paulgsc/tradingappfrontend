import API from "../../../api/django";
import {
  requestAccessToken,
  requestAccessTokenFailed,
  requestAccessTokenSuccess,
  requestExchangeToken,
  requestExchangeTokenFailed,
  requestExchangeTokenSuccess,
} from "../../../reducers/coinbaseSlice";

export const userRequestCoinBaseExchangeToken =
  () => async (dispatch, getState) => {
    dispatch(requestExchangeToken());
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
      const response = await API.get(
        "users/coinbase/get/exchange_token/",
        config
      );
      dispatch(requestExchangeTokenSuccess(response.data));
    } catch (error) {
      dispatch(requestExchangeTokenFailed(error.message));
      return false;
    }
  };

export const userRequestCoinBaseAccessToken =
  (data) => async (dispatch, getState) => {
    dispatch(requestAccessToken());
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
      const response = await API.post(
        "users/coinbase/create/access_token/",
        data,
        config
      );
      dispatch(requestAccessTokenSuccess(response.data));
    } catch (error) {
      dispatch(requestAccessTokenFailed(error.message));
      return false;
    }
  };
