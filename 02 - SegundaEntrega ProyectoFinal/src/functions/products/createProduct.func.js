import { ProductModel } from '../../models/product.models.js';

export const createProduct = async (product) => {
    try {
        const newProduct = new ProductModel(product);
        const productCreated = await newProduct.save();
        return productCreated._id;
        
    } catch (error) {
        return error;
    }
}

export const createManyProducts = async (products) => {
    try {
        const productsCreated = await ProductModel.create(products);
        return productsCreated;
    } catch (error) {
        return error;
    }
}