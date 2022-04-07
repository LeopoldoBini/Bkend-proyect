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
  readDB () {
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


    if (!(Array.isArray(parsedData)) || parsedData.length === 0) {
      if(Array.isArray(this.productos) && this.productos.length > 0){
      this.writeDB();
      return this.productos;
      }
      return [];  
  }
    this.productos = parsedData;  
    this.lastId = Math.max(...parsedData.map((prod) => prod.id));
    return this.productos;
  }
  isAValidProduct(producto) { 
    const isValid = this.prodKeysFormat.reduce(
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
    },true)
    return isValid
  };
  createProducto(producto) {
    if (!producto || Object.keys(producto).length !== this.prodKeysFormat.length) {
      throw new TypeError(`Formato Invalido ,se requieren solo todos estos campos : "${this.prodKeysFormat}"`);
    }
    const isAValidProduct = this.isAValidProduct(producto);
    if (!isAValidProduct) {
      throw new TypeError(`Formato Invalido ,se requieren estos campos : "${this.prodKeysFormat}"`);
    }
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
    this.path = `./${nombreArchivo}.json`; //persistencia de carritos cerrados / comprados
    this.lastId = 0;
    this.closedCarritos = [];
    this.idList = [];
    this.currentCarritos = [];
    this.currentCarritosIdList = [];
    this.cartKeysFormat = [
      "lista",
      "idCliente"
    ];
  }
  readDB () {
    try{
      let json = fs.readFileSync(this.path, "utf8");
      return JSON.parse(json);
    } catch (error){
      console.error("Algo salió mal leyendo la db" ,error)
      return  
    }
  }
  writeDB() {
    const strigyList = JSON.stringify(this.closedCarritos);
    fs.writeFileSync(this.path, strigyList);
    this.getAllClosedCarritos();
  }
  getAllClosedCarritos() {
    
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
      return [];
    }
    const parsedData = this.readDB();
    
    if (!(Array.isArray(parsedData)) || parsedData.length === 0) {
        if(Array.isArray(this.closedCarritos) && this.closedCarritos.length > 0){
        this.writeDB();
        return this.closedCarritos;
        }
        return [];  
    }

    this.closedCarritos = parsedData;  
    this.lastId = Math.max(...parsedData.map((cart) => cart.id));
    return this.closedCarritos;
  
  }
  createCarrito(idCliente, carritoElement) {
    // this.getAllClosedCarritos()
    const timestamp = new Date().toLocaleString();
    const carrito = {
      id: ++ this.lastId,
      timestamp,
      idCliente: idCliente,
      lista: carritoElement ? [carritoElement] : [],
    };
    this.currentCarritos.push(carrito);
    console.log(this.currentCarritos)
    return carrito.id;
  }
  findCurrentCarritoIndexById(id) {
    const foundCarritoIndex = this.currentCarritos.findIndex(
      (carrito) => carrito.id == id
    );
    return foundCarritoIndex;
  }
  deleteCarrito(id) {
    //this.getAllClosedCarritos();
    const indexToDelete = this.findCurrentCarritoIndexById(id);
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
      : foundCarrito[0];
  }
  addProductoToCarrito( carritoElement , idCarrito) {

    const foundCarritoIndex = this.findCurrentCarritoIndexById(idCarrito);
    if (foundCarritoIndex === -1) {
      const newCarritoId = this.createCarrito(idCliente, carritoElement);
      return {
        mensaje: "Carrito creado, producto agregado al carrito",
        idCarrito: newCarritoId,
      };
    }
    const idProductToAdd = carritoElement.idProducto;
    const foundCarrito = this.currentCarritos[foundCarritoIndex];
    const foundCarritoList = foundCarrito.lista;
    const foundCarritoListIds = foundCarritoList.map((element) => element.idProducto);

    if(foundCarritoListIds.includes(idProductToAdd)){
      const foundCarritoElement = foundCarritoList.find(
        (element) => element.idProducto == idProductToAdd
      );
      foundCarritoElement.quantity += carritoElement.quantity;
      return {
        mensaje: "Cantidades Agregadas",
        lista: foundCarritoList,
      }
    }
    foundCarritoList.push(carritoElement);
    return {
      mensaje: "producto agregado",
      lista: foundCarritoList,
    };
  }
  deleteProductFromCarrito(idCarrito, idProducto) {
    const foundCarritoIndex = this.findCurrentCarritoIndexById(idCarrito);
    if (foundCarritoIndex === -1) {
      return { mensaje: "no tenemos ese carrito" };
    }
    const foundCarrito = this.currentCarritos[foundCarritoIndex];
    const foundProductIndex = foundCarrito.lista.findIndex((producto) => producto.idProducto == idProducto);
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
    const foundCarritoIndex = this.findCurrentCarritoIndexById(idCarrito);
    if (foundCarrito === -1) {
      return { mensaje: "no tenemos ese carrito" };
    }
    const closedCarrito = this.currentCarritos.splice(foundCarritoIndex, 1);
    this.closedCarritos.push(closedCarrito[0]);
    this.writeCarritosOnFile();
    this.getAllClosedCarritos();
    return {
      mensaje: "carrito cerrado",
      carrito: closedCarrito[0],
    };
  }
};

exports.productsContainer = new ContenedorProductos("productos");
exports.carritosContainer = new ContenedorCarrito("carritos");
