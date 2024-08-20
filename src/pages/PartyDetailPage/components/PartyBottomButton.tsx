import styles from './PartyBottomButton.module.scss'
import Chip from '@/components/Chip'
import AdditionalInfoDialog from '@/components/Dialog/AdditionalInfoDialog'
import LoginDialog from '@/components/Dialog/LoginDialog'
import Toast, { useToast } from '@/components/Toast'
import { PartyDetailQuery, post_party_$partyId_participate, usePartyDetail } from '@/services/party'
import { useCheckAdditionalInfo, useIsLogin } from '@/services/user'
import { useState } from 'react'

export default function PartyBottomButton ({ id }: { id?: string }) {
  const { data: isLogin, isLoading } = useIsLogin()
  const { data: partyData } = usePartyDetail(Number(id))
  const { data: checkAdditionalInfo } = useCheckAdditionalInfo(!isLoading && isLogin)

  const [openAlertLogin, onOpenAlertLogin] = useState(false)
  const [openAlertAdditionalInfo, onOpenAlertAdditionalInfo] = useState(false)

  const [openToast, setOpenToast] = useToast()
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
      <Chip className={styles.Button} variable='primary' asChild>
        {partyData?.isParticipation
          ? (
              <button>채팅방으로 가기!</button>
            )
          : (
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
                  try {
                    await post_party_$partyId_participate(Number(id))
                    PartyDetailQuery.refetch(Number(id))
                  } catch (e) {
                    if (e instanceof Error) {
                      console.log({ e })
                      setErrorMessage(e.message)
                      setOpenToast(true)
                    }
                  }
                }}
              >
                지금 파티 참가하기!
              </button>
            )}
      </Chip>

      <Toast open={openToast} setOpen={setOpenToast}>
        {errorMessage}
      </Toast>

      <LoginDialog open={openAlertLogin} onOpenChange={onOpenAlertLogin} />
      <AdditionalInfoDialog
        open={openAlertAdditionalInfo}
        onOpenChange={onOpenAlertAdditionalInfo}
      />
    </>
  )
}
