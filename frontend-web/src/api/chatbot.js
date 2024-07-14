import axios from 'axios';

export async function getChatBotResponse(userId, reqId, query) {
    const payload = {
        userID: userId,
        requestID: reqId,
        userInput: query
    };
    const response = await axios.post('http://18.237.155.139:8000/chat-llm', payload);
    return response.data;
}
