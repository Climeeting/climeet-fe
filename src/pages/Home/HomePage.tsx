import { get_oauth_logout } from '@/services/oauth'
import Profile from './Profile'
import { useStack } from '@stackflow/react'
import { useFlow } from '../stackflow'
import { useEffect } from 'react'
import TopBar from '@/components/NavBar/TopBar'
import styles from './HomePage.module.scss'
import BottomBar from '@/components/NavBar/BottomBar'
import FilterList from './components/FilterList'
import Tabs from './components/Tabs'
import { Search } from '@/components/Search'
import PartyCard from './components/PartyCard'

export default function HomePage() {
  const stack = useStack()
  const { push } = useFlow()

  useEffect(() => {
    console.log({ stack })
    console.log('현재 쌓여진 액티비티들:', stack.activities)
    console.log('전체 전환 상태:', stack.globalTransitionState)
    console.log('초기에 설정된 Transition Duration 옵션', stack.transitionDuration)
  }, [stack])

  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <div className={styles.SearchForm}>
          <Tabs tabs={['암장', '자연']} />
          <Search placeholder="암장을 검색해 보세요." />
        </div>

        <div className={styles.Contents}>
          <h1>오늘의 파티</h1>
          <FilterList />
        </div>

        <ul className={styles.PartyUl}>
          {mockParty.map((party, index) => (
            <li key={index}>
              <PartyCard {...party} />
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            push('LoginPage', {})
          }}
        >
          로그인 하러 가기
        </button>
        <button onClick={get_oauth_logout}>로그아웃</button>
        <div
          onClick={() => {
            push('PartySurveyFormPage', {})
          }}
        >
          파티 만들기
        </div>
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
