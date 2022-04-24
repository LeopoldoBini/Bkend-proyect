import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    idClient: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    productsList: {
        type: Array,
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    quantityOfDifferentProducts: {
        type: Number,
        default: 0,
        min: 0
    }
});

export const CartModel = mongoose.model('Carts', cartSchema);