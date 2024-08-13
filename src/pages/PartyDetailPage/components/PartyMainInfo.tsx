import Icon, { IconType } from '@/components/Icon/Icon'
import styles from './PartyMainInfo.module.scss'
import { PartyDetailType } from '@/services/party'
import Avatar from '@/components/Avatar'
import { Link } from 'react-router-dom'

export function PartyMainInfo({
  partyName,
  appointmentTime,
  climbingType,
  constraints,
  maxParticipants,
  currentParticipants,
  masterProfileImageUrl,
  masterName,
  partyDescription,
  masterId,
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

      <div className={styles.Divider} />

      <div>
        <div className={styles.UserInfo}>
          <Link to={`/user/${masterId}`} className={styles.Profile}>
            <Avatar src={masterProfileImageUrl} size="small" alt={masterName} />
            <span>{masterName}</span>
          </Link>
          님이 진행하는 파티입니다.
        </div>
        <p className={styles.Description}>{partyDescription}</p>
      </div>
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
