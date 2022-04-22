import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    idClient: {
        type: Number,
        required: true,
        min: 1
    },
    timestamp: {
        type: String,
        required: true
    },
    productsList: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    quantityOfDifferentProducts: {
        type: Number,
        required: true,
        min: 0
    }
});

export const CartModel = mongoose.model('Carts', cartSchema);