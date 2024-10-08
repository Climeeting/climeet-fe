import Chip, { Variable } from '@/components/Chip'
import Icon from '@/components/Icon/Icon'
import styles from './PartyCard.module.scss'
import { PartyItem } from '@/services/party'
import { Party } from '@/pages/types/api'
import DefaultImage from '@/assets/default_main_thumbnail.png'
import { JoinStatusFe } from '@/services/adaptor.ts'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const chipColor: {
  [key in JoinStatusFe]: Variable
} = {
  전체: 'primary',
  신청하기: 'primary',
  마감임박: 'secondary',
  마감: 'default',
}

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
        <Chip
          className={styles.Chip}
          variable={chipColor[joinStatus]}
        >
          {joinStatus}
        </Chip>
      </section>
    </div>
  )
}

PartyCard.Skeleton = function PartyCardSkeleton () {
  return (
    <SkeletonTheme baseColor='#f6f6f6' highlightColor='#fff'>
      <div className={styles.SkeletonContainer}>
        <div className={styles.Top}>
          <Skeleton width={82} height={82} borderRadius={6} />
          <div className={styles.SkeletonContent}>
            <Skeleton width='40%' height={20} borderRadius={10} />
            <Skeleton width='80%' height={20} borderRadius={10} />
            <Skeleton width='60%' height={24} borderRadius={12} />
          </div>
        </div>
        <div className={styles.Divider} />
        <section className={styles.Section}>
          <div className={styles.SkeletonSection}>
            <Skeleton width='40%' height={20} borderRadius={10} />
            <Skeleton width='20%' height={20} borderRadius={10} />
          </div>
          <Skeleton className={styles.Chip} width={76} height={36} borderRadius={18} />
        </section>
      </div>
    </SkeletonTheme>
  )
}
