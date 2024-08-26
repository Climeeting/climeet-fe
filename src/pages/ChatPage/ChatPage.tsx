import Tabs from '@/pages/Home/components/Tabs.tsx'
import styles from './ChatPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import BottomBar from '@/components/NavBar/BottomBar.tsx'
import { useState } from 'react'
import ChatItem from '@/pages/ChatPage/components/ChatItem.tsx'
import EmptyChat from '@/pages/ChatPage/components/EmptyChat.tsx'
import { useParams } from 'react-router-dom'
import { ChatSocket } from '@/utils/useSocket'

type ChatType = 'party' | 'personal'

function ChatPage () {
  const { id } = useParams<{ id: string }>()
  const [chatType, setChatType] = useState<ChatType>('party')

  if (!id) return null

  return (
    <ChatSocket id={Number(id)}>
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
    </ChatSocket>
  )
}

export default ChatPage
