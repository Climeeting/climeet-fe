import { Link } from 'react-router-dom'
import styles from './PartyList.module.scss'
import PartyCard from './PartyCard'
import { usePartyList } from '@/services/party'
import { PartyListQuery } from '@/services/party'
import { PartyListParams, useFilterContext } from '../hooks/useFilterContext'

export default function PartyList() {
  const filters = useFilterContext()
  const { data } = usePartyList(new PartyListParams(filters).adapt())

  if (data.content.length === 0) return <div>데이터가 없습니다.</div>

  return (
    <ul className={styles.PartyUl}>
      {data?.content.map((party, index) => (
        <li key={party.id}>
          <Link to={`/party/${index}`} key={index}>
            <PartyCard {...party} />
          </Link>
        </li>
      ))}
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
