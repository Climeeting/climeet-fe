import styles from './PartyBanner.module.scss'
import DefaultImage from '@/assets/default_detail_thumbnail.png'

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
