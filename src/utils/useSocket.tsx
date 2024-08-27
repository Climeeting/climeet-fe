import {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react'
import { chatSocket } from './socket'
import { Socket } from 'socket.io-client'
import { useMyProfile } from '@/services/user'

export type Chat = {
  id: number
  messages: unknown[]
  isConnected: boolean
}
type Sockets = {
  [key: number]: Chat
}
const SocketsContext = createContext<Sockets>({})

type Actions = {
  add: (chat: Chat) => void
  update: (chat: Partial<Chat> & { id: number }) => void
  remove: (id: number) => void
}
const SocketsActions = createContext<Actions>({
  add: () => {},
  update: () => {},
  remove: () => {},
})

export function useChat (id?: number) {
  const sockets = useContext(SocketsContext)

  if (sockets === undefined) {
    throw new Error('useSocket must be used within a ChatsSocketProvider')
  }

  if (id) {
    return sockets[id] || { id, messages: [], isConnected: false }
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

  const add = useCallback((chat: Chat) => {
    setSockets((previous) => {
      previous[chat.id] = chat
      return previous
    })
  }, [])

  const remove = useCallback((id: number) => {
    setSockets((previous) => {
      delete previous[id]
      return previous
    })
  }, [])

  const update = useCallback((chat: Partial<Chat> & { id: number }) => {
    setSockets((previous) => {
      previous[chat.id] = { ...previous[chat.id], ...chat }
      return previous
    })
  }, [])

  return (
    <SocketsContext.Provider value={sockets}>
      <SocketsActions.Provider value={{
        add,
        remove,
        update,
      }}
      >
        {children}
      </SocketsActions.Provider>
    </SocketsContext.Provider>
  )
}

export function ChatSocket ({ id, children }: { id: number, children: React.ReactNode }) {
  const { add, update } = useSocketActions()
  const { socket, isConnected, messages } = useChatSocket(id)

  console.log({ id, messages, isConnected })

  useEffect(() => {
    add({ id, messages, isConnected })
  }, [socket])

  useEffect(() => {
    update({ id, messages, isConnected })
  }, [id, messages, isConnected])

  return children
}

function useChatSocket (id: number) {
  const [socket, setSocket] = useState<Socket>()
  const { data } = useMyProfile()

  useEffect(() => {
    if (id && data?.userId) setSocket(chatSocket(id, data.nickname))
  }, [id, data?.userId])

  const isConnected = useChatConnect(socket)
  const messages = useChatMessage(socket)

  return {
    socket,
    isConnected,
    messages,
  }
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
    if (socket) socket.on('message', onMessage)

    return () => {
      if (socket) socket.off('message', onMessage)
    }
  }, [])

  return messages
}
