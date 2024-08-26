import { Manager, io } from 'socket.io-client'

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

export const socketManager = new Manager(VITE_SOCKET_URL)

export const chatSocket = (room: number, senderName: string) => {
  return io(VITE_SOCKET_URL, {
    query: {
      room,
      senderName,
    },
  })
}
