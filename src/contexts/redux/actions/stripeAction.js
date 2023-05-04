import API from "../../../api/django";
import { stripeAuthFailure, stripeAuthSuccessful, stripePymtRequested } from "../../../reducers/stripeAuthReducer"



export const startStripeSession = (id) => async (dispatch, getState) => {
    dispatch(stripePymtRequested());
    try {

        const {
            userAuth: { userInfo: { token } },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await API.get(
            `users/billing/`,
            config
        )

        dispatch(stripeAuthSuccessful(data));


    } catch (error) {
        dispatch(stripeAuthFailure(
            error   
        ));
    }
}
