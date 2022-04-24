import { ProductModel } from '../../models/product.models.js';

export const getProducts = async (isActive) => {
    try {
        const gettingParams = isActive?.active || true
        const products = await ProductModel.find({ active: gettingParams } );
        return products;
    }
    catch (error) {
        throw new Error(error);
    }   
}


export const getProductById = async (id) => {
    try {
        const product = await ProductModel.findById({_id: id});
        return product;
    }
    catch (error) {
        throw new Error(error);
    }
}



