import express, { json, urlencoded, Router } from 'express';
import { productsContainer as pc, carritosContainer as cc } from "./src/persistencia";
import { getProducts, addProduct, updateProduct, deleteProduct, createCarrito, deleteCarrito, getCarritoProducts, addProductToCarrito, deleteProductFromCarrito } from './src/api';

pc.getAll()
cc.getAll()

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
const apiProd = Router();
const apiCart = Router();
app.use("/api/productos", apiProd);
app.use("/api/carrito", apiCart);

apiProd.get("/:id", getProducts)

apiProd.post("/", addProduct) //Solo admin

apiProd.put("/:id", updateProduct) //Solo admin

apiProd.delete("/:id", deleteProduct) //Solo admin

//api Carrito
apiCart.post("/", createCarrito)

apiCart.delete("/:id", deleteCarrito)

apiCart.get("/:id/productos", getCarritoProducts)

apiCart.post("/:id/productos", addProductToCarrito)

apiCart.delete("/:id/productos/:idProducto", deleteProductFromCarrito)




const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('🤖 Server started on http://localhost:8080')
})
server.on('error', (err) => console.log(err))