import styles from './PartyDetailPage.module.scss'
import Chip from '@/components/Chip'
import { useParams } from 'react-router-dom'
import TopBar from '@/components/NavBar/TopBar'
import PartyDetail from './components/PartyDetail'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function PartyDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <TopBar type="default" title={`파티 디테일 ${id}`} />
      <div className={styles.Container}>
        <ErrorBoundary fallback={<PartyDetail.Retry />}>
          <Suspense fallback={<PartyDetail.Skeleton />}>
            <PartyDetail id={Number(id)} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className={styles.Bottom}>
        <Chip className={styles.Button} variable="primary" asChild>
          <button>지금 파티 참가하기!</button>
        </Chip>
      </div>
    </>
  )
}
