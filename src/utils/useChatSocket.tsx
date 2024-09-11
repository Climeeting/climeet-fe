import {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react'
import { chatSocket } from './socket'
import { Socket } from 'socket.io-client'

export type SocketItem = {
  room: number
  socket: Socket
  isConnected: boolean
}
type Sockets = {
  [key: number]: SocketItem
}
const SocketsContext = createContext<Sockets>({})

type Actions = {
  add: (chat: SocketItem) => void
  remove: (room: number) => void
}
const SocketsActions = createContext<Actions>({
  add: () => {},
  remove: () => {},
})

export type ChatSocket = {
  room: number
  socket?: Socket
  isConnected: boolean
  messages: unknown[]
}

export default function useChatSocket ({ room, senderId }: { room: number, senderId: number }): ChatSocket {
  const sockets = useSockets()
  const [socket, setSocket] = useState<Socket>()
  const { add, remove } = useSocketActions()

  useEffect(() => {
    if (sockets[room]) {
      setSocket(sockets[room].socket)
      return
    }

    if (room && senderId) {
      const newSocket = chatSocket(room, String(senderId))
      setSocket(newSocket)
      add({ room, socket: newSocket, isConnected })
    }

    return () => {
      if (socket) {
        socket.disconnect()
        remove(room)
      }
    }
  }, [room, senderId])

  const isConnected = useChatConnect(socket)
  const messages = useChatMessage(socket)

  return {
    room,
    socket,
    isConnected,
    messages,
  }
}

function useSockets () {
  const sockets = useContext(SocketsContext)

  if (sockets === undefined) {
    throw new Error('useSocket must be used within a ChatsSocketProvider')
  }

  return sockets
}

export function useSocketActions () {
  const actions = useContext(SocketsActions)
  if (actions === undefined) {
    throw new Error('useSocketActions must be used within a ChatsSocketProvider')
  }
  return actions
}

export function ChatsSocketProvider ({ children }: { children: React.ReactNode }) {
  const [sockets, setSockets] = useState<Sockets>({})

  const add = useCallback((socketItem: SocketItem) => {
    setSockets((previous) => {
      previous[socketItem.room] = socketItem
      return previous
    })
  }, [])

  const remove = useCallback((room: number) => {
    setSockets((previous) => {
      delete previous[room]
      return previous
    })
  }, [])

  return (
    <SocketsContext.Provider value={sockets}>
      <SocketsActions.Provider value={{
        add,
        remove,
      }}
      >
        {children}
      </SocketsActions.Provider>
    </SocketsContext.Provider>
  )
}

function useChatConnect (socket?: Socket) {
  const [isConnected, setIsConnected] = useState(false)

  const onConnect = useCallback(() => {
    setIsConnected(true)
  }, [])

  useEffect(function connectSocket () {
    if (socket) socket.connect()
    return () => {
      if (socket) socket.off('connect', onConnect)
    }
  }, [socket])

  const onDisconnect = useCallback(() => {
    setIsConnected(false)
  }, [])

  useEffect(function disconnectSocket () {
    if (socket) socket.on('disconnect', onDisconnect)
    return () => {
      if (socket) socket.off('disconnect', onDisconnect)
    }
  }, [socket])

  return isConnected
}

function useChatMessage (socket?: Socket) {
  const [messages, setMessages] = useState<unknown[]>([])

  const onMessage = useCallback((data: unknown) => {
    console.log('New message received:', data)
    setMessages((previous: unknown[]) => [...previous, data])
  }, [])

  useEffect(function message () {
    const ping = () => {
      console.log('Ping received')
    }
    if (socket) socket.on('ping', ping)

    return () => {
      if (socket) socket.off('ping', ping)
    }
  }, [socket])

  useEffect(function message () {
    if (socket) socket.on('message', onMessage)

    return () => {
      if (socket) socket.off('message', onMessage)
    }
  }, [socket])

  useEffect(function message () {
    if (socket) {
      socket.on('read_message', onMessage)
    }

    return () => {
      if (socket) socket.off('read_message', onMessage)
    }
  }, [socket])

  return messages
}
