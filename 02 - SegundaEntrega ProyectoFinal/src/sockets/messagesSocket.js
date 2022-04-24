//hacer
import {server} from '../../server.js'

import { Server } from 'socket.io';

export const io = new Server(server)

const usuariosConectados = [];


io.on('connection', async (socket) => {
  usuariosConectados.push(socket.id)
  console.log(`💻 nuevo usuario conectado, Total: ${usuariosConectados.length}`, usuariosConectados)

  const todosLosMensajes = await generalMsgs.getAll()
  console.log(todosLosMensajes)
  socket.emit('todosLosMensajes', todosLosMensajes)


  
  socket.on('productAdded', async (id) => {
    const todosLosProductos = await productos1.getAll()
    console.log(id , ' Acaba de Mandar un producto')
    io.sockets.emit('todosLosProductos', {
      productos: todosLosProductos,
      idProductoAgregado: productos1.lastId
    })
  })
  socket.on('inputChatCliente', async (fullMessage) => {
    await generalMsgs.save(fullMessage)
    const todosLosMensajes = await generalMsgs.getAll()
    io.sockets.emit('todosLosMensajes', todosLosMensajes)

  })

  socket.on('disconnect', () => {
    console.log('❌ Usuario desconectado')
    usuariosConectados.splice(socket.id)
  })
})
