import express from 'express'
import {createCart, closeCart, deleteCartById, getProductListByCartId ,addProductOnCart , removeProductFromCart} from '../controllers/index.js' 

export const cartRouter = express.Router()

cartRouter.post('/cart', createCart)
cartRouter.delete('/cart/close/:id', closeCart)
cartRouter.delete('/cart/delete/:id', deleteCartById)
cartRouter.get('/cart/:id/products', getProductListByCartId)
cartRouter.post('/cart/:id/products/:productId', addProductOnCart)
cartRouter.delete('/cart/:id/products/:productId', removeProductFromCart)
