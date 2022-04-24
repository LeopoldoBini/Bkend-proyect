import "../config/db.config.js";
import fs from "fs";
import { saveManyMessages } from "./messages/index.js";

const messages = fs.readFileSync('./src/functions/mensajes.json', 'utf-8');

//console.log(await saveManyMessages(JSON.parse(messages)))