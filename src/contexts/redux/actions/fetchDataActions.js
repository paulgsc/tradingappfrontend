import API from "../../../api/django";
import { fetchOrdersByProperty, fetchOrdersByPropertyFailed, fetchSharesDataFailed, fetchSharesDataSuccessful, fetchSummaryDataSuccessful, fetchUserLinkedAccountsFailed, fetchUserLinkedAccountsSusccess, propertyTradeDataRequestFailed, propertyTradeDataRequestSuccess, userOrdersDataRequestFailure, userOrdersDataRequestSuccessful, userRequestData, userSummaryDataRequestFailure, userTransactionsDataRequestFailure, userTransactionsDataRequestSuccessful, userTransferDataRequestSuccessful, userTransfersDataRequestFailure } from "../../../reducers/fetchDataReducers"

export const fetchTransactions = () => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            'users/transaction_history/',
            config,
        )
        const transaction_data = [ ...[].concat(...(response.data.map((item) => (item.transfers.map((transfer) => ({ ...transfer, recordType: "Transfer" }) ) )))),
         ...[].concat(...(response.data.map((item) => item.orders.map((order) => ({ ...order, recordType: "Trade Order" })) ))) ]
       
        dispatch(userTransactionsDataRequestSuccessful(transaction_data));


    }catch (error){
        dispatch(userTransactionsDataRequestFailure(error.message));
    }
}

export const fetchTransfers = () => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            'users/banking/transfer_history/',
            config,
        )

        const data = response.data.map((item) => ( { ...item, recordType: "Transfer" } ))
       
       
        dispatch(userTransferDataRequestSuccessful(data));


    }catch (error){
        dispatch(userTransfersDataRequestFailure(error.message));
    }
}

export const fetchOrders = () => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            'users/orders/',
            config,
        )
        const transactionData = [].concat(...response.data.map((item) => item.orders)) ;
       
        dispatch(userOrdersDataRequestSuccessful(transactionData));


    }catch (error){
        dispatch(userOrdersDataRequestFailure(error.message));
    }
}

export const fetchShares = () => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            'users/shares/',
            config,
        )
        const sharesData = [].concat(...response.data.map((item) => item.properties)) ;
       
        dispatch(fetchSharesDataSuccessful(sharesData));


    }catch (error){
        dispatch(fetchSharesDataFailed(error.message));
    }
}

export const fetchOrderForProperty = (propertyId) => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            `users/properties/${propertyId}/orders/`,
            config,
        )
       
        dispatch(fetchOrdersByProperty(response.data));


    }catch (error){
        dispatch(fetchOrdersByPropertyFailed(error.message));
    }
}

export const fetchLinkedAccounts = () => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            'users/banking/linked/accounts/',
            config,
        )

        const data = [].concat( ...response.data.map((item) => item.accounts) );
        dispatch(fetchUserLinkedAccountsSusccess(data))


    }catch (error){
        dispatch(fetchUserLinkedAccountsFailed(error.message));
    }
}

export const fetchSummary = () => async (dispatch, getState) => {
    dispatch(userRequestData());
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
            'users/summary/',
            config,
        )
       const data = response.data.reduce((acc, curr) => (
       {
        transfers_total: acc.transfers_total || 0 + curr.transfers_total,
        buy_amount_total: acc.buy_amount_total || 0 + curr.buy_amount_total,
        sell_amount_total: acc.sell_amount_total || 0 + curr.sell_amount_total,
        amount_purchased: acc.amount_purchased || 0 + curr.amount_purchased,
        transfer_remaining: acc.transfer_remaining || 0 + curr.transfer_remaining,
       }

       ), {})
        dispatch(fetchSummaryDataSuccessful(data));


    }catch (error){
        dispatch(userSummaryDataRequestFailure(error.message));
    }
}

export const fetchPropertyQuery = (searchQuery) => async (dispatch) => {
    dispatch(userRequestData());
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await API.get(
        `data/property/search?query=${searchQuery}`,
        config
      );
      dispatch(propertyTradeDataRequestSuccess(response.data));
    } catch (error) {
      dispatch(propertyTradeDataRequestFailed(error.message));
    }
  };