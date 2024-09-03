import { PartyListDto, UserPartyListQuery, useUserPartyList } from '@/services/user'
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
  data: InfiniteData<PageData<PartyListDto>>
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
            <li key={party.id}>
              <Link to={`/chat/${party.id}`}>
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

PartyChatList.Query = function PartyChatListQuery ({ userId }: { userId: number }) {
  const { data, fetchNextPage } = useUserPartyList({
    userId,
  })

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

PartyChatList.Retry = function Retry ({ userId }: { userId: number }) {
  return <NotFound refresh={() => UserPartyListQuery.refetch({ userId })} />
}
