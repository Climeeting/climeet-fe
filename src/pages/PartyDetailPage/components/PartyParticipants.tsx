import { PartyDetailType } from '@/services/party'
import styles from './PartyParticipants.module.scss'

export function PartyParticipants({
  minimumSkillLevel,
  maximumSkillLevel,
  // skillDistributions,
}: PartyDetailType) {
  // console.log({ skillDistributions })

  return (
    <>
      <h2 className={styles.Title}>참가자 실력 분포</h2>

      <div className={styles.Noti}>
        <span className={styles.NotiTitle}>파티 레벨 :</span>
        <span
          className={styles.NotiDescription}
        >{`V${minimumSkillLevel}부터 V${maximumSkillLevel}까지`}</span>
      </div>

      <div className={styles.Graph} />
    </>
  )
}
