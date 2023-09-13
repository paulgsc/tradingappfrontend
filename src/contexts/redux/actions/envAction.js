
import API from "../../../api/django";
import { envVariablesRequestFailed, envVariablesRequestSuccess, requestEnvVariables } from "../../../reducers/envVariablesReducers";

export const fetchEnvVariables = () => async (dispatch) => {
    dispatch(requestEnvVariables());
    try {
        let data;
        const storedValue = JSON.parse(localStorage.getItem('sessionValues'))
        if(typeof storedValue === 'object' && storedValue !== null){
            data = storedValue;
        }else{
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
            data = response.data;
        localStorage.setItem('sessionValues', JSON.stringify(data))
        }

        
        dispatch(envVariablesRequestSuccess(
        data));
    
    } catch(error){
        console.log(error)
     dispatch(envVariablesRequestFailed(error.message))
}
}
