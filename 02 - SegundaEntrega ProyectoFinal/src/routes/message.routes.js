import express from 'express'
import { getMessages , saveMessage } from '../controllers/index.js'


export const messagesRouter = express.Router()

messagesRouter.get('/products', getMessages)
messagesRouter.post('/products/:id', saveMessage)
