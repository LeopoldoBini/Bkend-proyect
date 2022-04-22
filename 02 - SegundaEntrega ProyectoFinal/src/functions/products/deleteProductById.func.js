import { ProductModel } from '../../models/product.models.js';

export const deleteProductById = async (id) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(id, { active: false }, { new: true });
        return product;
    } catch (error) {
        return error;
    }
}