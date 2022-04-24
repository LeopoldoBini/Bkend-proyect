import "../config/db.config.js";
import fs from "fs";
import {createManyProducts} from "./products/index.js";

const productsToInsert = fs.readFileSync('./productos.json', 'utf-8');

//createManyProducts(JSON.parse(productsToInsert));