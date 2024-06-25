import Icon, { IconType } from '@/components/Icon/Icon'
import styles from './PartyMainInfo.module.scss'
import { PartyDetailType } from '@/services/party'

export function PartyMainInfo({
  partyName,
  appointmentTime,
  climbingType,
  constraints,
  maxParticipants,
  currentParticipants,
}: PartyDetailType) {
  return (
    <>
      <h1 className={styles.Title}>{partyName}</h1>

      <ul className={styles.Ul}>
        <li className={styles.Li}>
          <InfoItem icon={'CalendarLine'} title={'파티 일정'} content={appointmentTime} />
        </li>
        <li className={styles.Li}>
          <InfoItem icon={'TypeLine'} title={'파티 종목'} content={climbingType} />
        </li>
        <li className={styles.Li}>
          <InfoItem
            icon={'PersonLine'}
            title={'참여 인원'}
            content={`${constraints} | ${currentParticipants}/${maxParticipants}명`}
          />
        </li>
      </ul>

      <div className={styles.LocationLink} />
    </>
  )
}

function InfoItem({ icon, title, content }: { icon: IconType; title: string; content: string }) {
  return (
    <>
      <div className={styles.InfoTitle}>
        <Icon icon={icon} size="16" />
        {title}
      </div>
      <div className={styles.InfoContent}>{content}</div>
    </>
  )
}
