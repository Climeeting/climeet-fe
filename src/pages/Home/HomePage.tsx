import Profile from './Profile'
import TopBar from '@/components/NavBar/TopBar'
import styles from './HomePage.module.scss'
import BottomBar from '@/components/NavBar/BottomBar'
import FilterList from './components/FilterList'
import Tabs from './components/Tabs'
import DatePickerContainer from '@/components/DatePicker.tsx'
import PartyList from './components/PartyList'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FilterProvider } from './hooks/useFilterContext'
import { DateProvider } from './hooks/useDateContext'
import GymSearch from '@/pages/Home/components/GymSearch.tsx'

export default function HomePage() {
  return (
    <FilterProvider>
      <DateProvider>
        <div className={styles.container}>
          <TopBar type="main" />
          <main className={styles.main}>
            <div className={styles.SearchForm}>
              <Tabs tabs={['암장', '자연']} />
              <GymSearch />
              <DatePickerContainer />
            </div>

            <div className={styles.Contents}>
              <h1>오늘의 파티</h1>
              <FilterList />
            </div>

            {/* https://tanstack.com/query/latest/docs/framework/react/guides/suspense */}
            <ErrorBoundary fallback={<PartyList.Retry />}>
              <Suspense fallback={<PartyList.Skeleton />}>
                <PartyList />
              </Suspense>
            </ErrorBoundary>

            <Profile />
          </main>
          <BottomBar />
        </div>
      </DateProvider>
    </FilterProvider>
  )
}
