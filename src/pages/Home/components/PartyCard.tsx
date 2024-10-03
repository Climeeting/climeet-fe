import Chip from '@/components/Chip'
import Icon from '@/components/Icon/Icon'
import styles from './PartyCard.module.scss'
import classNames from 'classnames'
import { PartyItem } from '@/services/party'
import { Party } from '@/pages/types/api'
import DefaultImage from '@/assets/default_main_thumbnail.png'

export default function PartyCard ({ party }: { party: Party }) {
  const {
    appointmentTime, partyTitle, gymName, constraints, joinStatus, levelRange,
  }
    = new PartyItem(party).adapt()

  return (
    <div className={styles.Container}>
      <section className={styles.Top}>
        <div className={styles.Image}>
          <img src={party.partyImageUrl || DefaultImage} alt={party.partyTitle} />
          {/* <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDYav_Rs5aHeNlHWC0_QC9JLMwLa_7jzKTQ&s"
              alt={party.partyTitle}
            /> */}
        </div>
        <div className={styles.Content}>
          <span className={styles.Time}>{appointmentTime}</span>
          <h3>{partyTitle}</h3>
          <span className={styles.GymName}>{gymName}</span>
        </div>
      </section>

      <div className={styles.Divider} />

      <section className={styles.Section}>
        <div>
          <div className={styles.Info}>
            <Icon icon='Star' size='14' />
            {levelRange}
          </div>
          <div className={styles.Info}>
            <Icon icon='PersonFill' size='14' />
            {constraints}
          </div>
        </div>
        <Chip className={styles.Chip} variable='primary'>
          {joinStatus}
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
