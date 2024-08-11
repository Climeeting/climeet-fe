import styles from './ChatRoomPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import Icon from '@/components/Icon/Icon.tsx'
import { useState } from 'react'
import SideSheet from '@/components/SideSheet.tsx'
import ChatSidebar from '@/pages/ChatRoomPage/components/ChatSidebar.tsx'
import { useVisualViewport } from '@/pages/ChatRoomPage/hooks/useVisualViewport.tsx'
import ChatBubbleList from './components/ChatBubbleList'

const mockChatList = [
  {
    user: {
      avatar: '',
      name: '양혜윤',
      id: 1,
    },
    message: '안녕하세요 친해져요~',
    time: '2024-08-14T11:23:34.050Z',
  },
  {
    user: {
      avatar: '',
      name: '양혜윤',
      id: 1,
    },
    message: '반갑습니다!',
    time: '2024-08-14T11:23:34.050Z',
  },
  {
    user: {
      avatar: '',
      name: '이성진',
      id: 2,
    },
    message: '안녕하세요 친해져요~',
    time: '2024-08-14T11:23:34.050Z',
  },
  {
    user: {
      avatar: '',
      name: '양혜윤',
      id: 1,
    },
    message: '안녕하세요 친해져요~',
    time: '2024-08-14T11:23:35.050Z',
  },
  {
    user: {
      avatar: '',
      name: '이성진',
      id: 2,
    },
    message: '안녕하세요 친해져요~',
    time: '2024-08-14T11:23:35.050Z',
  },
  {
    user: {
      avatar: '',
      name: '강희',
      id: 3469435165,
    },
    message: '내 메세지',
    time: '2024-08-14T11:23:36.050Z',
  },
  {
    user: {
      avatar: '',
      name: '강희',
      id: 3469435165,
    },
    message: '내 메세지2',
    time: '2024-08-14T11:23:36.050Z',
  },
]

function ChatRoomPage() {
  const { wrapperRef, containerRef } = useVisualViewport()

  return (
    <div ref={wrapperRef}>
      <div className={styles.Container} ref={containerRef}>
        <TopBar>
          <TopBar.Left back />
          <TopBar.Center>친해지실 분 구해유</TopBar.Center>
          <TopBar.Right close={false}>
            <ChatRoomInfo />
          </TopBar.Right>
        </TopBar>
        <div className={styles.Alert}>
          👋 파티원분들과 반갑게 인사를 나눠보세요.
          <br />
          개인 정보 요구, 외부 채팅방으로 유도하는 경우 주의해주세요!
        </div>

        <div className={styles.LastDate}>2024년 6월 29일 토요일</div>

        <div className={styles.MemberEnterLayout}>
          <div className={styles.MemberEnter}>이성진 님이 들어왔습니다.</div>
        </div>

        <ChatBubbleList chatList={mockChatList} />
      </div>
      <div className={styles.Bottom}>
        <Icon icon={'PlusLine'} size={24} className={styles.Plus} />
        <input className={styles.Input} placeholder={'메시지 보내기'} />
        <Icon icon={'Upload'} size={28} className={styles.Send} />
      </div>
    </div>
  )
}

export default ChatRoomPage

function ChatRoomInfo() {
  const [open, setOpen] = useState(false)
  return (
    <SideSheet open={open} onOpenChange={setOpen}>
      <SideSheet.Trigger className={styles.Trigger} style={{ display: 'flex' }}>
        <Icon icon={'Hamburger'} size={32} />
      </SideSheet.Trigger>
      {open && <ChatSidebar />}
    </SideSheet>
  )
}
