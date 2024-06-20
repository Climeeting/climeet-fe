import Chip from '@/components/Chip'
import Icon from '@/components/Icon/Icon'
import styles from './PartyCard.module.scss'
import classNames from 'classnames'
import { PartyItem } from '@/services/party'
import { Party } from '@/pages/types/api'

export default function PartyCard({ party }: { party: Party }) {
  const { appointmentTime, partyTitle, locationId, constraints } = new PartyItem(party)
  return (
    <div className={styles.Container}>
      <section className={styles.Top}>
        <span className={styles.Time}>{appointmentTime}</span>
        <h3>{partyTitle}</h3>
      </section>

      <div className={styles.Divider} />

      <section className={styles.Section}>
        <div>
          <div className={styles.Info}>
            <Icon icon={'LocationFill'} size="14" />
            {locationId}
          </div>
          <div className={styles.Info}>
            <Icon icon={'PersonFill'} size="14" />
            {constraints}
          </div>
        </div>
        <Chip className={styles.Chip} variable={'primary'}>
          {/* {status} */}
          신청하기
        </Chip>
      </section>
    </div>
  )
}

PartyCard.Skeleton = () => (
  <div className={styles.SkeletonContainer}>
    <section className={styles.SkeletonTop}>
      <div className={classNames(styles.Skeleton, styles['w-80'], styles['h-25'])} />
      <div className={classNames(styles.Skeleton, styles['w-60'])} />
    </section>
    <div className={styles.Divider} />
    <section className={styles.SkeletonSection}>
      <div className={classNames(styles.Skeleton, styles['w-60'])} />
      <div className={classNames(styles.Skeleton, styles['w-40'])} />
    </section>
  </div>
)
