
import { CartModel } from '../../models/cart.models.js';

export const createCart = async (idClient) => {
    try {
        const newCart = new CartModel({ idClient: idClient });
        const cartCreated = await newCart.save();
        return cartCreated._id;
    } catch (error) {
        return error;

    }
}


export const closeCart = async (idCart) => {   
    try {
        const cartClosed = await CartModel.findByIdAndUpdate(idCart, { isClosed: true }, { new: true });
        return cartClosed;
    } catch (error) {
        return error;
    }
}