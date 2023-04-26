import {request} from "../../../utils/networkService"

export const getAllForms = async(user_id)=>{
    const options = {
        method: "get",
        url: `/api/forms?uid=${user_id}`
    }
    const {data, error} = await request(options);
    
    return {data, error};
}

export const createForm = async(user_id, formDetails)=>{
    const options = {
        method: "post",
        url: `/api/forms?uid=${user_id}`,
        data:{
            name: formDetails.name,
            description: formDetails.description,
            user_id
        }
    }
    const {data, error} = await response(options);
    
    return {data, error}
    
}

export const deleteForm = async(form_id)=>{
    const options = {
        method: "delete",
        url:`/api/forms?fid=${form_id}`,
        data:{
            id: form_id
        }
    }
    
    const {data, error} = await request(options);
    
    return {data, error}
}


export const getForm = async(form_id)=>{
    const options = {
        method: "get",
        url: `/api/form/${form_id}`,
        data:{
            id: form_id
        }
    }
    
    const {data, error} = request(options);
    return {data, error};
}

export const updateForm = async(form_id, formDetails) =>{
    const options = {
        method: "put",
        url: `/api/form/${form_id}`,
        data:{
            name: formDetails.name,
            description: formDetails.description,
            id: form_id
        }
    }
    
    const {data, error}= request(options);
    return {data, error};
}
