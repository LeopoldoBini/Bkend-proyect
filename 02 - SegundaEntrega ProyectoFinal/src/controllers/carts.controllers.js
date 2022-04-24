import { cartCreator, cartCloser ,cartDeleterById , cartGetterById , cartProductAdder, cartProductRemover } from '../functions/cart/index.js';

export const createCart = async (req, res) => {
    try {
        const idClient = req.body.idClient;
        const cartCreatedId = await cartCreator(idClient);
        res.status(200).json({
            message: 'Cart created',
            cartCreatedId
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error })
    }
}
export const closeCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const cartClosed = await cartCloser(idCart);
        res.status(200).json({
            message: 'Cart closed',
            cartClosed
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error })
    }
}
export const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const cartDeleted = await cartDeleterById(idCart);
        res.status(200).json({
            message: 'Cart deleted',
            cartDeleted
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error })
    }
}
export const getProductListByCartId = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const cart = await cartGetterById(idCart);
        const productList = cart.productList;
        res.status(200).json({
            message: 'Cart found',
            productList
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error })
    }
}
export const addProductOnCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const idProduct = req.body.idProduct;
        const quantity = req.body.quantity;
        const updatedProductList = await cartProductAdder(idCart, idProduct, quantity);
        res.status(200).json({
            message: 'Product added',
            updatedProductList
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error })
    }
}
export const removeProductFromCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const idProduct = req.body.idProduct;
        const quantity = req.body.quantity;
        const updatedProductList = await cartProductRemover(idCart, idProduct, quantity);
        res.status(200).json({
            message: 'Product removed',
            updatedProductList
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error })
    }
    
}