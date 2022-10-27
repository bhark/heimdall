import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { handler } from './build/handler.js'
import { routes } from './socket.routes.js'

const port = 3050
const app = express()
const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => routes(socket, io))

app.use(handler)

server.listen(port)

