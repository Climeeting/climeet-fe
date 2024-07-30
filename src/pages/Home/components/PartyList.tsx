import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PartyList.module.scss'
import PartyCard from './PartyCard'
import { usePartyList } from '@/services/party'
import { PartyListQuery } from '@/services/party'
import { useLoadMore } from '@/utils/useLoadMore'
import { useFilterParams } from '../hooks/useFilterParams'

export default function PartyList() {
  const params = useFilterParams()
  const { data, fetchNextPage } = usePartyList(params)
  const ref = useLoadMore(fetchNextPage)

  if (data.pages[0].totalElements === 0) return <div>데이터가 없습니다.</div>

  return (
    <ul className={styles.PartyUl}>
      {data.pages.map((parties, i) => (
        <React.Fragment key={i}>
          {parties.content.map((party) => (
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
    <div>
      <div>오류가 발생했습니다.</div>
      <button onClick={() => PartyListQuery.refetch}>재시도</button>
    </div>
  )
}
