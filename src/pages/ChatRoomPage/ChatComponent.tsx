import { useState } from 'react'
import { ChatProvider, useChat, useChatActions } from '@/utils/useChat'
import { SendMessage } from '@/utils/chat'

const senderId = new Date().getSeconds()

const ChatComponent = () => {
  const { messages } = useChat()
  const { send } = useChatActions()
  const [message, setMessage] = useState('')

  return (
    <div>
      <h1>채팅방</h1>
      <div style={{ border: '1px solid #ccc', height: '300px', overflow: 'scroll' }} className='chat-box'>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type='text'
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{
          border: '1px solid black',
        }}
      />
      <button onClick={() => {
        if (message.trim()) {
          const chatMessage: SendMessage = {
            messageType: 'CLIENT',
            room: 2, // 실제 방 ID
            senderId, // 발신자 ID
            message: message.trim(),
          }

          send(chatMessage)
          setMessage('')
        }
      }}
      >전송
      </button>
    </div>
  )
}

export default function ChatComponentPage () {
  return (
    <ChatProvider id={2}>
      <ChatComponent />
    </ChatProvider>
  )
}
