import { CartModel } from '../../models/cart.models.js';

export const getCarts = async (closeParams) => { 
    try {
        const closed = closeParams?.isClosed;
        const carts = await CartModel.find( closed === undefined? {} : { isClosed: closed })
        return carts;
    }
    catch (error) {
        return error;
    }   
}

export const cartGetterById = async (idCart) => {
    try {
        const cart = await CartModel.findById({_id: idCart});
        return cart;
    }
    catch (error) {
        return error;
    }
}