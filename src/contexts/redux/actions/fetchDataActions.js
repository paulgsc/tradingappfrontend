import API from "../../../api/django";
import { fetchOrdersByProperty, fetchOrdersByPropertyFailed, fetchSharesDataFailed, fetchSharesDataSuccessful, fetchSummaryDataSuccessful, fetchUserLinkedAccountsFailed, fetchUserLinkedAccountsSusccess, fetchUserNotificationsFailed, fetchUserNotificationsSuccess, propertyTradeDataRequestFailed, propertyTradeDataRequestSuccess, userOrdersDataRequestFailure, userOrdersDataRequestSuccessful, userRequestData, userSummaryDataRequestFailure, userTransactionsDataRequestFailure, userTransactionsDataRequestSuccessful, userTransferDataRequestSuccessful, userTransfersDataRequestFailure } from "../../../reducers/fetchDataReducers"
import { userRequestPDF, userRequestPDFFailed, userRequestPDFSuccesful } from "../../../reducers/userActionsReducers";



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
        transfer_pending: acc.transfer_pending || 0 + curr.transfer_pending,
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

  export const fetchNotificationsForUser = (  page = 1,
    pageSize = 4,
    maxPageSize = 5) => async (dispatch, getState) => {
    dispatch(userRequestData({
        loadingNotifications: true,
    }));
    try{
        const {
            userAuth: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            params: {
               page,
               page_size: pageSize,
               max_page_size: maxPageSize, 
            },
        }
        const response = await API.get(
            'users/notifications/',
            config,
        )
       
        dispatch(fetchUserNotificationsSuccess({
            notifications: response.data.notifications,
            count: response.data.notifications_count,
        }));


    }catch (error){
        dispatch(fetchUserNotificationsFailed(error.message));
    }
}
  

export const fetchPublicPDFs = (pdfName, setSearchParams) => async (dispatch) => {
    dispatch(userRequestPDF())
    try{

        const response = await fetch(
            `http://127.0.0.1:8000/api/dropbox/public_files/render_pdf/?file_path=${pdfName}`,
            {
              method: "GET", // Optional, GET is the default method
              responseType: "blob",
            }
          );
          

        const blob = await response.blob();
        const pdfURL = URL.createObjectURL(blob);
        setSearchParams((prevSearchParams) => ({
            ...prevSearchParams,
            viewPdf: pdfName,
          }));
        dispatch(userRequestPDFSuccesful(pdfURL));

    }catch (error){
        dispatch(userRequestPDFFailed(error.message));
    }
}
