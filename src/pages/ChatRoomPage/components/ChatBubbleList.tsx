import dayjs from 'dayjs'
import ChatBubble from './ChatBubble'
import { useMyProfile } from '@/services/user'
import { ChatMessage, ChatRoomQuery, useChatRoomSuspense } from '@/services/chat'
import { PageData } from '@/pages/types/api'
import { InfiniteData } from '@tanstack/react-query'
import { useLoadMore } from '@/utils/useLoadMore'
import styles from './ChatBubbleList.module.scss'

type ChatBubbleListProps = {
  data: InfiniteData<PageData<ChatMessage>, unknown>
  fetchNextPage: () => void
}

export default function ChatBubbleList ({ data, fetchNextPage }: ChatBubbleListProps) {
  const chatList = data.pages.map(page => page.content).flat()
  const ref = useLoadMore(fetchNextPage)

  const { data: myData } = useMyProfile()
  return (
    <ul className={styles.ChatBubbleList}>
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
          <li key={chat.id}>
            <ChatBubble
              {...chat}
              isStartMessage={isStartMessage}
              isLastMessage={isLastMessage}
              isMyMessage={myData?.userId ? myData.userId === chat.senderId : false}
            />
          </li>
        )
      })}
      <li ref={ref} />
    </ul>
  )
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
