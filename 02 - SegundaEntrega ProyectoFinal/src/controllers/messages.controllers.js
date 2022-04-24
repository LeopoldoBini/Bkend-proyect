import { messagesGetter , messageSaver} from "../functions/messages/index.js";

export const getMessages = async (req, res) => {
    try {
        const messages = await messagesGetter();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error });
    }
}

export const saveMessage = async (req, res, next) => {
    try {
        const message = req.body;
        const id = await messageSaver(message);
        res.status(201).next();
    } catch (error) {
        res.status(400).json({ mensaje: error.message , error });
    }
}