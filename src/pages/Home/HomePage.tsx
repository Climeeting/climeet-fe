import Profile from './Profile'
import TopBar from '@/components/NavBar/TopBar'
import styles from './HomePage.module.scss'
import BottomBar from '@/components/NavBar/BottomBar'
import FilterList from './components/FilterList'
import Tabs from './components/Tabs'
import { Search } from '@/components/Search'
import PartyCard from './components/PartyCard'
import { Link } from 'react-router-dom'
import DatePicker from '@/components/DatePicker'
import { usePartyList } from '@/services/party'

export default function HomePage() {
  const { data } = usePartyList()
  console.log(data)

  return (
    <div className={styles.container}>
      <TopBar type="main" />
      <main className={styles.main}>
        <div className={styles.SearchForm}>
          <Tabs tabs={['암장', '자연']} />
          <Search placeholder="암장을 검색해 보세요." />
          <DatePicker />
        </div>

        <div className={styles.Contents}>
          <h1>오늘의 파티</h1>
          <FilterList />
        </div>

        <ul className={styles.PartyUl}>
          {mockParty.map((party, index) => (
            <li>
              <Link to={`/party/${index}`} key={index}>
                <PartyCard {...party} />
              </Link>
            </li>
          ))}
        </ul>
        <Profile />
      </main>
      <BottomBar />
    </div>
  )
}

const mockParty = [
  {
    time: '오전 10:00',
    title:
      'V8 스승님 구합니다.. 타이틀 길어질 경우 2줄까지 표시 타이틀 길어질 경우 2줄까지 표시 타이틀 길어질 경우 2줄까지 표시',
    location: '서울숲 클라이밍 영등포점',
    constrains: '남자',
    status: '신청하기',
  },
  {
    time: '오후 2:00',
    title: 'V8 스승님 구합니다',
    location: '서울숲 클라이밍 영등포점',
    constrains: '남자',
    status: '신청하기',
  },
  {
    time: '오후 5:00',
    title: 'V8 스승님 구합니다',
    location: '서울숲 클라이밍 영등포점',
    constrains: '남자',
    status: '신청하기',
  },
  {
    time: '오후 7:00',
    title: 'V8 스승님 구합니다',
    location: '서울숲 클라이밍 영등포점',
    constrains: '남자',
    status: '신청하기',
  },
  {
    time: '오후 10:00',
    title: 'V8 스승님 구합니다',
    location: '서울숲 클라이밍 영등포점',
    constrains: '남자',
    status: '신청하기',
  },
]
