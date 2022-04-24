import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    timestamp: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    }
});

export const MessageModel = mongoose.model('Messages', messageSchema);



