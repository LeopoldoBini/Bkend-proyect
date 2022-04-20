import { ProductModel } from '../../models/product.models';

export const updateProduct = async (id, dataObj) => {
    const productUpdated = await ProductModel.findByIdAndUpdate(id, dataObj, { new: true , runValidators: true});
    return productUpdated;
}

