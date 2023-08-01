import API from "../../../api/django";


export const fetchPropertyRows = () => async (dispatch) => {
  
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
        
       
    


    }catch (error){

    }
}

export const fetchPropertyFinancials = async (page=1, propertyId) => {
    if(!propertyId){
        return []
    }
    const config = {
    headers: {
        "Content-type": "application/json",
    },
    };

    const response = await API.get(`users/property_financials/${propertyId}/?page=${page}&page_size=12`, config);
    
    return response.data;

};