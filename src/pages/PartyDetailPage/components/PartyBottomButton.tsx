import styles from './PartyBottomButton.module.scss'
import Chip from '@/components/Chip'
import { post_party_$partyId_participate, usePartyDetail } from '@/services/party'
import { useIsLogin } from '@/services/user'

export default function PartyBottomButton({ id }: { id?: string }) {
  const { data: isLogin } = useIsLogin()
  const { data: partyData } = usePartyDetail(Number(id))

  return (
    <>
      <Chip className={styles.Button} variable="primary" asChild>
        {partyData?.isParticipation ? (
          <button>채팅방으로 가기!</button>
        ) : (
          <button
            onClick={async () => {
              if (!isLogin) alert('로그인이 필요합니다.')
              await post_party_$partyId_participate(Number(id))
            }}
          >
            지금 파티 참가하기!
          </button>
        )}
      </Chip>
    </>
  )
}
