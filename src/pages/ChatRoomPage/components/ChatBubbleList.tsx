import dayjs from 'dayjs'
import ChatBubble, { ChatInfo } from './ChatBubble'
import { useMyProfile } from '@/services/user'

type ChatBubbleListProps = {
  chatList: ChatInfo[]
}

export default function ChatBubbleList({ chatList }: ChatBubbleListProps) {
  const { data } = useMyProfile()
  return (
    <ul>
      {chatList.map((chat, index) => {
        const isStartMessage =
          index === 0 || // 1. 첫 번째 메시지
          chat.user.id !== chatList[index - 1].user.id || // 2. 이전 메시지와 다른 사용자
          dayjs(chatList[index - 1].time).diff(dayjs(chat.time), 'minute') > 1 // 3. 이전 메시지와 1분 이상 차이

        const isLastMessage =
          index === chatList.length - 1 || // 1. 마지막 메시지
          chat.user.id !== chatList[index + 1].user.id || // 2. 다음 메시지와 다른 사용자
          dayjs(chatList[index + 1].time).diff(dayjs(chat.time), 'minute') > 1 // 3. 다음 메시지와 1분 이상 차이

        return (
          <ChatBubble
            key={chat.time}
            {...chat}
            isStartMessage={isStartMessage}
            isLastMessage={isLastMessage}
            isMyMessage={data?.userId ? data.userId === chat.user.id : false}
          />
        )
      })}
    </ul>
  )
}
