import Tabs from '@/pages/Home/components/Tabs.tsx'
import styles from './ChatPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import BottomBar from '@/components/NavBar/BottomBar.tsx'
import { useState } from 'react'
import ChatItem from '@/pages/ChatPage/components/ChatItem.tsx'
import EmptyChat from '@/pages/ChatPage/components/EmptyChat.tsx'

type ChatType = 'party' | 'personal'

function ChatPage () {
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
