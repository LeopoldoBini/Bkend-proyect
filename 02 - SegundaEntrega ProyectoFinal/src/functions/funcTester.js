import "../config/db.config.js";
import {  createProduct, updateProduct , createManyProducts , deleteProductById} from "./products/index.js";
import {  createCart, getCarts, getCartById, closeCart, deleteCarritoById, addProductToCart, removeProductFromCart  } from "./cart/index.js";
import {  getMessages, saveMessage, saveManyMessages } from "./messages/index.js";

/* response = await createProduct({
codigo: 13245,
title: "producto de Prueba",
price: 1235,
description: "el mejor coso",
thumbnail: "www.google.com",
category: "electronicos",
stock: 10,
}) */
/* const response = await updateProduct( "62642f545f9c83d006623742", {
    title: "producto updated",
    price: 5000,
}); */
//const response = await deleteProductById("62642f545f9c83d006623742");
//const response = await createCart("3")
//const response = await closeCart("62646895c9408449e9316664");
//const response = await getCarts();
//const response = await getCartById("62646895c9408449e9316664")
//const response = await addProductToCart("62646895c9408449e9316664", "6263636e93eae6abb6c616bf", 1);
//const response = await removeProductFromCart("62646895c9408449e9316664", "6263636e93eae6abb6c616bf", 1);
//const response = await saveMessage({  email : "n@n.com",text : "hola"});
//const response = await getMessages({email:"Margarita_Acevedo58@hotmail.com"});	



console.log(response);
