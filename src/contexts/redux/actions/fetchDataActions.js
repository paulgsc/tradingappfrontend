import API from "../../../api/django";
import { fetchSummaryDataSuccessful, userOrdersDataRequestFailure, userOrdersDataRequestSuccessful, userRequestData, userTransactionsDataRequestFailure, userTransactionsDataRequestSuccessful, userTransferDataRequestSuccessful, userTransfersDataRequestFailure } from "../../../reducers/fetchDataReducers"

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
       
        dispatch(userTransferDataRequestSuccessful(response.data));


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
       
        dispatch(userOrdersDataRequestSuccessful(response.data));


    }catch (error){
        dispatch(userOrdersDataRequestFailure(error.message));
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
       
        dispatch(fetchSummaryDataSuccessful(response.data));


    }catch (error){
        dispatch(userDataRequestFailure(error.message));
    }
}