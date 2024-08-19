import TopBar from '@/components/NavBar/TopBar'
import Profile from './components/Profile'
import styles from './UserPage.module.scss'
import BottomBar from '@/components/NavBar/BottomBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import useIsMine from './hook/useIsMine'
import PartyCardList from './components/PartyCardList'
import PartyFilter from './components/PartyFilter'
import NotFound from '@/components/NotFound'
import { DateRangeProvider } from './hook/useDateRangeContext'

export default function UserPage() {
  const { id } = useParams<{ id: string }>()
  const isMine = useIsMine()

  return (
    <div className={styles.Container}>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>{isMine ? '마이페이지' : ''}</TopBar.Center>
        <TopBar.Right close />
      </TopBar>

      <ErrorBoundary fallback={<UserPageError />}>
        <section className={styles.ProfileSection}>
          <Suspense fallback={<Profile.Skeleton />}>
            <Profile.Query isMine={isMine} id={Number(id)} />
          </Suspense>
        </section>

        <DateRangeProvider>
          <section className={styles.PartyHistoryInfoSection}>
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
            <PartyFilter />
          </section>

          <section className={styles.PartyHistorySection}>
            <ErrorBoundary fallback={<PartyCardList.Retry userId={Number(id)} />}>
              <Suspense fallback={<PartyCardList.Skeleton />}>
                <PartyCardList.Query userId={Number(id)} />
              </Suspense>
            </ErrorBoundary>
          </section>
        </DateRangeProvider>
      </ErrorBoundary>
      <BottomBar />
    </div>
  )
}

function UserPageError() {
  return (
    <div className={styles.Error}>
      <NotFound />
    </div>
  )
}
