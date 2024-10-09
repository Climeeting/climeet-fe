import Icon, { IconType } from '@/components/Icon/Icon'
import styles from './PartyMainInfo.module.scss'
import { PartyDetailType } from '@/services/party'
import Avatar from '@/components/Avatar'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'

export function PartyMainInfo ({
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
          <InfoItem icon='CalendarLine' title='파티 일정' content={appointmentTime} />
        </li>
        <li className={styles.Li}>
          <InfoItem icon='TypeLine' title='파티 종목' content={climbingType} />
        </li>
        <li className={styles.Li}>
          <InfoItem
            icon='PersonLine'
            title='참여 인원'
            content={
              <div className={styles.InfoPerson}>{constraints}<span className={styles.SmallDivider} />{currentParticipants}/{maxParticipants}명</div>
            }
          />
        </li>
      </ul>

      <div className={styles.Divider} />

      <div>
        <div className={styles.UserInfo}>
          <Link to={`/user/${masterId}`} className={styles.Profile}>
            <Avatar src={masterProfileImageUrl} size='small' alt={masterName} />
            <span>{masterName}</span>
          </Link>
          님이 진행하는 파티입니다.
        </div>
        <p className={styles.Description}>{partyDescription}</p>
      </div>
    </>
  )
}

function InfoItem ({ icon, title, content }: { icon: IconType, title: string, content: ReactNode }) {
  return (
    <>
      <div className={styles.InfoTitle}>
        <Icon icon={icon} size='16' />
        {title}
      </div>
      <div className={styles.InfoContent}>{content}</div>
    </>
  )
}

PartyMainInfo.Skeleton = function PartyMainInfoSkeleton () {
  return (
    <>
      <div style={{
        lineHeight: 1,
        backgroundColor: '#fff',
      }}
      >
        <Skeleton width={160} height={27} borderRadius={13} />
      </div>

      <ul className={styles.Ul}>
        <li className={styles.Li}>
          <InfoItem
            icon='CalendarLine'
            title='파티 일정'
            content={
              <Skeleton width={152} height={22} borderRadius={11} />
            }
          />
        </li>
        <li className={styles.Li}>
          <InfoItem
            icon='TypeLine'
            title='파티 종목'
            content={
              <Skeleton width={67} height={22} borderRadius={11} />
            }
          />
        </li>
        <li className={styles.Li}>
          <InfoItem
            icon='PersonLine'
            title='참여 인원'
            content={(
              <div className={styles.InfoPerson}>
                <Skeleton width={67} height={22} borderRadius={11} />
                <span className={styles.SmallDivider} />
                <Skeleton width={67} height={22} borderRadius={11} />
              </div>
            )}
          />
        </li>
      </ul>

      <div className={styles.Divider} />

      <div>
        <div className={styles.UserInfo}>
          <div className={styles.Profile}>
            <Skeleton width={32} height={32} circle />
            <span>
              <Skeleton width={150} height={27} borderRadius={13} />
            </span>
          </div>
        </div>
        <div
          style={{
            lineHeight: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            width: '100%',
          }}
        >
          <Skeleton width='90%' height={22} borderRadius={11} />
          <Skeleton width='100%' height={22} borderRadius={11} />
          <Skeleton width='80%' height={22} borderRadius={11} />
        </div>
      </div>
    </>
  )
}
