import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    idCliente: {
        type: Number,
        required: true,
        min: 1
    },
    timestamp: {
        type: String,
        required: true
    },
    lista: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false
    },
    quantityOfDifferentProducts: {
        type: Number,
        required: true,
        min: 0
    }
});

export const CartModel = mongoose.model('Cart', cartSchema);