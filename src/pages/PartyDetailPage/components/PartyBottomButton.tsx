import styles from './PartyBottomButton.module.scss'
import Chip from '@/components/Chip'
import AdditionalInfoDialog from '@/components/Dialog/AdditionalInfoDialog'
import LoginDialog from '@/components/Dialog/LoginDialog'
import { PartyDetailQuery, post_party_$partyId_participate, usePartyDetail } from '@/services/party'
import { useCheckAdditionalInfo, useIsLogin } from '@/services/user'
import useToast from '@/utils/useToast'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PartyBottomButton ({ id }: { id?: string }) {
  const { data: isLogin, isLoading } = useIsLogin()
  const { data: partyData } = usePartyDetail(Number(id))
  const { data: checkAdditionalInfo } = useCheckAdditionalInfo(!isLoading && isLogin)

  const [openAlertLogin, onOpenAlertLogin] = useState(false)
  const [openAlertAdditionalInfo, onOpenAlertAdditionalInfo] = useState(false)

  const toast = useToast()
  const isClosed = dayjs(partyData?.appointmentTime).isBefore(dayjs())

  if (!partyData) return null

  if (isClosed) {
    return (
      <Chip className={styles.Button} variable='default' asChild>
        <button disabled>종료된 파티입니다.</button>
      </Chip>
    )
  }

  return (
    <>
      <Chip className={styles.Button} variable='primary' asChild>
        {partyData?.isParticipation
          ? (
              <Link to={`/chat/${id}`}>채팅방으로 가기!</Link>
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
                    toast.add({
                      message: '파티에 참가하였습니다.',
                    })
                  } catch (e) {
                    if (e instanceof Error) {
                      console.log({ e })
                      toast.add({
                        message: e.message,
                      })
                    }
                  }
                }}
              >
                지금 파티 참가하기!
              </button>
            )}
      </Chip>
      <LoginDialog open={openAlertLogin} onOpenChange={onOpenAlertLogin} />
      <AdditionalInfoDialog
        open={openAlertAdditionalInfo}
        onOpenChange={onOpenAlertAdditionalInfo}
      />
    </>
  )
}
