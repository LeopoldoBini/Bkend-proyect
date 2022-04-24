import { ProductModel } from '../../models/product.models.js';

export const productCreator = async (product) => {
    try {
        const timestamp = new Date().toLocaleString();
        product.timestamp = timestamp;
        const newProduct = new ProductModel(product);
        const productCreated = await newProduct.save();
        return productCreated._id;
        
    } catch (error) {
        throw new Error(error);
    }
}

export const createManyProducts = async (products) => {
    try {
        const timestamp = new Date().toLocaleString()
        products.forEach(product => {
            if (!product.timestamp) product.timestamp = timestamp;
        });
        const productsCreated = await ProductModel.create(products);
        return productsCreated;
    } catch (error) {
        throw new Error(error);
    }
}