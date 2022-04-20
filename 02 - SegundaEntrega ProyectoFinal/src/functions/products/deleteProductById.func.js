// create a funtion that set the property "active" to false of a produc in the collection products, and return a message using mongoose
import { ProductModel } from '../../models/product.models';

export const deleteProductById = async (id) => {
    const productDeleted = await ProductModel.findByIdAndUpdate(id, { active: false }, { new: true });
    return productDeleted;
}