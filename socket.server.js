import { Server } from 'socket.io'
import { routes } from './socket.routes'

const url = 'http://localhost:5173/'

const colors = [
    '#bf616a',
    '#a3be8c',
    '#ebcb8b',
    '#8fa1b3',
    '#b48ead',
    '#96b5b4'
]

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        const io = new Server(server.httpServer)

        io.on('connection', (socket) => routes(socket, io))

        console.log('-> SocketIO injected and ready')
    }
}