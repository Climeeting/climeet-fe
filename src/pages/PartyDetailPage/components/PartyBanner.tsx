import styles from './PartyBanner.module.scss'

type props = {
  src?: string
}

export default function PartyBanner ({ src }: props) {
  return (
    <>
      {src && (
        <div className={styles.Banner}>
          <img src={src} />
        </div>
      )}
    </>
  )
}
