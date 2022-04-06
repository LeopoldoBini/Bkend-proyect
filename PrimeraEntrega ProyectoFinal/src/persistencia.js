const fs = require("fs");
// clases e instancia de clases
const ContenedorProductos = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.json`;
    this.lastId = 0;
    this.productos = [];
    this.prodKeysFormat = [
      "codigo",
      "title",
      "price",
      "description",
      "thumbnail",
      "category",
      "stock"
    ];
  }
  readDB = () => {
    try{
      let json = fs.readFileSync(this.path, "utf8");
      return JSON.parse(json);
    } catch (error){
      console.error("Algo salió mal leyendo la db" ,error)
      return 
    }
  }
  writeDB() {
    const strigyList = JSON.stringify(this.productos);
    fs.writeFileSync(this.path, strigyList);
    this.getAll();
  }
  getAll() {
    
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
      return [];
    }
    const parsedData = this.readDB();
    if (parsedData.length > 0) {
      this.lastId = Math.max(...parsedData.map((prod) => prod.id));
      this.productos = parsedData;  
    }
    return this.productos;
  }
  createProducto(producto) {
    if (!producto || Object.keys(producto).length !== this.prodKeysFormat.length) {
      throw new TypeError(`Formato Invalido ,se requieren solo todos estos campos : "${this.prodKeysFormat}"`);
    }

    const isAValidProduct = this.prodKeysFormat.reduce(
      (reducingBoolean, key) => {
        const thisKeyValue = producto[key];
        let isThisValueAcceptable;

        switch (key) {
          case "stock":
            if (Number(thisKeyValue) < 0)  {
              throw new RangeError("El Stock debe ser un Numero mayor o igual a 0")
            }
            isThisValueAcceptable = true;
            break;
          case "price":
            if (Number(thisKeyValue) <= 0)  {
              throw new RangeError("El precio debe ser un Numero mayor que 0")
            }
            isThisValueAcceptable = true;
            break;
          default:
            isThisValueAcceptable = !!thisKeyValue;
        }

        return reducingBoolean && isThisValueAcceptable;
      },
      true
    );
    if (!isAValidProduct) {
      throw new TypeError(`Formato Invalido ,se requieren estos campos : "${this.prodKeysFormat}"`);
    }

    ;
    const timestamp = new Date().toLocaleString()
    producto.id = ++this.lastId;
    producto.timestamp = timestamp;
    this.productos.push(producto);
    this.writeDB();
    return producto.id;
  }
  getProductoById(id) {
    const foundProduct = this.productos.filter((producto) => producto.id == id);
    return foundProduct.length === 0 ? false : foundProduct;
  }
  updateProducto(id, producto) {
    const indexToUpdate = this.productos.findIndex((prod) => prod.id == id);
    if (indexToUpdate === -1) {
      throw new RangeError("No se encontró el producto");
    }
    if (!producto) {
      throw new TypeError("Formato Invalido");
    }
    
    const keysForUpdating = Object.keys(producto);
    let keysOutOfPlace =[]


    const areKeysForUpdatingValid = keysForUpdating.reduce((prev, curr) =>{
      const curBool = this.prodKeysFormat.includes(curr)
      if (!curBool) keysOutOfPlace.push(curr)
      return prev && curBool
    }, keysForUpdating.length === 0 ? false : true)

    if(!areKeysForUpdatingValid){
      throw new TypeError(keysOutOfPlace.length > 0 ? `Campos invalidos: [ ${keysOutOfPlace} ]` : "Formato Invalido")
    }

    keysForUpdating.forEach((key) => {
      const thisKeyValue = producto[key];

      switch (key) {
        case "stock":
          if (Number(thisKeyValue) < 0)  {
            throw new RangeError("El Stock no puede ser menor que 0")
          }
          this.productos[indexToUpdate][key] = thisKeyValue ;
          break;
        case "price":
          if (Number(thisKeyValue) <= 0)  {
            throw new RangeError("El precio no puede ser 0 o menor")
          }
          this.productos[indexToUpdate][key] = thisKeyValue ;
          break;
        default:
          thisKeyValue
          ? this.productos[indexToUpdate][key] = thisKeyValue 
          : null
      }

    });
    this.writeDB();
    return {
      mensaje: "producto actualizado",
      producto: this.productos[indexToUpdate],
    };
  }
  deleteProductoById(id) {
    const indexToDelete = this.productos.findIndex((prod) => prod.id == id);
    if (indexToDelete === -1) {
      throw new Error("El Producto no existe");
    }
    const deletedProduct = this.productos.splice(indexToDelete, 1);
    
    this.writeDB();
    return {
      mensaje: "producto eliminado",
      producto: deletedProduct,
    };
  }
  deleteAll() {
    this.lastId = 0;
    this.productos = [];
    this.writeDB();
  }
};

const ContenedorCarrito = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.txt`;
    this.lastId = 0;
    this.closedCarritos = [];
    this.idList = [];
    this.currentCarritos = [];
    this.currentCarritosIdList = [];
  }
  getAll() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);

      this.idList = parsedData.reduce((a, b) => [...a, b.id], []);
      this.lastId = Math.max(...this.idList);
      this.closedCarritos = parsedData;

      return parsedData;
    } catch (er) {
      fs.writeFileSync(this.path, "[]");
      console.log(er);
      return [];
    }
  }
  createCarrito(idCliente, carritoElement) {
    this.getAll();
    ++ this.lastId;
    const timestamp = new Date().toLocaleString();
    const carrito = {
      id: this.lastId,
      timestamp,
      idCliente: idCliente,
      lista: carritoElement ? [carritoElement] : [],
    };
    this.currentCarritos.push(carrito);
    return carrito.id;
  }
  findCarritoIndexById(id) {
    const foundCarritoIndex = this.currentCarritos.findIndex(
      (carrito) => carrito.id == id
    );
    return foundCarritoIndex;
  }
  deleteCarrito(id) {
    this.getAll();
    const indexToDelete = this.findCarritoIndexById(id);
    if (indexToDelete === -1) {
      throw new Error("no tenemos ese carrito abierto actualmente");
    }
    const deletedCarrito = this.currentCarritos.splice(indexToDelete, 1);
    return {
      mensaje: "carrito eliminado",
      carrito: deletedCarrito,
    };
  }
  getCarritoById(id) {
    const foundCarrito = this.currentCarritos.filter(
      (carrito) => carrito.id == id
    );
    return foundCarrito.length === 0
      ? "no tenemos ningun carrito con ese id"
      : foundCarrito;
  }
  addProductoToCarrito(idCliente, producto, quantity, idCarrito) {
    const carritoElement = {
      idProducto: producto.id,
      producto,
      quantity,
    };
    const foundCarritoIndex = this.findCarritoIndexById(idCarrito);
    if (foundCarritoIndex === -1) {
      const newCarritoId = this.createCarrito(idCliente, carritoElement);
      return {
        mensaje: "Carrito creado, producto agregado al carrito",
        idCarrito: newCarritoId,
      };
    }
    this.currentCarritos[foundCarritoIndex].lista.push(carritoElement);
    return {
      mensaje: "producto agregado",
      lista: this.currentCarritos[foundCarritoIndex].lista,
    };
  }
  deleteProductFromCarrito(idCarrito, idProducto) {
    const foundCarritoIndex = this.findCarritoIndexById(idCarrito);
    if (foundCarrito === -1) {
      return { mensaje: "no tenemos ese carrito" };
    }
    const foundProductIndex = this.currentCarritos[
      foundCarritoIndex
    ].lista.findIndex((producto) => producto.idProducto == idProducto);
    if (foundProductIndex === -1) {
      return { mensaje: "no tenemos ese producto en el carrito" };
    }
    const deletedProduct = this.currentCarritos[foundCarritoIndex].lista.splice(
      foundProductIndex,
      1
    );
    return {
      mensaje: "producto eliminado",
      producto: deletedProduct,
    };
  }
  writeCarritoOnFile() {
    const strigyList = JSON.stringify(this.closedCarritos);
    fs.writeFileSync(this.path, strigyList);
  }
  closeCarrito(idCarrito) {
    const foundCarritoIndex = this.findCarritoIndexById(idCarrito);
    if (foundCarrito === -1) {
      return { mensaje: "no tenemos ese carrito" };
    }
    const closedCarrito = this.currentCarritos.splice(foundCarritoIndex, 1);
    this.closedCarritos.push(closedCarrito[0]);
    this.writeCarritosOnFile();
    this.getAll();
    return {
      mensaje: "carrito cerrado",
      carrito: closedCarrito[0],
    };
  }
};

exports.productsContainer = new ContenedorProductos("productos");
exports.carritosContainer = new ContenedorCarrito("carritos");
