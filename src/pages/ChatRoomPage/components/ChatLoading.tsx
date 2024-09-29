import styles from './ChatLoading.module.scss'

export default function ChatLoading () {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  )
}
