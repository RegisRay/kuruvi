import {request} from "../../utils/networkService"

export const getAllForms = async(user_id)=>{
    const options = {
        method: "get",
        url: `/api/forms?uid=${user_id}`
    }
    const {data, error} = await request(options);
    
    return {data, error};
}