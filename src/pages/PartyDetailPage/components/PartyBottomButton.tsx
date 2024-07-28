import styles from './PartyBottomButton.module.scss'
import Chip from '@/components/Chip'
import AdditionalInfoDialog from '@/components/Dialog/AdditionalInfoDialog'
import Dialog from '@/components/Dialog/Dialog'
import LoginDialog from '@/components/Dialog/LoginDialog'
import { post_party_$partyId_participate, usePartyDetail } from '@/services/party'
import { useCheckAdditionalInfo, useIsLogin } from '@/services/user'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PartyBottomButton({ id }: { id?: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { data: isLogin } = useIsLogin()
  const { data: partyData } = usePartyDetail(Number(id))
  const { data: checkAdditionalInfo } = useCheckAdditionalInfo()

  const [openAlertLogin, onOpenAlertLogin] = useState(false)
  const [openAlertAdditionalInfo, onOpenAlertAdditionalInfo] = useState(false)

  return (
    <>
      <Chip className={styles.Button} variable="primary" asChild>
        {partyData?.isParticipation ? (
          <button>채팅방으로 가기!</button>
        ) : (
          <button
            onClick={async () => {
              if (!isLogin) {
                onOpenAlertLogin(true)
                return
              }
              if (checkAdditionalInfo?.isTrue) {
                onOpenAlertAdditionalInfo(true)
                return
              }
              await post_party_$partyId_participate(Number(id))
            }}
          >
            지금 파티 참가하기!
          </button>
        )}
      </Chip>

      <Dialog open={openAlertLogin} onOpenChange={onOpenAlertLogin}>
        <Dialog.Content onAction={() => navigate(`/login?redirect=${location.pathname}`)}>
          로그인이 필요한 서비스입니다.
          <br />
          로그인 하시겠습니까?
        </Dialog.Content>
      </Dialog>

      <LoginDialog open={openAlertLogin} onOpenChange={onOpenAlertLogin} />
      <AdditionalInfoDialog
        open={openAlertAdditionalInfo}
        onOpenChange={onOpenAlertAdditionalInfo}
      />
    </>
  )
}
