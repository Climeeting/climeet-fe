import styles from './ChatRoomPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import classNames from 'classnames'
import Icon from '@/components/Icon/Icon.tsx'
import { useState } from 'react'
import SideSheet from '@/components/SideSheet.tsx'
import ChatSidebar from '@/pages/ChatRoomPage/components/ChatSidebar.tsx'

function ChatRoomPage() {
  return (
    <div className={styles.Container}>
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
      <div className={styles.MessageList}>
        <div className={styles.MessageItem}>안녕하세요 친해져요~</div>
        <div
          className={classNames(styles.MessageItem, {
            [styles.MyMessage]: true,
          })}
        >
          안녕하세요 친해져요~
        </div>
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
