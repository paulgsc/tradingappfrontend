import API from "../../../api/django";
import { plaidAuthCreatePymtIntentSuccessful, plaidAuthExchangeTokenSuccessful, plaidAuthFailure, plaidAuthGetInfoSuccessful, plaidAuthRequest, plaidAuthRequestTokenSuccessful, plaidGetLinkedAccountFailed, plaidGetLinkedAccountInfoSuccess, plaidSetAmountFailure, plaidSetTransferAmount, plaidUGetTransferStatusSuccessful, plaidUpdatePymtIntentSuccessful } from "../../../reducers/plaidAuthReducer";


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
                dispatch(getTransferStatus());
            }

        
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
            plaid: { plaidInfo: { request_id } }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const response = await API.post(
            '/users/banking/transfer_status_get/',
            {request_id: request_id},
            config,
        )
        dispatch(plaidUGetTransferStatusSuccessful({
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