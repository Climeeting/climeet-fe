import Tabs from '@/pages/Home/components/Tabs.tsx'
import styles from './ChatPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import BottomBar from '@/components/NavBar/BottomBar.tsx'
import { Suspense, useState } from 'react'
import EmptyChat from '@/pages/ChatPage/components/EmptyChat.tsx'
import PartyChatList from './components/PartyChatList'
import { ErrorBoundary } from 'react-error-boundary'

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
      {chatType === 'party'
        ? (
            <ErrorBoundary fallback={<PartyChatList.Retry />}>
              <Suspense fallback={<PartyChatList.Skeleton />}>
                <PartyChatList.Query />
              </Suspense>
            </ErrorBoundary>
          )
        : <EmptyChat />}
      <BottomBar />
    </div>
  )
}

export default ChatPage
