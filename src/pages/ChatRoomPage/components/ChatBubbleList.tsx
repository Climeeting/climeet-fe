import dayjs from 'dayjs'
import ChatBubble from './ChatBubble'
import { useMyProfile } from '@/services/user'
import { ChatMessage, ChatRoomQuery, useChatRoomSuspense } from '@/services/chat'
import { PageData } from '@/pages/types/api'
import { InfiniteData } from '@tanstack/react-query'
import styles from './ChatBubbleList.module.scss'
import { useEffect, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import getOffsetTop from '@/utils/getOffsetTop'

type ChatBubbleListProps = {
  data: InfiniteData<PageData<ChatMessage>, unknown>
  fetchNextPage: () => void
  hasNextPage: boolean
}

export default function ChatBubbleList ({ data, fetchNextPage, hasNextPage }: ChatBubbleListProps) {
  const chatList = data.pages.map(page => page.content).flat().reverse()
  const { data: myData } = useMyProfile()

  const scrollRef = useRef(null)
  const parentRef = useRef(null)
  const scrollLocked = useRef(false)

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? chatList.length + 1 : chatList.length,
    estimateSize: () => 35,
    overscan: 5,
    scrollMargin: getOffsetTop(parentRef.current),
    paddingStart: 50,
    paddingEnd: 64,
  })

  useEffect(function firstScrollBottom () {
    if (chatList.length) {
      rowVirtualizer.scrollToIndex(chatList.length - 1, {
        align: 'start',
      })
    }
  }, [chatList.length])

  useEffect(function scrollTo () {
    if (chatList.length && scrollRef.current) {
      const { index, align } = scrollRef.current
      rowVirtualizer.scrollToIndex(index, { align })
    }
  }, [chatList.length])

  useEffect(function fetchMore () {
    const [firstItem] = [...rowVirtualizer.getVirtualItems()]

    if (scrollLocked.current) return
    if (!firstItem) return

    if (firstItem.index <= 0 && hasNextPage) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    chatList.length,
    rowVirtualizer.getVirtualItems(),
  ])

  return (
    <div ref={parentRef} className={styles.ChatBubbleContainer}>
      <ul
        className={styles.ChatBubbleList}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const index = virtualRow.index
          const chat = chatList[virtualRow.index]
          if (!chat) return null

          const isStartMessage
            = index === 0 // 1. 첫 번째 메시지
            || chat.senderId !== chatList[index - 1].senderId // 2. 이전 메시지와 다른 사용자
            || dayjs(chatList[index - 1].createdAt).diff(dayjs(chat.createdAt), 'minute') > 1 // 3. 이전 메시지와 1분 이상 차이
          const isLastMessage
              = index === chatList.length - 1 // 1. 마지막 메시지
              || chat.senderId !== chatList[index + 1].senderId // 2. 다음 메시지와 다른 사용자
              || dayjs(chatList[index + 1].createdAt).diff(dayjs(chat.createdAt), 'minute') > 1 // 3. 다음 메시지와 1분 이상 차이

          return (
            <li
              id={`item-${virtualRow.index}`}
              key={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              data-index={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
                width: '100%',
              }}
            >
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
    </div>
  )
}

ChatBubbleList.Query = function ChatBubbleListQuery ({ room }: { room: number }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useChatRoomSuspense({ room })

  console.log({ isFetching })

  return <ChatBubbleList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
}

ChatBubbleList.Skeleton = function ChatBubbleListSkeleton () {
  return (
    <div>로딩중</div>
  )
}

ChatBubbleList.Retry = function ChatBubbleListRetry ({ room }: { room: number }) {
  return <button onClick={() => ChatRoomQuery.refetch({ room })}>다시 시도하기</button>
}
