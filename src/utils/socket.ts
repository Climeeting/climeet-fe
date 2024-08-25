import { io } from 'socket.io-client'

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

console.log({ VITE_SOCKET_URL })
export const socket = io(VITE_SOCKET_URL)
