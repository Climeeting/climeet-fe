import styles from './ChatRoomPage.module.scss'
import Icon from '@/components/Icon/Icon.tsx'
import { Suspense, useState } from 'react'
// import { useVisualViewport } from '@/pages/ChatRoomPage/hooks/useVisualViewport.tsx'
import ChatBubbleList from './components/ChatBubbleList'
import { useParams } from 'react-router-dom'
import { useMyProfile } from '@/services/user'
import { ErrorBoundary } from 'react-error-boundary'
import { ChatProvider, useChatActions } from '@/utils/useChat'
import ChatRoomTopBar from './components/ChatRoomTopBar'

const MAX_MESSAGE_LENGTH = 300

export default function ChatRoomPage () {
  // const { wrapperRef, containerRef } = useVisualViewport()
  const { id } = useParams<{ id: string }>()

  return (
    <ChatProvider id={Number(id)}>
      <div className={styles.Container}>
        <ErrorBoundary fallback={<>오류 발생</>}>
          <Suspense fallback={<>로딩중</>}>
            <ChatRoomTopBar id={Number(id)} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<ChatBubbleList.Retry room={Number(id)} />}>
          <Suspense fallback={<ChatBubbleList.Skeleton />}>
            <ChatBubbleList.Query room={Number(id)} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <ChatForm id={Number(id)} />
    </ChatProvider>
  )
}

function ChatForm ({ id }: { id: number }) {
  const [message, setMessage] = useState('')
  const { send } = useChatActions()
  const { data: myData } = useMyProfile()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (!myData) return
        if (!message.trim()) return
        send({
          messageType: 'CLIENT',
          room: id,
          senderId: myData.userId,
          message: message.trim(),
        })
        setMessage('')
      }}
      className={styles.Bottom}
    >
      <input
        maxLength={MAX_MESSAGE_LENGTH}
        type='text'
        value={message}
        onChange={(e) => {
          if (e.target.value.length > MAX_MESSAGE_LENGTH) return
          setMessage(e.target.value)
        }}
        className={styles.Input}
        placeholder='메시지 보내기'
      />
      <button type='submit'>
        <Icon icon='Upload' size={28} className={styles.Send} />
      </button>
    </form>
  )
}
