import axios from 'axios';

export async function getChatBotResponse(userId, reqId, query) {
    const payload = {
        userID: userId,
        requestID: reqId,
        user_input: query
    };
    const response = await axios.post('//18.237.155.139:8000/chat-llm', payload);
    if(response.data)return response.data;
}



export async function getMermaidCode(userId, reqId){
    const payload = {
        userID: userId,
        requestID: reqId
    };
    const response = await axios.post('//18.237.155.139:8000/generate-mermaid', payload)
    if(response.data)return response.data;
}
