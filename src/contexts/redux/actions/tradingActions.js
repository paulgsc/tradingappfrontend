import API from "../../../api/django";
import { clearOrderInfo, fetchBalanceInfoSuccessful, requestBalanceInfo, startTradeRequest, storeOrderInfo, storeOrderInfoFailed, tradeRequestFailure, tradeRequestSuccessful, validateOrder, validateOrderError } from "../../../reducers/tradingReducers"


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

export const fetchBalance = () => async (dispatch, getState) => {
    dispatch(requestBalanceInfo());
    try{
        const {
           userAuth: { userInfo: { token } },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const response = await API.get(
            'users/summary/',
            config,
        )
        const data = response.data.reduce((acc, curr) => {
            return {
              id: curr.id,
              transfers_total: (acc.transfers_total || 0) + curr.transfers_total,
              buy_amount_total: (acc.buy_amount_total || 0) + curr.buy_amount_total,
              sell_amount_total: (acc.sell_amount_total || 0) + curr.sell_amount_total,
              amount_purchased: (acc.amount_purchased || 0) + curr.amount_purchased,
              transfer_remaining: (acc.transfer_remaining || 0) + curr.transfer_remaining,
            }
          }, {});
        dispatch(fetchBalanceInfoSuccessful({
            balanceInfo: {
                transferAmountRemaining: data?.transfer_remaining,
                amountPurchased: data?.amount_purchased,
            }
        }));
    } catch (error){
        dispatch(tradeRequestFailure(error.message));
    };
};

export const storeOrderInput = (orderInfo) => (dispatch) => {
    try{
        dispatch(storeOrderInfo(orderInfo))
    }catch (error){
        dispatch(storeOrderInfoFailed())
    }
}

export const stageLiveOrder = (orderInfo) => (dispatch) => {
    try{
        dispatch(storeOrderInfo(orderInfo))
    }catch (error){
        dispatch(clearOrderInfo())
    }
}

export const validateOrderInput = (validationInfo) => (dispatch) => {
    try{
        dispatch(validateOrder(validationInfo))
    }catch (error){
        dispatch(validateOrderError())
    }
}