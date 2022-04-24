import { MessageModel } from "../../models/message.model.js";

export const messagesGetter = async (gettingParams) => {
    try {
        const params = gettingParams || {};
        const messages = await MessageModel.find(params);
        return messages;
    } catch (error) {
        throw new Error(error);
    }
};