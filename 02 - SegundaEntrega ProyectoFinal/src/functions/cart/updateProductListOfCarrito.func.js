import { CartModel } from '../../models/cart.models.js';
import { getProductById } from '../products/getProducts.func.js';

export const cartProductAdder = async (idCart, idProduct, quantityToAdd) => {
    try {
        const cart = await CartModel.findById({_id: idCart});
        const prod = cart.productsList.find(product => product.idProduct === idProduct);
        if (prod) {
            prod.quantity += quantityToAdd;
            cart.totalPrice += quantityToAdd * prod.product.price;
        } else {
            const fullProduct = await getProductById(idProduct);
            const cartElement = { 
                idProduct: idProduct,
                product: fullProduct,
                quantity: quantityToAdd }
            cart.productsList.push(cartElement);
            cart.totalPrice += quantityToAdd * fullProduct.price;
            cart.quantityOfDifferentProducts += 1;
        }
        const cartUpdated = await CartModel.findByIdAndUpdate({_id: idCart}, cart, { new: true });
        return cartUpdated.productsList;

    } catch (error) {
        return error;
    }
} 

export const cartProductRemover = async (idCart, idProduct, quantityToRemove) => {
    try {
        const cart = await CartModel.findById({_id: idCart});
        const prod = cart.productsList.find(product => product.idProduct === idProduct);
        if (prod) {
            prod.quantity -= quantityToRemove;
            cart.totalPrice -= quantityToRemove * prod.product.price;
            if (prod.quantity <= 0) {
                cart.productsList = cart.productsList.filter(product => product.idProduct !== idProduct);
                cart.quantityOfDifferentProducts -= 1;
            }
        }
        const cartUpdated = await CartModel.findByIdAndUpdate({_id: idCart}, cart, { new: true });
        return cartUpdated.productsList;

    } catch (error) {
        return error;
    }
}