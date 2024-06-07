import Icon, { IconType } from '@/components/Icon/Icon'
import styles from './PartyMainInfo.module.scss'

export function PartyMainInfo() {
  return (
    <>
      <h1 className={styles.Title}>V8 스승님 구합니다</h1>

      <ul className={styles.Ul}>
        <li className={styles.Li}>
          <InfoItem
            icon={'CalendarLine'}
            title={'파티 일정'}
            content={'4월 22일 (월) 오전 10:00'}
          />
        </li>
        <li className={styles.Li}>
          <InfoItem icon={'TypeLine'} title={'파티 종목'} content={'볼더링'} />
        </li>
        <li className={styles.Li}>
          <InfoItem icon={'PersonLine'} title={'참여 인원'} content={'남녀모두 | 4/6명'} />
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
