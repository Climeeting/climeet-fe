import styles from './ChatPage.module.scss'
import TopBar from '@/components/NavBar/TopBar.tsx'
import BottomBar from '@/components/NavBar/BottomBar.tsx'
import { Suspense } from 'react'
import PartyChatList from './components/PartyChatList'
import { ErrorBoundary } from 'react-error-boundary'

function ChatPage () {
  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>채팅</TopBar.Center>
      </TopBar>
      <ErrorBoundary fallback={<PartyChatList.Retry />}>
        <Suspense fallback={<PartyChatList.Skeleton />}>
          <PartyChatList.Query />
        </Suspense>
      </ErrorBoundary>
      <BottomBar />
    </div>
  )
}

export default ChatPage
