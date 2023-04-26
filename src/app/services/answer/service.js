import {request} from "../../../utils/networkService"

export const getAnswers = async(question_id)=>{
    const options = {
        method: "get",
        url: `/api/answer?qid=${question_id}`,
    }
    const {data, error} = await request(options);
    return {data, error};
}

export const addAnswer = async(question_id, answerDetails)=>{
    const options = {
        method: "post",
        url: `/api/answer?qid=${question_id}`,
        data:{
            value: answerDetails
        }
    }
    
    const {data, error} = await request(options);
    return {data, error};
}

export const deleteAnswer = async(answer_id)=>{
    const options ={
        method: "delete",
        url: `/api/answer?aid=${answer_id}`
    }
    
    const {data, error} = await request(options);
    return {data, error}
}

export const updateAnswer = async(answer_id, answerDetails)=>{
    const options = {
        method: "put",
        url: `/api/answer?aid=${answer_id}`,
        data:{
            value: answerDetails.value
        }
    }
    
    const {data, error} = await request(options);
    return {data, error}
}