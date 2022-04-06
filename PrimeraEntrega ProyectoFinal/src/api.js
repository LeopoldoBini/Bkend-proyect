//callbacks de las rutas
const { productsContainer : pc, carritosContainer : cc } = require("./persistencia");

//Api Productos


exports.getProducts = (req, res) => {
    
    const id = req.params.id;
    if (id) {
    const producto = pc.getProductoById(id);
    producto
        ? res.status(200).json(producto)
        : res.status(404).json({ mensaje: "No se encontró el producto" });
        return;
    }
    res.status(200).json(pc.getAll());
}


exports.addProduct = (req, res) => {
    const producto = req.body;
    try{
        const id = pc.createProducto(producto);
        res.status(201).json({ mensaje: "Producto creado", id });
    }catch(error){
        res.status(400).json({ mensaje: error.message, attemptedProduct: producto });

    }

}


exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    try{
        res.status(200).json(pc.updateProducto(id, producto));
    }catch(error){
        res.status(404).json({mensaje: error.message});
        
    }
}


exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    try{
        res.status(200).json(pc.deleteProductoById(id));
    }catch(error){
        res.status(404).json({ mensaje: error.message });
    }
}


//Api Carrito
exports.createCarrito = (req, res) => {
    const body = req.body;
    const idCliente = req.client._peername.address || req.connection.remoteAddress;
        try {
            const idCarrito = cc.createCarrito(
                idCliente, 
                'carritoElement' in body 
                ? body.carritoElement
                : null);
            res.status(201).json({ mensaje: "Carrito creado", idCarrito });
        }
        catch (error) {
            res.status(400).json({ mensaje: error.message });
        }
}


exports.deleteCarrito = (req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json(cc.deleteCarrito(id));
    }
    catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}


exports.getCarritoProducts = (req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json(cc.getCarritoById(id).lista);
    }
    catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}


exports.addProductToCarrito = (req, res) => {
    const body = req.body;
    const idCliente = body.idCliente;
    const producto = body.producto;
    const quantity = body.quantity;
    const idCarrito = body.idCarrito;
    try {
        res.status(200).json(cc.addProductoToCarrito(idCliente, producto, quantity, idCarrito));
    }
    catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}
exports.deleteProductFromCarrito = (req, res) => {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    try {
        res.status(200).json(cc.deleteProductFromCarrito(idCarrito, idProducto));
    }
    catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}













