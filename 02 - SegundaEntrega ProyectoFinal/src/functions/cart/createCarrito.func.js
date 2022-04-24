
import { CartModel } from '../../models/cart.models.js';

export const cartCreator = async (idClient) => {
    try {
        const timestamp = new Date().toLocaleString();
        const newCart = new CartModel({ idClient: idClient , timestamp: timestamp, totalPrice: 0 });
        const cartCreated = await newCart.save();
        return cartCreated._id;
    } catch (error) {
        return error;

    }
}


