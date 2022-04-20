import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    timestamp: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    },
    thumbnail: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    },
    category: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    active: {
        type: Boolean,
        default: true
    }
    
});

export const ProductModel = mongoose.model('Products', productSchema);

