import styles from './PartyBottomButton.module.scss'
import Chip from '@/components/Chip'
import Dialog from '@/components/Dialog'
import { post_party_$partyId_participate, usePartyDetail } from '@/services/party'
import { useCheckAdditionalInfo, useIsLogin } from '@/services/user'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PartyBottomButton({ id }: { id?: string }) {
  const navigate = useNavigate()

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
        <Dialog.Content onAction={() => navigate('/login')}>
          로그인이 필요한 서비스입니다.
          <br />
          로그인 하시겠습니까?
        </Dialog.Content>
      </Dialog>

      <Dialog open={openAlertAdditionalInfo} onOpenChange={onOpenAlertAdditionalInfo}>
        <Dialog.Content onAction={() => navigate('/user/my/new')}>
          파티에 참여하기 위해서는
          <br />
          추가정보 입력이 필요합니다.
        </Dialog.Content>
      </Dialog>
    </>
  )
}
