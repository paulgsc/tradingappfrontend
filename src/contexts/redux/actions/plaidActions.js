import API from "../../../api/django";
import { plaidAuthCreatePymtIntentSuccessful, plaidAuthExchangeTokenSuccessful, plaidAuthFailure, plaidAuthGetInfoSuccessful, plaidAuthRequest, plaidAuthRequestTokenSuccessful, plaidCreateTransferFailed, plaidGetLinkedAccountFailed, plaidGetLinkedAccountInfoSuccess, plaidSetAmountFailure, plaidSetTransferAmount, plaidCreateTransferSuccessful, plaidGetTransferStatusSuccessful, plaidUpdatePymtIntentSuccessful, plaidUnLinkAccountSuccess, plaidUnLinkAccountFailed, plaidSimulateTransferEventSuccess, plaidSimulateTransferEventFailed } from "../../../reducers/plaidAuthReducer";
import { fetchSummary, fetchTransfers } from "./fetchDataActions";


export const initiatePlaid = (initiationType) => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try {
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
            'users/banking/info/',
            config,
        )

        dispatch(plaidAuthGetInfoSuccessful({
            plaidInfo: {
                products: response.data.products,
                initiationType: initiationType,
            }
        }))
      

    }catch (error){
        dispatch(plaidAuthFailure({
            error: error.message,
        }))
       
    }
}

export const createTransferIntent = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{
        const {
            userAuth: { userInfo: { token } },
            plaid: { plaidInfo: { transferAmount, account } }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const formdata = {
            amount: transferAmount,
            account: account,
        }
        
        const response = await API.post(
            "users/banking/create_transfer_intent/",
            formdata,
            config,
        )
        dispatch(plaidAuthCreatePymtIntentSuccessful({
            plaidInfo: {
                request_id: response.data,
            }
        }))
    }catch (error){
        dispatch(plaidAuthFailure({
            error: error.message,
            plaidInfo: {
                linkToken: null,
            },
        }));
    }
}

export const requestToken = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try {
        const path ="users/banking/create_transfer_link_token/";

        const {
            userAuth: { userInfo },
            plaid: { plaidInfo: { request_id, account, } }
        } = getState()
        const formData = {
            transfer_request_id: request_id,
            account: account,
        }
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const response = await API.post(
            path,
            formData,
            config,
        )
        const data = response.data;
        dispatch(plaidAuthRequestTokenSuccessful({
            plaidInfo: {
                linkToken: data.link_token,
            },
        }));
        localStorage.setItem("link_token", data.link_token);
    } catch(error){
        dispatch(plaidAuthFailure({
            error: error,
            plaidInfo: {
                linkToken: null,
            },
        }));
    }
}

export const requestLinkToken = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try {
        const path ="users/banking/create_link_token/";

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
            path,
            config,
        )
        const data = response.data;
        dispatch(plaidAuthRequestTokenSuccessful({
            plaidInfo: {
                linkToken: data.link_token,
            },
        }));
        localStorage.setItem("link_token", data.link_token);
    } catch(error){
        dispatch(plaidAuthFailure({
            error: error,
            plaidInfo: {
                linkToken: null,
                isError: true,
            },
        }));
    }
}

export const exchangePublicTokenForAccessToken = (public_token) => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{

            const {
                userAuth: { userInfo },
                plaid: { plaidInfo: { initiationType } }
            } = getState();
    
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    Authorization: `Bearer ${userInfo.token}`
                },
            };
    
            const response = await API.post(
                '/users/banking/set_access_token/',
                {public_token: public_token},
                config,
            )
            await dispatch(plaidAuthExchangeTokenSuccessful({
                plaidInfo: {
                    isItemAccess: true,
                    linkSuccess: true,
                    successData: response.data,
                }
            }));
            if (initiationType === "transfer"){
                await dispatch(transferIntentGet());
                await dispatch(getTransferStatus());
            }
            if (initiationType === "link"){
                await dispatch(getLinkedAccounts())
            }
            window.location.href = "http://localhost:5173/personal/banking";

        
    }catch (error){
        dispatch(plaidAuthFailure({
            error: error,
            plaidInfo: {
                isItemAccess: false
            }
        }))
    }
}

