import { MessageModel } from "../../models/message.model.js";

export const messageSaver = async (message) => {
    try {
        const timestamp = new Date().toLocaleString();
        message.timestamp = timestamp;
        const newMessage = await MessageModel.create(message);
        return newMessage;
    } catch (error) {
        throw new Error(error);
    }
}

export const saveManyMessages = async (messages) => {
    try {
        const newMessages = await MessageModel.insertMany(messages);
        return "messages saved";
    } catch (error) {
        throw new Error(error);
    }
}