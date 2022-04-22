import { CartModel } from '../../models/cart.models.js';

export const getCarts = async (isClosed) => { 
    try {
        const carts = await CartModel.find( isClosed === undefined ? {} : { isClosed: isClosed })
        return carts;
    }
    catch (error) {
        return error;
    }   
}

export const getCartById = async (idCart) => {
    try {
        const cart = await CartModel.findById({_id: idCart});
        return cart;
    }
    catch (error) {
        return error;
    }
}