export const getLinkedAccounts = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{

            const {
                userAuth: { userInfo },
            } = getState();
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
            };
    
            const response = await API.get(
                '/users/banking/get_accounts/',
                config,
            )
            dispatch(plaidGetLinkedAccountInfoSuccess(response.data));

    }catch (error){
        dispatch(plaidGetLinkedAccountFailed({
            error: error,
        }))
    }
}

export const transferIntentGet = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{
        const {
            userAuth: { userInfo },
            plaid: { plaidInfo: { request_id } }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const response = await API.post(
            '/users/banking/transfer_intent_get/',
            {request_id: request_id},
            config,
        )
        dispatch(plaidUpdatePymtIntentSuccessful({
            plaidInfo: {
                intentGet: response.data
            }
        }))

    }catch (error){
        dispatch(plaidAuthFailure({
            error: error.message,
            plaidInfo: {
                isItemAccess: false
            }
        }))
    }
}

export const getTransferStatus = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{
        const {
            userAuth: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const response = await API.get(
            '/users/banking/transfer_status_get/',
            config,
        )
        dispatch(plaidGetTransferStatusSuccessful({
            plaidInfo: {
                transferStatus: response.data
            }
        }))

    }catch (error){
        dispatch(plaidAuthFailure({
            error: error.message,
            plaidInfo: {
                isItemAccess: false
            }
        }))
    }
}

export const setTransferAmount = (data) => async (dispatch) => {
    dispatch(plaidAuthRequest());
    try{
        dispatch(plaidSetTransferAmount({
            plaidInfo: {
                ...data,
            }
        }));

    }catch (error){
        dispatch(plaidSetAmountFailure(error.message));
    }
}

export const authorizeAndCreateTransfer = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{
        const {
            userAuth: { userInfo: { token } },
            plaid: { plaidInfo: { transferAmount, account, type, description } }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const formdata = {
            amount: transferAmount,
            account: account,
            type: type,
            description: description,
        }
        
        const response = await API.post(
            "users/banking/plaid-transfer-auth/",
            formdata,
            config,
        )
        await dispatch(plaidCreateTransferSuccessful({
            plaidInfo: {
                initiationType: "",
                transferAmount: "",
                description: "",
                type: "",
                transferStatus: response.data,
                transferAuthSuccess: true,
            }
        }))
        await dispatch(getTransferStatus())
        window.location.href = "http://localhost:5173/personal/banking";
    }catch (error){
        dispatch(plaidCreateTransferFailed({
            error: error.message,
            plaidInfo: {
                linkToken: null,
            },
        }));
    }
}

export const unlinkBankAccount = (accountIds) => async (dispatch, getState) => {

    dispatch(plaidAuthRequest({
        fetchingData: true
    }));
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
        const formdata = {
            account_ids: accountIds,
        }
        
        const response = await API.post(
            "users/banking/plaid-unlink-bank/",
            formdata,
            config,
        )
        await dispatch(plaidUnLinkAccountSuccess(response.data))

       
    }catch (error){
        dispatch(plaidUnLinkAccountFailed(error.message));
    }
}

export const simulateTransferEvent = (eventData) => async (dispatch, getState) => {

    dispatch(plaidAuthRequest({
        loadingRequest: true
    }));
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
        
        const response = await API.post(
            "users/banking/plaid/sandbox/simulate_event/",
            eventData,
            config,
        )
        await dispatch(fetchTransfers())
        await dispatch(fetchSummary())
        dispatch(plaidSimulateTransferEventSuccess({
            loadingRequest: false,
        }))
        

       
    }catch (error){
        dispatch(plaidSimulateTransferEventFailed({
            error: error.message,
            loadingRequest: false,
        }));
    }
}