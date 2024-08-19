import { PartyListDto, UserPartyListQuery, useUserPartyList } from '@/services/user'
import { useLoadMore } from '@/utils/useLoadMore'
import React from 'react'
import styles from './PartyCardList.module.scss'
import dayjs from 'dayjs'
import Icon from '@/components/Icon/Icon'
import { Link } from 'react-router-dom'

export default function PartyCardList({ userId }: { userId: number }) {
  const { data, fetchNextPage } = useUserPartyList({ userId })
  const ref = useLoadMore(fetchNextPage)

  if (data.pages[0].totalElements === 0) return <div>데이터가 없습니다.</div>

  return (
    <ul className={styles.PartyList}>
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

PartyCardList.Skeleton = () => (
  <ul className={styles.PartyUl}>
    {Array.from({ length: 5 }).map((_, index) => (
      <li key={index}>
        로딩중
        {/* <PartyCard.Skeleton key={index} /> */}
      </li>
    ))}
  </ul>
)

PartyCardList.Retry = () => {
  return (
    <div>
      <div>오류가 발생했습니다.</div>
      <button onClick={() => UserPartyListQuery.refetch}>재시도</button>
    </div>
  )
}

function PartyCard({ party }: { party: PartyListDto }) {
  return (
    <div className={styles.Card}>
      {party.partyImageUrl && (
        <div className={styles.Image}>
          <img src={party.partyImageUrl} alt="thumbnail" />
        </div>
      )}
      <div className={styles.Info}>
        <div className={styles.Time}>{dayjs(party.appointmentTime).format('YYYY.MM.DD')}</div>
        <div className={styles.Title}>{party.partyTitle}</div>
        <div className={styles.Address}>
          <Icon icon="LocationFill" size={16} />
          {party.locationId}
        </div>
      </div>
      <Icon className={styles.ArrowIcon} icon="ArrowRight" size={16} />
    </div>
  )
}
