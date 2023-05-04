import API from "../../../api/django";
import { plaidAuthCreatePymtIntentSuccessful, plaidAuthExchangeTokenSuccessful, plaidAuthFailure, plaidAuthGetInfoSuccessful, plaidAuthRequest, plaidAuthRequestTokenSuccessful, plaidSetAmountFailure, plaidSetTransferAmount, plaidUGetTransferStatusSuccessful, plaidUpdatePymtIntentSuccessful } from "../../../reducers/plaidAuthReducer";


export const initiatePlaid = () => async (dispatch, getState) => {
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
        const paymentInitiation = response.data.products.includes(
            "payment_initiation"
          );
        dispatch(plaidAuthGetInfoSuccessful({
            plaidInfo: {
                products: response.data.products,
                isPaymentInitiation: paymentInitiation,
            }
        }))
        return paymentInitiation;

    }catch (error){
        dispatch(plaidAuthFailure({
            error: error.message,
        }))
        return { paymentInitiation: false };
    }
}

export const createTransferIntent = () => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{
        const {
            userAuth: { userInfo: { token } },
            plaid: { plaidInfo: { transferAmount } }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        console.log(transferAmount, "transfer")
        const formdata = {
            amount: transferAmount,
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
            plaid: { plaidInfo: { request_id } }
        } = getState()
        const formData = {
            transfer_request_id: request_id
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

export const exchangePublicTokenForAccessToken = (public_token, isPaymentInitiation) => async (dispatch, getState) => {
    dispatch(plaidAuthRequest());
    try{
        if(isPaymentInitiation){
            dispatch(plaidAuthExchangeTokenSuccessful({
                plaidInfo: {
                    isItemAccess: false,
                    linkSuccess: true,
                },
            }));
        }else{
            const {
                userAuth: { userInfo },
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

export const setTransferAmount = (amount) => async (dispatch) => {
    dispatch(plaidAuthRequest());
    try{
        dispatch(plaidSetTransferAmount({
            plaidInfo: {
                transferAmount: amount,
            }
        }));

    }catch (error){
        dispatch(plaidSetAmountFailure(error.message));
    }
}