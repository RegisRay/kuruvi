import {request} from "../../../utils/networkService"


export const getChoice = async(question_id) =>{
    const options = {
        method: "get",
        url: `/api/questions/choice?qid=${question_id}`,
    }
    
    const {data, error} = await request(options);
    return {data, error}
}

export const addChoice = async(question_id, choiceDetails)=>{
    const options = {
        method: "post",
        url: `/api/questions/choice?qid=${question_id}`,
        data: {
            name: choiceDetails.name
        }
    }
    
    const {data, error} = await request(options);
    return {data, error};
}

export const deleteChoice = async(choice_id)=>{
    const options = {
        method: "delete",
        url: `/api/questions/choice?cid=${choice_id}`,
    }
    
    const {data, error} = await request(options);
    return {data, error};
}

export const updateChoice = async(choice_id, choiceDetails)=>{
    const options = {
        method: "put",
        url: `/api/questions/choice?cid=${choice_id}`,
        data:{
            name: choiceDetails.name
        }
    }
    const {data, error} = await request(options);
    return {data, error}
}