import "./src/config/db.config.js";
import express, { json, urlencoded, Router } from 'express';
import { productRouter, cartRouter , messagesRouter } from './src/routes/index.js';
import http from 'http'
const app = express()
const server = http.createServer(app)
//import './src/sockets/messagesSocket.js' ← no se como se integrara esto para hacer andar el cliente ocn un socket modularizadamente

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', messagesRouter)


const PORT = 8080
server.listen(PORT, () => {
    console.log('🤖 Server started on http://localhost:8080')
})
server.on('error', (err) => console.log(err))