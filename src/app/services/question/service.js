import {request} from "../../../utils/networkService"

export const getQuestion = async(form_id) =>{
    const options = {
        method: "get",
        url: `/api/questions?fid=${form_id}}`,
        data:{
            form_id,
        }
    }
    
    const {data, error} = await request(options)
    return {data, error}
}

export const addQuestion = async(form_id, questionDetails) =>{
    const options = {
        method: "post",
        url: `/api/questions?fid=${form_id}`,
        data: {
            form_id,
            type: questionDetails.type,
            content: questionDetails.content,
            choice_name: questionDetails.choice_name
        }
    }
    
    const {data, error} = await request(options);
    return {data, error}
}