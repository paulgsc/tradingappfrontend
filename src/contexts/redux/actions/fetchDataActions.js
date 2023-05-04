import API from "../../../api/django";
import { fetchSummaryDataSuccessful, userDataRequestFailure, userDataRequestSuccessful, userRequestData } from "../../../reducers/fetchDataReducers"

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
       
        dispatch(userDataRequestSuccessful(response.data));


    }catch (error){
        dispatch(userDataRequestFailure(error.message));
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