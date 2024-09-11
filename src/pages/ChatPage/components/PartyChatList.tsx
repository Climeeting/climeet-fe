import { ChatRoomDto, UserChatRoomsQuery, useUserChatRooms } from '@/services/user'
import { InfiniteData } from '@tanstack/react-query'
import { PageData } from '@/pages/types/api'
import { Link } from 'react-router-dom'
import ChatItem from './ChatItem'
import { Fragment } from 'react/jsx-runtime'
import { useLoadMore } from '@/utils/useLoadMore'
import EmptyChat from './EmptyChat'
import NotFound from '@/components/NotFound'

export default function PartyChatList ({
  data,
  fetchNextPage,
}: {
  data: InfiniteData<PageData<ChatRoomDto>>
  fetchNextPage: () => void
}) {
  const ref = useLoadMore(fetchNextPage)

  if (data.pages[0].totalElements === 0)
    return (
      <EmptyChat />
    )

  return (
    <ul>
      {data.pages.map((parties, i) => (
        <Fragment key={i}>
          {parties.content.map(party => (
            <li key={party.roomId}>
              <Link to={`/chat/${party.roomId}`}>
                <ChatItem data={party} />
              </Link>
            </li>
          ))}
        </Fragment>
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
