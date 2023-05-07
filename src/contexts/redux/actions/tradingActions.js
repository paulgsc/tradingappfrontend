import API from "../../../api/django";
import { clearOrderInfo, startTradeRequest, storeOrderInfo, tradeRequestFailure, tradeRequestSuccessful } from "../../../reducers/tradingReducers"


export const popUpTradeInfo = (payload)  => (dispatch) => {
    dispatch(storeOrderInfo(payload));
};

export const popUpClose = ()  => (dispatch) => {
    dispatch(clearOrderInfo());
};

export const excersiseTrade = () => async (dispatch, getState) => {
    dispatch(startTradeRequest());
    try{
        const {
           trade: { orderInfo: { propertyId, transactionType, amount, shares } },
           userAuth: { userInfo: { token } },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const orderData = {
            'transaction_type': transactionType,
            'property': propertyId,
            'order_shares_total': shares,
            'order_amount': amount,
        }
        const response = await API.post(
            'users/orders/trade/',
            orderData,
            config,
        )
        dispatch(tradeRequestSuccessful({
            exercisedOrderInfo: {
                ...response.data,
            },
        }));
    } catch (error){
        dispatch(tradeRequestFailure(error.message));
    };
};