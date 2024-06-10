import styles from './PartyParticipants.module.scss'

export function PartyParticipants() {
  return (
    <>
      <h2 className={styles.Title}>참가자 실력 분포</h2>
      <div className={styles.Graph} />
    </>
  )
}
