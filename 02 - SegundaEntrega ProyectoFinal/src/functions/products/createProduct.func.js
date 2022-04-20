import { ProductModel } from '../../models/product.models';

export const createProduct = async (product) => {
    const newProduct = new ProductModel(product);
    const productCreated = await newProduct.save();
    return productCreated._id;
}

export const createManyProducts = async (products) => {
    const productsCreated = await ProductModel.create(products);
    return productsCreated;
}