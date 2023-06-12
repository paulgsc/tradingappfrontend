import API from "../../../api/django";
import { adminFetchPropertyDataFailed, adminFetchPropertyDataSuccess, adminRequestData } from "../../../reducers/adminFetchDataReducers";

export const adminfetchPropertyData = () => async (dispatch, getState) => {
    dispatch(adminRequestData());
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
            'data/admin/property_list/',
            config,
        )
       
       
        dispatch(adminFetchPropertyDataSuccess(response.data));


    }catch (error){
        dispatch(adminFetchPropertyDataFailed(error.message));
    }
}
