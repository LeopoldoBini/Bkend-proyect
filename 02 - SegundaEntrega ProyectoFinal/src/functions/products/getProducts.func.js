import { ProductModel } from '../../models/product.models';

export const getProducts = async () => {
    const products = await ProductModel.find();
    return products;
}

export const getProductById = async (id) => {
    const product = await ProductModel.findById({_id: id});
    return product;
}


