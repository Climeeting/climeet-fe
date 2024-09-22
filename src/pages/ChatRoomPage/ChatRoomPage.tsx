import styles from './ChatRoomPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import Icon from '@/components/Icon/Icon.tsx'
import { Suspense, useRef, useState } from 'react'
import SideSheet from '@/components/SideSheet.tsx'
import ChatSidebar from '@/pages/ChatRoomPage/components/ChatSidebar.tsx'
// import { useVisualViewport } from '@/pages/ChatRoomPage/hooks/useVisualViewport.tsx'
import ChatBubbleList, { ChatListHandle } from './components/ChatBubbleList'
import { useNavigate, useParams } from 'react-router-dom'
import { useMyProfile } from '@/services/user'
import { ErrorBoundary } from 'react-error-boundary'
import { ChatProvider, useChatActions } from '@/utils/useChat'
import { usePartyDetail } from '@/services/party'

const MAX_MESSAGE_LENGTH = 300

export function ChatRoomPage ({ id, userId }: { id: number, userId: number }) {
  // const { wrapperRef, containerRef } = useVisualViewport()
  const [message, setMessage] = useState('')
  const { send } = useChatActions()
  const chatListRef = useRef<ChatListHandle>(null)
  const { data } = usePartyDetail(id)

  return (
    <div>
      <div className={styles.Container}>
        <TopBar>
          <TopBar.Left back />
          <TopBar.Center>{data?.partyName}</TopBar.Center>
          <TopBar.Right close={false}>
            <ChatRoomInfo />
          </TopBar.Right>
        </TopBar>

        <ErrorBoundary fallback={<ChatBubbleList.Retry room={Number(id)} />}>
          <Suspense fallback={<ChatBubbleList.Skeleton />}>
            <ChatBubbleList.Query ref={chatListRef} room={Number(id)} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()

          if (!message.trim()) return
          send({
            messageType: 'CLIENT',
            room: id,
            senderId: userId,
            message: message.trim(),
          })
          setMessage('')
          chatListRef.current?.scrollToBottom()
        }}
        className={styles.Bottom}
      >
        <Icon icon='PlusLine' size={24} className={styles.Plus} />
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
    </div>
  )
}

export default function ChatRoomPageSocket () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: myData, isLoading } = useMyProfile()

  if (!id) {
    navigate('/404', { replace: true })
    return <>404</>
  }

  if (!isLoading && !myData) {
    navigate('/login', { replace: true })
    return <>로그인이 필요합니다.</>
  }

  if (isLoading && !myData) {
    return <>로딩중...</>
  }

  return (
    <ChatProvider id={Number(id)}>
      <ChatRoomPage id={Number(id)} userId={myData!.userId} />
    </ChatProvider>
  )
}

function ChatRoomInfo () {
  const [open, setOpen] = useState(false)
  return (
    <SideSheet open={open} onOpenChange={setOpen}>
      <SideSheet.Trigger className={styles.Trigger} style={{ display: 'flex' }}>
        <Icon icon='Hamburger' size={32} />
      </SideSheet.Trigger>
      {open && <ChatSidebar />}
    </SideSheet>
  )
}
