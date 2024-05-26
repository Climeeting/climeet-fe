import { get_oauth_logout } from '../../services/oauth'
import Profile from './Profile'
import { useStack } from '@stackflow/react'
import { useFlow } from '../stackflow'
import { useEffect } from 'react'
import TopBar from '../../components/NavBar/TopBar'
import styles from './HomePage.module.scss'
import BottomBar from '../../components/NavBar/BottomBar'
import FilterList from './components/FilterList'
import Tabs from './components/Tabs'

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
        <Tabs tabs={['암장', '자연']} />

        <h1>오늘의 파티</h1>
        <FilterList />

        <button
          onClick={() => {
            push('LoginPage', {})
          }}
        >
          로그인 하러 가기
        </button>
        <button onClick={get_oauth_logout}>로그아웃</button>
        <Profile />
      </main>
      <BottomBar />
    </div>
  )
}
