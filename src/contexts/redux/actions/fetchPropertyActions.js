import API from "../../../api/django";
import { fetchPropertyDataSuccess, fetchProperyDataFailure, requestPropertyData } from "../../../reducers/fetchPropertyReducers";


export const fetchPropertyRows = () => async (dispatch) => {
    dispatch(requestPropertyData());
    try{

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const response = await API.get(
            'data/property_list/',
            config,
        )
        
       
        dispatch(fetchPropertyDataSuccess(response.data));


    }catch (error){
        dispatch(fetchProperyDataFailure(error.message));
    }
}

export const fetchPropertyFinancials = async (page=1, propertyId) => {

    const config = {
    headers: {
        "Content-type": "application/json",
    },
    };

    const response = await API.get(`users/property_financials/${propertyId}/?page=${page}&page_size=12`, config);
    
    return response.data;

};