import axios from 'axios';

export async function getChatBotResponse(userId, reqId, query) {
    const payload = {
        userID: userId,
        requestID: reqId,
        userInput: query
    };
    const response = await axios.post('http://18.237.155.139:8000/chat-llm', payload);
    if(response.data)return response.data;
}



export async function getMermaidCode(){
    const response = await axios.get('http://18.237.155.139:8000/generate-mermaid')
    if(response.data)return response.data;
}
