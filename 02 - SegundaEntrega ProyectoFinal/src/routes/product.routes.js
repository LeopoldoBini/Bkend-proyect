import express from 'express'
import { productsGetter, addProduct,  updateProduct, deleteProductById } from '../controllers/products.controllers.js'
import { verifyToken } from '../middlewares/index.js'

export const productRouter = express.Router()

productRouter.get('/products', productsGetter)
productRouter.get('/products/:id', productsGetter)
productRouter.post('/products', verifyToken, addProduct)
productRouter.put('/products/:id', verifyToken, updateProduct)
productRouter.delete('/products/:id', verifyToken, deleteProductById)