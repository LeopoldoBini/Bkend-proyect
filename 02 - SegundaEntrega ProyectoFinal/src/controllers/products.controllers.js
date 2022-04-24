import {  getProducts, productCreator, getProductById, productsUpdater  , productsDeactivetor} from "../functions/products/index.js";

export const productsGetter = async (req, res ) => {
    try {
        const id = req.params?.id;
        if (id) {
            const producto = await getProductById(id);
            producto
                ? res.status(200).json(producto)
                : res.status(404).json({ mensaje: "No se encontró el producto" });
            return;
        }
        const productos = await getProducts();
        console.log(productos)
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message , error });
    }
};

export const addProduct = async (req, res) => {
    try {
        const producto = req.body;
        console.log(producto, "del body")
        const id = await productCreator(producto);
        res.status(201).json({ mensaje: "Producto creado", id });
    } catch (error) {
        res.status(400).json({ mensaje: error.message , error });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = req.body;
        res.status(200).json(productsUpdater(id, producto));
    } catch (error) {
        res.status(404).json({ mensaje: error.message , error });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        res.status(200).json(productsDeactivetor(id));
    } catch (error) {
        res.status(404).json({ mensaje: error.message , error });
    }
}


