import { CartModel } from '../../models/cart.models.js';


export const cartCloser = async (idCart) => {
    try {
        const cartClosed = await CartModel.findByIdAndUpdate(idCart, { isClosed: true }, { new: true });
        return cartClosed;
    } catch (error) {
        return error;
    }
}

export const cartDeleterById = async (idCart) => {
    try {
        const cart = await CartModel.findByIdAndDelete({_id: idCart});
        return cart;
    } catch (error) {
        return error;
    }
}
