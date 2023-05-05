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
