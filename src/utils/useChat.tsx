import { Client } from '@stomp/stompjs'
import {
  createContext, PropsWithChildren, useContext, useEffect, useRef, useState,
} from 'react'

export type ChatMessage = {
  messageType: 'SERVER' | 'CLIENT' // 메시지 타입
  room: number // 방 ID
  senderId: number // 발신자 ID
  message: string // 메시지 내용
  createdAt?: string // 생성 시간 (서버에서 자동 설정)
}

type Chat = {
  messages: ChatMessage[]
}

const ChatContext = createContext<Chat>({
  messages: [],
})

type Actions = {
  send: (message: ChatMessage) => void
}

const ChatActions = createContext<Actions>({
  send: () => {},
})

export function useChat () {
  return useContext(ChatContext)
}

export function useChatActions () {
  return useContext(ChatActions)
}

export function ChatProvider ({ id, children }: { id: number } & PropsWithChildren) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const client = useRef<Client | null>(null)

  const connect = () => {
    // 1. 소켓 클라이언트 연결
    client.current = new Client({
      // brokerURL: 'ws://172.30.1.54:8080/ws',
      brokerURL: import.meta.env.VITE_SOCKET_URL,
      connectHeaders: {
        // withCredential: 'true',
      },
      debug: function (str) {
        console.log(str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })

    // 2. 클라이언트 활성화
    client.current.activate()

    // 3. 채팅방 구독
    client.current.onConnect = () => {
      client.current?.subscribe(
        `/topic/${id}`,
        (message) => {
          const chatMessage = JSON.parse(message.body)
          console.log('Received message:', chatMessage)
          setMessages(prev => [...prev, chatMessage])
        },
      )
    }
  }

  const disconnect = () => {
    client.current?.deactivate()
  }

  useEffect(() => {
    connect()
    return disconnect
  }, [])

  // 4. 메세지 전송
  const send = (message: ChatMessage) => {
    if (!client.current) return
    client.current.publish({
      destination: `/app/chat/sendMessage/${id}`,
      body: JSON.stringify(message),
      skipContentLengthHeader: true,
    })
  }

  return (
    <ChatContext.Provider value={{ messages }}>
      <ChatActions.Provider value={{
        send,
      }}
      >
        {children}
      </ChatActions.Provider>
    </ChatContext.Provider>
  )
}
