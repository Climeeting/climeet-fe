import styles from './PartyBanner.module.scss'

type props = {
  src?: string
}

export default function PartyBanner ({ src }: props) {
  return (
    <>
      {src && <img src={src} className={styles.Banner} />}
    </>
  )
}
