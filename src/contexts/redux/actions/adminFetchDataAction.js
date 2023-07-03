import API from "../../../api/django";
import { adminCreatePropertyFailed, adminCreatePropertySuccess, adminFetchPropertyDataFailed, adminFetchPropertyDataSuccess, adminFetchSiteTasksFailed, adminFetchSiteTasksSuccess, adminRequestData, adminUpdatePropertyFailed, adminUpdatePropertySuccess } from "../../../reducers/adminFetchDataReducers";

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

export const adminfetchSiteTasks = () => async (dispatch, getState) => {
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
            'admin/tasks/',
            config,
        )
       
       
        dispatch(adminFetchSiteTasksSuccess(response.data));


    }catch (error){
        dispatch(adminFetchSiteTasksFailed(error.message));
    }
}

export const reactQFetchSiteTasks = async (token) => {
    try{

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const response = await API.get(
            'admin/tasks/',
            config,
        )
       
       
        return response.data;


    }catch (error){
        throw new Error('Error fetching data');
    }
}

export const createProperty = (property) => async (dispatch, getState) => {
    dispatch(adminRequestData());
    try {
        const path ="data/admin/property_create/";

        const {
            userAuth: { userInfo },
         
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const response = await API.post(
            path,
            property,
            config,
        )
        const data = response.data;
        dispatch(adminCreatePropertySuccess(
        data));
    
    } catch(error){
     dispatch(adminCreatePropertyFailed(error))
}
}

export const updateProperty = (property) => async (dispatch, getState) => {
    dispatch(adminRequestData());
    try {
        const path ="data/admin/property_update/";

        const {
            userAuth: { userInfo },
         
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const response = await API.post(
            path,
            property,
            config,
        )
        const data = response.data;
        dispatch(adminUpdatePropertySuccess(
        data));
    
    } catch(error){
     dispatch(adminUpdatePropertyFailed(error))
}
}
