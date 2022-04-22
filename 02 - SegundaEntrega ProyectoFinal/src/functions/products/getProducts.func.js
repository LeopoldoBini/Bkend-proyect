import { ProductModel } from '../../models/product.models.js';

export const getProducts = async (isActive) => {

    try {
        const products = await ProductModel.find( isActive === undefined ? {} : { active: isActive })
        return products;
    }
    catch (error) {
        return error;
    }   
}


export const getProductById = async (id) => {
    try {
        const product = await ProductModel.findById({_id: id});
        return product;
    }
    catch (error) {
        return error;
    }
}


