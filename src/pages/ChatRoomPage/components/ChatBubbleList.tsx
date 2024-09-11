import dayjs from 'dayjs'
import ChatBubble from './ChatBubble'
import { useMyProfile } from '@/services/user'
import { ChatMessage, ChatRoomQuery, useChatRoomSuspense } from '@/services/chat'
import { PageData } from '@/pages/types/api'
import { InfiniteData } from '@tanstack/react-query'
import styles from './ChatBubbleList.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useLoadMore } from '@/utils/useLoadMore'
import Icon from '@/components/Icon/Icon'

type ChatBubbleListProps = {
  data: InfiniteData<PageData<ChatMessage>, unknown>
  fetchNextPage: () => void
}

export default function ChatBubbleList ({ data, fetchNextPage }: ChatBubbleListProps) {
  const chatList = data.pages.map(page => page.content).flat().reverse()
  const { data: myData } = useMyProfile()

  const [isScrolled, setIsScrolled] = useState(false)
  const loadMoreRef = useLoadMore(fetchNextPage)
  const chatListRef = useChatScroll(chatList, isScrolled)

  const hasNewMessage = true

  return (
    <div className={styles.ChatBubbleContainer}>
      <ul
        ref={chatListRef}
        className={styles.ChatBubbleList}
        onScroll={() => {
          if (chatListRef.current) {
            setIsScrolled(chatListRef.current.scrollTop + chatListRef.current.clientHeight < chatListRef.current.scrollHeight)
          }
        }}
      >
        <li ref={loadMoreRef} />
        {chatList.map((chat, index) => {
          const isStartMessage
            = index === 0 // 1. 첫 번째 메시지
            || chat.senderId !== chatList[index - 1].senderId // 2. 이전 메시지와 다른 사용자
            || dayjs(chatList[index - 1].createdAt).diff(dayjs(chat.createdAt), 'minute') > 1 // 3. 이전 메시지와 1분 이상 차이
          const isLastMessage
              = index === chatList.length - 1 // 1. 마지막 메시지
              || chat.senderId !== chatList[index + 1].senderId // 2. 다음 메시지와 다른 사용자
              || dayjs(chatList[index + 1].createdAt).diff(dayjs(chat.createdAt), 'minute') > 1 // 3. 다음 메시지와 1분 이상 차이

          return (
            <li key={`chat-${chat.id}-${chat.createdAt}`}>
              <ChatBubble
                {...chat}
                isStartMessage={isStartMessage}
                isLastMessage={isLastMessage}
                isMyMessage={myData?.userId ? myData.userId === chat.senderId : false}
              />
            </li>
          )
        })}
      </ul>
      {isScrolled && hasNewMessage && (
        <button
          onClick={() => {
            setIsScrolled(false)
            scrollToBottom(chatListRef.current!)
          }}
          className={styles.ChatNewMssage}
        >
          <span>새로운 메세지 확인하기</span>
          <Icon icon='ArrowDown' size={16} />
        </button>
      )}
    </div>
  )
}

const scrollToBottom = (element: HTMLUListElement) => {
  element.scrollTo({
    top: element.scrollHeight,
    left: 0,
    behavior: 'instant',
  })
}

function useChatScroll<T> (dep: T, disabled: boolean) {
  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    if (disabled) return
    if (ref.current) {
      scrollToBottom(ref.current)
    }
  }, [dep, disabled])
  return ref as React.RefObject<HTMLUListElement>
}

ChatBubbleList.Query = function ChatBubbleListQuery ({ room }: { room: number }) {
  const { data, fetchNextPage } = useChatRoomSuspense({ room })

  return <ChatBubbleList data={data} fetchNextPage={fetchNextPage} />
}

ChatBubbleList.Skeleton = function ChatBubbleListSkeleton () {
  return (
    <div>로딩중</div>
  )
}

ChatBubbleList.Retry = function ChatBubbleListRetry ({ room }: { room: number }) {
  return <button onClick={() => ChatRoomQuery.refetch({ room })}>다시 시도하기</button>
}
