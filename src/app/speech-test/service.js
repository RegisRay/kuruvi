import { request } from '../../../utils/networkService';


export const getText = async(type ,audioData) =>{
    const  response = await fetch(`https://api.openai.com/v1/audio/${type}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
        method: 'POST',
        body: audioData,
    });
    
    const {data, error} = await response.json();
    return {data, error};
      
}