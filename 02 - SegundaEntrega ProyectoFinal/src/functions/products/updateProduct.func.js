import { ProductModel } from '../../models/product.models.js';

export const productsUpdater = async (id, dataObj) => {
    try {
        const productUpdated = await ProductModel.findByIdAndUpdate(id, dataObj, { new: true , runValidators: true});
        return productUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

