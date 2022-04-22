import { CartModel } from '../../models/cart.models.js';

export const deleteCarritoById = async (idCart) => {
    try {
        const cart = await CartModel.findByIdAndDelete({_id: idCart});
        return cart;
    } catch (error) {
        return error;
    }
}
