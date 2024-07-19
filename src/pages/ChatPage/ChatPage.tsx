import Tabs from '@/pages/Home/components/Tabs.tsx'
import styles from './ChatPage.module.scss'
import Avatar from '@/components/Avatar.tsx'
import TopBar from '@/components/NavBar/TopBar.tsx'
import BottomBar from '@/components/NavBar/BottomBar.tsx'
import emptyChat from '@/assets/empty_chat.png'
import { useState } from 'react'

type ChatType = 'party' | 'personal'

function ChatPage() {
  const [chatType, setChatType] = useState<ChatType>('party')

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>채팅</TopBar.Center>
      </TopBar>
      <Tabs
        tabs={['파티', '개인']}
        onClick={(tab) => {
          setChatType(tab === '파티' ? 'party' : 'personal')
        }}
      />
      {chatType === 'party' ? <EmptyChat /> : <ChatItem />}
      <BottomBar />
    </div>
  )
}

export default ChatPage

function ChatItem() {
  return (
    <div className={styles.ChatItem}>
      <div className={styles.Left}>
        <Avatar src={''} alt={'아바타'} className={styles.Avatar} />
        <div className={styles.RoomInfo}>
          <div className={styles.RoomTitle}>
            <div className={styles.RoomName}>친해지실 분 구해유</div>
            <div className={styles.Members}>9</div>
          </div>
          <div className={styles.LastMessage}>안녕하세요 친해져요~</div>
        </div>
      </div>
      <div className={styles.Right}>
        <div className={styles.LastChatTime}>오전 8:42</div>
        <div className={styles.Chip}>12</div>
      </div>
    </div>
  )
}

function EmptyChat() {
  return (
    <div className={styles.EmptyChat}>
      <img src={emptyChat} alt={'empty-chat-img'} />
      <div className={styles.EmptyChatText}>
        참여중인 채팅이 없습니다.
        <br />
        파티에 참가하고 파티원과 대화를 나눠보세요!
      </div>
      <button className={styles.Button}>파티 목록 보기</button>
    </div>
  )
}
