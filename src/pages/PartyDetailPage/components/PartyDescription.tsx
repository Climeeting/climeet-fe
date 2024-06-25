import { PartyDetailType } from '@/services/party'
import styles from './PartyDescription.module.scss'
import Avatar from '@/components/Avatar'

export function PartyDescription({
  masterProfileImageUrl,
  masterName,
  partyDescription,
}: PartyDetailType) {
  return (
    <>
      <h2 className={styles.Title}>파티 소개</h2>
      <div className={styles.UserInfo}>
        <div className={styles.Profile}>
          <Avatar src={masterProfileImageUrl} size="small" alt={masterName} />
          <span>{masterName}</span>
        </div>
        님이 진행하는 파티입니다.
      </div>
      <div className={styles.Divider} />
      <p className={styles.Description}>{partyDescription}</p>
    </>
  )
}
