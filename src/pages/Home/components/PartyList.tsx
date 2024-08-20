import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PartyList.module.scss'
import PartyCard from './PartyCard'
import { usePartyList } from '@/services/party'
import { PartyListQuery } from '@/services/party'
import { useLoadMore } from '@/utils/useLoadMore'
import { useFilterParams } from '../hooks/useFilterParams'
import EmptyParty from '@/assets/empty_party.png'
import NotFound from '@/components/NotFound'

export default function PartyList () {
  const params = useFilterParams()
  const { data, fetchNextPage } = usePartyList(params)
  const ref = useLoadMore(fetchNextPage)

  if (data.pages[0].totalElements === 0)
    return (
      <div className={styles.PartyEmpty}>
        <img src={EmptyParty} />
        <span>진행 중인 파티가 없습니다.</span>
      </div>
    )

  return (
    <ul className={styles.PartyUl}>
      {data.pages.map((parties, i) => (
        <React.Fragment key={i}>
          {parties.content.map(party => (
            <li key={party.id}>
              <Link to={`/party/${party.id}`}>
                <PartyCard party={party} />
              </Link>
            </li>
          ))}
        </React.Fragment>
      ))}
      <div ref={ref} />
    </ul>
  )
}

PartyList.Skeleton = () => (
  <ul className={styles.PartyUl}>
    {Array.from({ length: 5 }).map((_, index) => (
      <li key={index}>
        <PartyCard.Skeleton key={index} />
      </li>
    ))}
  </ul>
)

PartyList.Retry = () => {
  return (
    <div className={styles.PartyError}>
      <NotFound message='파티 목록 로딩에 실패했습니다.' refresh={PartyListQuery.refetch} />
    </div>
  )
}
