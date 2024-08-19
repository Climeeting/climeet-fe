import styles from './PartyDetailPage.module.scss'
import { useParams } from 'react-router-dom'
import TopBar from '@/components/NavBar/TopBar'
import PartyDetail from './components/PartyDetail'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MoreMenu from './components/MoreMenu'
import PartyBottomButton from './components/PartyBottomButton'

export function PartyDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <TopBar>
        <TopBar.Left back />
        {/* <TopBar.Center>{`파티 디테일 ${id}`}</TopBar.Center> */}
        <TopBar.Right asChild>
          <MoreMenu id={id} />
        </TopBar.Right>
      </TopBar>

      <ErrorBoundary fallback={<PartyDetail.Retry id={Number(id)} />}>
        <div className={styles.Container}>
          <Suspense fallback={<PartyDetail.Skeleton />}>
            <PartyDetail.Query id={Number(id)} />
          </Suspense>
        </div>
        <div className={styles.Bottom}>
          <PartyBottomButton id={id} />
        </div>
      </ErrorBoundary>
    </>
  )
}
