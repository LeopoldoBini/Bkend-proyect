// create a funtion that pushes a cartElement with the structure {idProduct, product , quantity} into the "productsList" of a cart in the "carts" collection  and actualices: the total price value and the quantityOfDifferentProducts of the cart using mongoose
//REVISAR
import { CartModel } from '../../models/cart.models.js';

export const addProductToCarrito = async (idCart, idProduct, quantityToAdd) => {
    try {
        const cart = await CartModel.findById({_id: idCart});
        const product = cart.productsList.find(product => product.idProduct === idProduct);
        if (product) {
            product.quantity += quantityToAdd;
            cart.totalPrice += quantityToAdd * product.product.price;
            cart.quantityOfDifferentProducts += quantityToAdd;
        } else {
            cart.productsList.push({ idProduct: idProduct, product: {}, quantity: quantityToAdd });
            cart.totalPrice += quantityToAdd * product.product.price;
            cart.quantityOfDifferentProducts += quantityToAdd;
        }
        const cartUpdated = await CartModel.findByIdAndUpdate({_id: idCart}, cart, { new: true });
        return cartUpdated;
    } catch (error) {
        return error;
    }
} 
