import { ChatRoomDto, UserChatRoomsQuery, useUserChatRooms } from '@/services/user'
import { InfiniteData } from '@tanstack/react-query'
import { PageData } from '@/pages/types/api'
import { Link } from 'react-router-dom'
import ChatItem from './ChatItem'
import { useLoadMore } from '@/utils/useLoadMore'
import EmptyChat from './EmptyChat'
import NotFound from '@/components/NotFound'
import { useEffect } from 'react'

export default function PartyChatList ({
  data,
  fetchNextPage,
}: {
  data: InfiniteData<PageData<ChatRoomDto>>
  fetchNextPage: () => void
}) {
  const chats = data.pages.flatMap(page => page.content)
  const ref = useLoadMore(fetchNextPage)

  useEffect(() => {
    return () => {
      UserChatRoomsQuery.reset()
    }
  }, [])

  if (data.pages[0].totalElements === 0)
    return (
      <EmptyChat />
    )

  return (
    <ul>
      {chats.map(chat => (
        <li key={chat.roomId}>
          <Link to={`/chat/${chat.roomId}`}>
            <ChatItem data={chat} />
          </Link>
        </li>
      ))}
      <div ref={ref} />
    </ul>
  )
}

PartyChatList.Query = function PartyChatListQuery () {
  const { data, fetchNextPage } = useUserChatRooms()

  return <PartyChatList data={data} fetchNextPage={fetchNextPage} />
}

PartyChatList.Skeleton = function Skeleton () {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index}>
          로딩중
          {/* <PartyCard.Skeleton key={index} /> */}
        </li>
      ))}
    </ul>
  )
}

PartyChatList.Retry = function Retry () {
  return <NotFound refresh={() => UserChatRoomsQuery.refetch()} />
}