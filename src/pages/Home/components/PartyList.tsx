import { Link } from 'react-router-dom'
import styles from './PartyList.module.scss'
import PartyCard from './PartyCard'
import { usePartyList } from '@/services/party'

export default function PartyList () {
  const { data } = usePartyList()

  if (data.content.length === 0) return <div>데이터가 없습니다.</div>

  return (
    <ul className={styles.PartyUl}>
      {data?.content.map((party, index) => (
        <li>
          <Link to={`/party/${index}`} key={index}>
            <PartyCard {...party} />
          </Link>
        </li>
      ))}
    </ul>
  )
}