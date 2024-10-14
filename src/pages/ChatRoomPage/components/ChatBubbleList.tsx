import dayjs from 'dayjs'
import ChatBubble from './ChatBubble'
import { useMyProfile } from '@/services/user'
import { ChatRoomQuery, useChatRoomSuspense } from '@/services/chat'
import styles from './ChatBubbleList.module.scss'
import {
  forwardRef, useEffect, useImperativeHandle, useRef, useState,
} from 'react'
import { useOnScreen } from '@/utils/useLoadMore'
import { ReceiveMessage } from '@/utils/chat'
import { useChat } from '@/utils/useChat'
import ScrollDownButton from './ScrollDownButton'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'
import ChatLoading from './ChatLoading'
import useDelaySkeleton from '@/utils/useDelaySkeleton'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type ChatBubbleListProps = {
  chatList: ReceiveMessage[]
  fetchNextPage: () => Promise<unknown>
  isFetched: boolean
  hasNextPage: boolean
}

export type ChatListHandle = {
  scrollToBottom: () => void
}

const ChatBubbleListUi = forwardRef(function ChatBubbleList ({ chatList, fetchNextPage, hasNextPage }: ChatBubbleListProps, forwardRef) {
  const { data: myData } = useMyProfile()

  const bottomRef = useRef<HTMLLIElement>(null)
  const isBottom = useOnScreen(bottomRef)

  const [isScrolled, setIsScrolled] = useState(false)
  const chatListRef = useRef<HTMLUListElement>(null)

  const [lastSeenId, setLastSeenId] = useState(chatList.length > 0 ? chatList[chatList.length - 1].messageId : null)

  useImperativeHandle(forwardRef, () => {
    return {
      scrollToBottom: () => {
        if (chatListRef.current) {
          scrollToBottom(chatListRef.current)
        }
      },
    }
  }, [])

  useEffect(function scrollToBottomAfterSendMessage () {
    if (!chatList.length) return

    const lastMessage = chatList[0]
    if (!chatListRef.current) return
    if (lastSeenId === lastMessage.messageId) return
    if (lastMessage.senderId === myData?.userId) {
      scrollToBottom(chatListRef.current)
      setLastSeenId(lastMessage.messageId)
    }
  }, [chatList])

  /**
   * 채팅 리스트가 적어서 스크롤이 생기지 않을 때에는 채팅을 가장 상위 부터 렌더링 하기 위해 스타일을 조정합니다.
   */
  useEffect(function fixStyle () {
    const chatListEl = chatListRef.current
    const infiniteScrollEl = document.querySelector('.infinite-scroll-component__outerdiv')
    if (!chatListEl || !infiniteScrollEl) return
    const chatListHeight = chatListEl.clientHeight
    const infiniteScrollHeight = infiniteScrollEl.clientHeight

    if (!hasNextPage && chatListHeight > infiniteScrollHeight) {
      chatListEl.style.justifyContent = 'flex-end'
    } else {
      chatListEl.style.justifyContent = ''
    }
  }, [chatList.length])

  return (
    <div className={styles.ChatBubbleContainer}>
      <ul
        id='chatScrollContainer'
        className={styles.ChatBubbleList}
        ref={chatListRef}
      >
        <InfiniteScroll
          dataLength={chatList.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<ChatLoading />}
          endMessage={<GreetingMessage />}
          className={styles.InfiniteScroll}
          scrollableTarget='chatScrollContainer'
          inverse={true}
          onScroll={() => {
            if (isBottom) setIsScrolled(false)
            setIsScrolled(true)
          }}
        >
          <li ref={bottomRef} />
          {chatList.map((chat, index) => {
            const isStartMessage
            = index === chatList.length - 1 // 1. 첫 번째 메시지
            || chat.senderId !== chatList[index + 1].senderId // 2. 이전 메시지와 다른 사용자
            || Math.abs(dayjs(chatList[index + 1].createdAt).startOf('minute').diff(dayjs(chat.createdAt).startOf('minute'), 'minute')) >= 1 // 3. 이전 메시지와 1분 이상 차이
            || chatList[index + 1].messageType === 'SERVER' // 4. 이전 메시지의 타입이 SERVER 인 경우(시스템 메시지)

            const isLastMessage
              = index === 0 // 1. 마지막 메시지
              || chat.senderId !== chatList[index - 1].senderId // 2. 다음 메시지와 다른 사용자
              || Math.abs(dayjs(chatList[index - 1].createdAt).startOf('minute').diff(dayjs(chat.createdAt).startOf('minute'), 'minute')) >= 1 // 3. 다음 메시지와 1분 이상 차이

            const isDayChanged
              = index === chatList.length - 1
              || dayjs(chat.createdAt).startOf('day').diff(dayjs(chatList[index + 1].createdAt).startOf('day'), 'day') !== 0

            return (
              <li key={`chat-${chat.messageId}-${chat.createdAt}`}>
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
        </InfiniteScroll>
      </ul>
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

const ChatBubbleListQuery = forwardRef(function ChatBubbleListQuery ({ room }: { room: number }, forwardRef) {
  const { data, fetchNextPage, isFetched, hasNextPage } = useChatRoomSuspense({ room })
  const { messages } = useChat()
  const chatList = data.pages.map(page => page.content).flat()

  console.log({ chatList })

  return (
    <ChatBubbleListUi
      ref={forwardRef}
      chatList={[
        ...messages,
        ...chatList,
      ]}
      fetchNextPage={fetchNextPage}
      isFetched={isFetched}
      hasNextPage={hasNextPage}
    />
  )
})

function ChatBubbleListSkeleton () {
  const isShow = useDelaySkeleton()

  if (!isShow) return <div className={styles.Skeleton} />

  return (
    <SkeletonTheme baseColor='#f6f6f6' highlightColor='#fff'>
      <div className={styles.Skeleton}>
        <div style={{
          padding: '24px 16px',
        }}
        >
          <div
            style={{
              width: '30%',
              margin: '0 auto',
              marginBottom: 6,
            }}
          >
            <Skeleton width='100%' height={20} borderRadius={10} />
          </div>
          <div
            style={{
              width: '35%',
              margin: '0 auto',
              marginBottom: 6,
            }}
          >
            <Skeleton width='100%' height={30} borderRadius={15} />
          </div>
          <div
            style={{
              width: '35%',
              margin: '0 auto',
              marginBottom: 6,
            }}
          >
            <Skeleton width='100%' height={30} borderRadius={15} />
          </div>
        </div>

        <div style={{
          padding: '24px 16px 16px',
          display: 'flex',
        }}
        >
          <Skeleton circle width={32} height={32} />
          <div
            style={{
              width: '100%',
              marginLeft: 8,
            }}
          >
            <div
              style={{
                marginBottom: 6,
              }}
            >
              <Skeleton width={32} height={14} borderRadius={7} />
            </div>
            <div
              style={{
                width: '100%',
              }}
            >
              <Skeleton width='40%' height={38} borderRadius={19} />
            </div>
          </div>
        </div>

        <div style={{
          padding: '0 16px',
          width: '100%',
        }}
        >
          <div
            style={{
              width: '100%',
              textAlign: 'end',
              marginBottom: 8,
            }}
          >
            <Skeleton width='30%' height={38} borderRadius={19} />
          </div>
          <div
            style={{
              width: '100%',
              textAlign: 'end',
            }}
          >
            <Skeleton width='40%' height={38} borderRadius={19} />
          </div>
        </div>

        <div style={{
          padding: '24px 16px',
        }}
        >
          <div
            style={{
              width: '30%',
              margin: '0 auto',
              marginBottom: 6,
            }}
          >
            <Skeleton width='100%' height={20} borderRadius={10} />
          </div>
          <div
            style={{
              width: '35%',
              margin: '0 auto',
              marginBottom: 6,
            }}
          >
            <Skeleton width='100%' height={30} borderRadius={15} />
          </div>
        </div>

        <div style={{
          padding: '24px 16px 16px',
          display: 'flex',
        }}
        >
          <Skeleton circle width={32} height={32} />
          <div
            style={{
              width: '100%',
              marginLeft: 8,
            }}
          >
            <div
              style={{
                marginBottom: 6,
              }}
            >
              <Skeleton width={32} height={14} borderRadius={7} />
            </div>
            <div
              style={{
                width: '100%',
              }}
            >
              <Skeleton width='40%' height={38} borderRadius={19} />
            </div>
          </div>
        </div>

      </div>
    </SkeletonTheme>
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
