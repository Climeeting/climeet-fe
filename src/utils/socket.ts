import { Manager, Socket, io } from 'socket.io-client'

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

export const socketManager = new Manager(VITE_SOCKET_URL)

export const chatSocket = (room: number, senderId: string) => {
  return io(VITE_SOCKET_URL, {
    query: {
      room,
      senderId,
    },
  })
}

export const sendChatMessage = ({ socket, ...prams }: { socket: Socket, room: number, senderId: number, message: string }) => {
  socket.emit('send_message', {
    messageType: 'CLIENT',
    ...prams,
  })
}
