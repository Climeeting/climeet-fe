import styles from './ChatRoomPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import Icon from '@/components/Icon/Icon.tsx'
import { Suspense, useState } from 'react'
import SideSheet from '@/components/SideSheet.tsx'
import ChatSidebar from '@/pages/ChatRoomPage/components/ChatSidebar.tsx'
// import { useVisualViewport } from '@/pages/ChatRoomPage/hooks/useVisualViewport.tsx'
import ChatBubbleList from './components/ChatBubbleList'
import { useNavigate, useParams } from 'react-router-dom'
import { useMyProfile } from '@/services/user'
import { ErrorBoundary } from 'react-error-boundary'

export function ChatRoomPage ({ id }: { id: number, userId: number }) {
  // const { wrapperRef, containerRef } = useVisualViewport()
  const [message, setMessage] = useState('')

  return (
    <div>
      <div className={styles.Container}>
        <TopBar>
          <TopBar.Left back />
          <TopBar.Center>친해지실 분 구해유</TopBar.Center>
          <TopBar.Right close={false}>
            <ChatRoomInfo />
          </TopBar.Right>
        </TopBar>
        {/* <div className={styles.Alert}>
          👋 파티원분들과 반갑게 인사를 나눠보세요.
          <br />
          개인 정보 요구, 외부 채팅방으로 유도하는 경우 주의해주세요!
        </div>

        <div className={styles.LastDate}>2024년 6월 29일 토요일</div>

        <div className={styles.MemberEnterLayout}>
          <div className={styles.MemberEnter}>이성진 님이 들어왔습니다.</div>
        </div> */}

        {/* {JSON.stringify(messages, null, 2)} */}
        <ErrorBoundary fallback={<ChatBubbleList.Retry room={Number(id)} />}>
          <Suspense fallback={<ChatBubbleList.Skeleton />}>
            <ChatBubbleList.Query room={Number(id)} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setMessage('')
        }}
        className={styles.Bottom}
      >
        <Icon icon='PlusLine' size={24} className={styles.Plus} />
        <input type='text' value={message} onChange={e => setMessage(e.target.value)} className={styles.Input} placeholder='메시지 보내기' />
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
    <ChatRoomPage id={Number(id)} userId={myData!.userId} />
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

// const mockChatList = [
//   {
//     user: {
//       avatar: '',
//       name: '양혜윤',
//       id: 1,
//     },
//     message: '안녕하세요 친해져요~',
//     time: '2024-08-14T11:23:34.050Z',
//   },
//   {
//     user: {
//       avatar: '',
//       name: '양혜윤',
//       id: 1,
//     },
//     message: '반갑습니다!',
//     time: '2024-08-14T11:23:34.050Z',
//   },
//   {
//     user: {
//       avatar: '',
//       name: '이성진',
//       id: 2,
//     },
//     message: '안녕하세요 친해져요~',
//     time: '2024-08-14T11:23:34.050Z',
//   },
//   {
//     user: {
//       avatar: '',
//       name: '양혜윤',
//       id: 1,
//     },
//     message: '안녕하세요 친해져요~',
//     time: '2024-08-14T11:23:35.050Z',
//   },
//   {
//     user: {
//       avatar: '',
//       name: '이성진',
//       id: 2,
//     },
//     message: '안녕하세요 친해져요~',
//     time: '2024-08-14T11:23:35.050Z',
//   },
//   {
//     user: {
//       avatar: '',
//       name: '강희',
//       id: 3469435165,
//     },
//     message: '내 메세지',
//     time: '2024-08-14T11:23:36.050Z',
//   },
//   {
//     user: {
//       avatar: '',
//       name: '강희',
//       id: 3469435165,
//     },
//     message: '내 메세지2',
//     time: '2024-08-14T11:23:36.050Z',
//   },
// ]
