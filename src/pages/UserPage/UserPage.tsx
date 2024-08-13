import TopBar from '@/components/NavBar/TopBar'
import Profile from './components/Profile'
import styles from './UserPage.module.scss'
import BottomBar from '@/components/NavBar/BottomBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import Icon from '@/components/Icon/Icon'
import useIsMine from './hook/useIsMine'

export default function UserPage() {
  const { id } = useParams<{ id: string }>()
  const isMine = useIsMine()

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>마이페이지</TopBar.Center>
        <TopBar.Right close />
      </TopBar>

      <section className={styles.ProfileSection}>
        <ErrorBoundary fallback={<Profile.Retry />}>
          <Suspense fallback={<Profile.Skeleton />}>
            <Profile.Query isMine={isMine} id={Number(id)} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className={styles.PartyHistoryInfo}>
        <h2 className={styles.Title}>파티 이력</h2>
        <div className={styles.Table}>
          <div className={styles.Box}>
            <h3 className={styles.Label}>암장 파티</h3>
            <span className={styles.Times}>4번</span>
          </div>
          <div className={styles.Box}>
            <h3 className={styles.Label}>자연 파티</h3>
            <span className={styles.Times}>4번</span>
          </div>
        </div>
      </section>

      <section className={styles.PartyHistoryList}>
        {mockData.map((data) => (
          <PartyCard key={data.partyId} {...data} />
        ))}
      </section>

      <BottomBar />
    </div>
  )
}

function PartyCard({ thumbnail, partyId, time, title, address }: MockData) {
  return (
    <Link className={styles.Card} to={`/party/${partyId}`}>
      {thumbnail && (
        <div className={styles.Image}>
          <img src={thumbnail} alt="thumbnail" />
        </div>
      )}
      <div className={styles.Info}>
        <div className={styles.Time}>{dayjs(time).format('YYYY.MM.DD')}</div>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Address}>
          <Icon icon="LocationFill" size={16} />
          {address}
        </div>
      </div>
      <Icon className={styles.ArrowIcon} icon="ArrowRight" size={16} />
    </Link>
  )
}

type MockData = {
  thumbnail?: string
  time: string
  title: string
  address: string
  isClosed: boolean
  masterId: number
  partyId: number
}
const mockData: MockData[] = [
  {
    thumbnail: 'https://via.placeholder.com/150',
    time: '2021-09-01',
    title: '암장 파티',
    address: '서울시 강남구',
    isClosed: false,
    masterId: 1,
    partyId: 1,
  },
  {
    time: '2021-09-04',
    title: '암장 파티 123',
    address: '서울시 강남구',
    isClosed: false,
    masterId: 1,
    partyId: 2,
  },
  {
    thumbnail: 'https://via.placeholder.com/150',
    time: '2021-09-04',
    title: '암장 파티',
    address: '서울시 강남구',
    isClosed: false,
    masterId: 1,
    partyId: 234,
  },
  {
    thumbnail: 'https://via.placeholder.com/150',
    time: '2021-09-04',
    title: '암장 파티',
    address: '서울시 강남구',
    isClosed: false,
    masterId: 1,
    partyId: 24,
  },
  {
    thumbnail: 'https://via.placeholder.com/150',
    time: '2021-09-04',
    title: '암장 파티',
    address: '서울시 강남구',
    isClosed: false,
    masterId: 1,
    partyId: 25,
  },
  {
    time: '2021-10-01',
    title: '암장 파티',
    address: '서울시 강남구',
    isClosed: false,
    masterId: 1,
    partyId: 3,
  },
] as const
