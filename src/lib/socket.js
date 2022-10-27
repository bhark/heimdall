import { io } from 'socket.io-client'
import { dev } from '$app/environment'

export const socket = io(dev ? 'http://localhost:5173' : 'https://heimdall.tetrabit.coop')