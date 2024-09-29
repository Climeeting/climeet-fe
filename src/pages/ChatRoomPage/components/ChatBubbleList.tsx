import dayjs from 'dayjs'
import ChatBubble from './ChatBubble'
import { useMyProfile } from '@/services/user'
import { ChatRoomQuery, useChatRoomSuspense } from '@/services/chat'
import styles from './ChatBubbleList.module.scss'
import {
  forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef,
  useState,
} from 'react'
import { useLoadMore, useOnScreen } from '@/utils/useLoadMore'
import { ReceiveMessage } from '@/utils/chat'
import { useChat } from '@/utils/useChat'
import ScrollDownButton from './ScrollDownButton'
import classNames from 'classnames'

type ChatBubbleListProps = {
  chatList: ReceiveMessage[]
  fetchNextPage: () => Promise<unknown>
  isFetched: boolean
  hasNextPage: boolean
}

export type ChatListHandle = {
  scrollToBottom: () => void
}

const ChatBubbleListUi = forwardRef(function ChatBubbleList ({ chatList, fetchNextPage, isFetched, hasNextPage }: ChatBubbleListProps, forwardRef) {
  const showLoadMore = isFetched && hasNextPage
  const { data: myData } = useMyProfile()

  const bottomRef = useRef<HTMLLIElement>(null)
  const isBottom = useOnScreen(bottomRef)

  const [isScrolled, setIsScrolled] = useState(false)
  const chatListRef = useChatScroll(chatList, (chatList.length === 0) || isScrolled)
  const snapshotRef = useRef<{ scrollHeight: number, scrollTop: number } | null>(null)

  useImperativeHandle(forwardRef, () => {
    return {
      scrollToBottom: () => {
        if (chatListRef.current) {
          scrollToBottom(chatListRef.current)
        }
      },
    }
  }, [])

  const loadMoreRef = useLoadMore(async () => {
    if (chatListRef.current) {
      snapshotRef.current = {
        scrollHeight: chatListRef.current.scrollHeight,
        scrollTop: chatListRef.current.scrollTop,
      }
      await fetchNextPage()
    }
  })

  useLayoutEffect(() => {
    if (snapshotRef.current && chatListRef.current) {
      const { scrollHeight, scrollTop } = snapshotRef.current
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight - scrollHeight + scrollTop,
        left: 0,
        behavior: 'instant',
      })
      snapshotRef.current = null
    }
  }, [chatList])

  return (
    <div className={styles.ChatBubbleContainer}>
      <ul
        ref={chatListRef}
        className={styles.ChatBubbleList}
        onScroll={() => {
          if (chatListRef.current) {
            if (isBottom) setIsScrolled(false)
            else setIsScrolled(chatListRef.current.scrollTop + chatListRef.current.clientHeight < chatListRef.current.scrollHeight)
          }
        }}
      >
        {showLoadMore && <li ref={loadMoreRef} />}
        {chatList.map((chat, index) => {
          const isStartMessage
            = index === 0 // 1. 첫 번째 메시지
            || chat.senderId !== chatList[index - 1].senderId // 2. 이전 메시지와 다른 사용자
            || Math.abs(dayjs(chatList[index - 1].createdAt).startOf('minute').diff(dayjs(chat.createdAt).startOf('minute'), 'minute')) >= 1 // 3. 이전 메시지와 1분 이상 차이
            || chatList[index - 1].messageType === 'SERVER' // 4. 이전 메시지의 타입이 SERVER 인 경우(시스템 메시지)

          const isLastMessage
              = index === chatList.length - 1 // 1. 마지막 메시지
              || chat.senderId !== chatList[index + 1].senderId // 2. 다음 메시지와 다른 사용자
              || Math.abs(dayjs(chatList[index + 1].createdAt).startOf('minute').diff(dayjs(chat.createdAt).startOf('minute'), 'minute')) >= 1 // 3. 다음 메시지와 1분 이상 차이

          const isDayChanged
              = index === 0
              || dayjs(chat.createdAt).startOf('day').diff(dayjs(chatList[index - 1].createdAt).startOf('day'), 'day') !== 0

          const isFirstMessage = !hasNextPage && index === 0
          return (
            <li key={`chat-${chat.messageId}-${chat.createdAt}`}>
              {isFirstMessage && <GreetingMessage />}
              {isDayChanged && <span className={classNames(styles.ChatDate, { [styles.isFirst]: index === 0 })}>{dayjs(chat.createdAt).format('YYYY년 MM월 DD일')}</span>}
              <ChatBubble
                {...chat}
                isStartMessage={isStartMessage}
                isLastMessage={isLastMessage}
                isMyMessage={myData?.userId ? myData.userId === chat.senderId : false}
              />
            </li>
          )
        })}
        <li ref={bottomRef} />
      </ul>
      {/* {isScrolled && !isBottom && hasNewMessage && (
        <button
          onClick={() => {
            scrollToBottom(chatListRef.current!)
          }}
          className={styles.ChatNewMssage}
        >
          <span>새로운 메세지 확인하기</span>
          <Icon icon='ArrowDown' size={16} />
        </button>
      )} */}
      {isScrolled && !isBottom && (
        <ScrollDownButton
          scrollBottom={scrollToBottom.bind(null, chatListRef.current!)}
        />
      )}
    </div>
  )
})

function GreetingMessage () {
  return (
    <div className={styles.Alert}>
      👋 파티원분들과 반갑게 인사를 나눠보세요.
      <br />
      개인 정보 요구, 외부 채팅방으로 유도하는 경우 주의해주세요!
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

const ChatBubbleListQuery = forwardRef(function ChatBubbleListQuery ({ room }: { room: number }, forwardRef) {
  const { data, fetchNextPage, isFetched, hasNextPage } = useChatRoomSuspense({ room })
  const { messages } = useChat()
  const chatList = data.pages.map(page => page.content).flat().reverse()

  return (
    <ChatBubbleListUi
      ref={forwardRef}
      chatList={[
        ...chatList,
        ...messages,
      ]}
      fetchNextPage={fetchNextPage}
      isFetched={isFetched}
      hasNextPage={hasNextPage}
    />
  )
})

function ChatBubbleListSkeleton () {
  return (
    <div>로딩중</div>
  )
}

function ChatBubbleListRetry ({ room }: { room: number }) {
  return <button onClick={() => ChatRoomQuery.refetch({ room })}>다시 시도하기</button>
}

const ChatBubbleList = {
  Ui: ChatBubbleListUi,
  Query: ChatBubbleListQuery,
  Skeleton: ChatBubbleListSkeleton,
  Retry: ChatBubbleListRetry,
}

export default ChatBubbleList
