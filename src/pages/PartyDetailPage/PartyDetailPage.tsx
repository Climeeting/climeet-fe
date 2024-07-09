import styles from './PartyDetailPage.module.scss'
import Chip from '@/components/Chip'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '@/components/NavBar/TopBar'
import PartyDetail from './components/PartyDetail'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { post_party_$partyId_participate } from '@/services/party'
import { useIsLogin } from '@/services/user'
import Icon from '@/components/Icon/Icon'
import Dialog from '@/components/Dialog'
import Dropdown from '@/components/Dropdown'

export function PartyDetailPage() {
  const navigate = useNavigate()
  const isLogin = useIsLogin()
  const [openDropdown, onOpenDropdown] = useState(false)
  const [openAlertLogin, onOpenAlertLogin] = useState(false)
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <TopBar>
        <TopBar.Left back />
        <TopBar.Center>{`파티 디테일 ${id}`}</TopBar.Center>
        <TopBar.Right asChild>
          <Dropdown open={openDropdown} onOpenChange={onOpenDropdown}>
            <Dropdown.Trigger>
              <Icon icon="More" />
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>
                <p>파티 수정하기</p>
                <Icon size="16" icon="Pencil" />
              </Dropdown.Item>

              <Dropdown.Item
                onSelect={() => {
                  onOpenDropdown(false)
                  onOpenAlertLogin(true)
                }}
              >
                <p>파티 삭제하기</p>
                <Icon size="16" icon="Remove" />
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
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

      <Dialog open={openAlertLogin} onOpenChange={onOpenAlertLogin}>
        <Dialog.Content onConfirm={() => navigate('/login')}>
          로그인이 필요한 서비스입니다.
          <br />
          로그인 하시겠습니까?
        </Dialog.Content>
      </Dialog>
    </>
  )
}
