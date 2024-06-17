import Profile from './Profile'
import TopBar from '@/components/NavBar/TopBar'
import styles from './HomePage.module.scss'
import BottomBar from '@/components/NavBar/BottomBar'
import FilterList from './components/FilterList'
import Tabs from './components/Tabs'
import { Search } from '@/components/Search'
import DatePicker from '@/components/DatePicker'
import PartyList from './components/PartyList'
import { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import { PartyListQuery } from '@/services/party'

export default function HomePage() {
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

          {/* https://tanstack.com/query/latest/docs/framework/react/guides/suspense */}
          <ErrorBoundary fallback={<Retry onClickRetry={PartyListQuery.refetch} />}>
            <Suspense fallback={<Loading />}>
              <FilterList />
            </Suspense>
          </ErrorBoundary>
        </div>

        <PartyList />
        <Profile />
      </main>
      <BottomBar />
    </div>
  )
}

function Loading() {
  return <div>Loading... (in home page)</div>
}

function Retry({ onClickRetry }: { onClickRetry: () => void }) {
  return (
    <div>
      <div>오류가 발생했습니다.</div>
      <button onClick={onClickRetry}>재시도</button>
    </div>
  )
}