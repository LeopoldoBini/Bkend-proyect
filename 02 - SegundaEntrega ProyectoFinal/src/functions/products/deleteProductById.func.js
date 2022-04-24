import { ProductModel } from '../../models/product.models.js';

export const productsDeactivetor = async (id) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(id, { active: false }, { new: true });
        return product;
    } catch (error) {
        throw new Error(error);
    }
}