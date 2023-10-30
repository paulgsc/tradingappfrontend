import jwtDecode from "jwt-decode";
import API from "../../../api/django";
import {
  clearOrderInfo,
  fetchBalanceInfoSuccessful,
  requestBalanceInfo,
  startTradeRequest,
  storeOrderInfo,
  storeOrderInfoFailed,
  tradeRequestFailure,
  tradeRequestSuccessful,
  validateOrder,
  validateOrderError,
} from "../../../reducers/tradingReducers";

export const popUpTradeInfo = (payload) => (dispatch) => {
  dispatch(storeOrderInfo(payload));
};

export const popUpClose = () => (dispatch) => {
  dispatch(clearOrderInfo());
};

export const excersiseTrade = () => async (dispatch, getState) => {
  dispatch(startTradeRequest());
  try {
    const {
      trade: {
        orderInfo: {
          propertyId,
          transactionType,
          amount,
          shares,
          pricePerShare,
        },
      },
      userAuth: {
        userInfo: { token },
      },
    } = getState();
    const { user_id } = jwtDecode(token);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const orderData = {
      order_type: "BUY",
      property: propertyId,
      order_shares_total: shares,
      order_amount: amount,
      user: user_id,
      price_per_share: pricePerShare,
    };
    const response = await API.post("users/orders/trade/", orderData, config);
    dispatch(
      tradeRequestSuccessful({
        exercisedOrderInfo: {
          ...response.data,
        },
      })
    );
  } catch (error) {
    dispatch(tradeRequestFailure(error.message));
  }
};

export const storeOrderInput = (orderInfo) => (dispatch) => {
  try {
    dispatch(storeOrderInfo(orderInfo));
  } catch (error) {
    dispatch(storeOrderInfoFailed());
  }
};

export const stageLiveOrder = (orderInfo) => (dispatch) => {
  try {
    dispatch(storeOrderInfo(orderInfo));
  } catch (error) {
    dispatch(clearOrderInfo());
  }
};

export const validateOrderInput = (validationInfo) => (dispatch) => {
  try {
    dispatch(validateOrder(validationInfo));
  } catch (error) {
    dispatch(validateOrderError());
  }
};
