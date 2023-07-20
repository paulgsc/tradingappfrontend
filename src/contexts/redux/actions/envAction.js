import API from "../../../api/django";
import { envVariablesRequestFailed, envVariablesRequestSuccess, requestEnvVariables } from "../../../reducers/envVariablesReducers";

export const fetchEnvVariables = () => async (dispatch) => {
    dispatch(requestEnvVariables());
    try {
        const path ="app/env/";



        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const response = await API.get(
            path,
            config,
        )
        const data = response.data;
        dispatch(envVariablesRequestSuccess(
        data));
    
    } catch(error){
     dispatch(envVariablesRequestFailed(error))
}
}
