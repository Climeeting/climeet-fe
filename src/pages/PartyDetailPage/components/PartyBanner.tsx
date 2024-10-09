import styles from './PartyBanner.module.scss'
import DefaultImage from '@/assets/default_detail_thumbnail.png'
import Skeleton from 'react-loading-skeleton'

type props = {
  src?: string
}

export default function PartyBanner ({ src }: props) {
  return (
    <>
      <div className={styles.Banner}>
        <img src={src || DefaultImage} />
      </div>
    </>
  )
}

PartyBanner.Skeleton = function PartyBannerSkeleton () {
  return (
    <div className={styles.Banner}>
      <Skeleton width='100%' height='100%' />
    </div>
  )
}
