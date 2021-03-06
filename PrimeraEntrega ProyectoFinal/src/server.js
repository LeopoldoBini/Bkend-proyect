const express = require('express')
const { productsContainer : pc, carritosContainer : cc } = require("./persistencia");
const { getProducts, addProduct, updateProduct, deleteProduct, createCarrito, deleteCarrito, getCarritoProducts, addProductToCarrito, deleteProductFromCarrito, closeCarrito } = require('./api')

pc.getAll()
cc.getAllClosedCarritos()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const apiProd = express.Router();
const apiCart = express.Router();
app.use("/api/productos", apiProd);
app.use("/api/carrito", apiCart);



apiProd.get("/", getProducts)
apiProd.get("/:id", getProducts)

apiProd.post("/", addProduct) //Solo admin

apiProd.put("/:id", updateProduct) //Solo admin

apiProd.delete("/:id", deleteProduct) //Solo admin

//api Carrito
apiCart.post("/", createCarrito)

apiCart.delete("/:id", deleteCarrito)

apiCart.post("/:id/productos", addProductToCarrito)

apiCart.get("/:id/productos", getCarritoProducts)

apiCart.delete("/:idCarrito/productos/:idProducto", deleteProductFromCarrito)

apiCart.put("/:idCarrito/", closeCarrito)




const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('🤖 Server started on http://localhost:8080')
})
server.on('error', (err) => console.log(err))