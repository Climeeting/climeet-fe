import styles from './PartyDetailPage.module.scss'
import Chip from '@/components/Chip'
import { useParams } from 'react-router-dom'
import TopBar from '@/components/NavBar/TopBar'
import PartyDetail from './components/PartyDetail'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { post_party_$partyId_participate } from '@/services/party'
import { useIsLogin } from '@/services/user'
import MoreMenu from './components/MoreMenu'

export function PartyDetailPage() {
  const { data: isLogin } = useIsLogin()
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>{`파티 디테일 ${id}`}</TopBar.Center>
        <TopBar.Right asChild>
          <MoreMenu id={id} />
        </TopBar.Right>
      </TopBar>

      <div className={styles.Container}>
        <ErrorBoundary fallback={<PartyDetail.Retry />}>
          <Suspense fallback={<PartyDetail.Skeleton />}>
            <PartyDetail.Query id={Number(id)} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className={styles.Bottom}>
        <Chip className={styles.Button} variable="primary" asChild>
          <button
            onClick={async () => {
              if (!isLogin) alert('로그인이 필요합니다.')
              await post_party_$partyId_participate(Number(id))
            }}
          >
            지금 파티 참가하기!
          </button>
        </Chip>
      </div>
    </>
  )
}
