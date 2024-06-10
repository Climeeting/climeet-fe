import styles from './PartyClimbInfo.module.scss'

export function PartyClimbInfo() {
  return (
    <>
      <h2 className={styles.Title}>암장 정보</h2>
      <ul className={styles.Ul}>
        {ClimbInfo.map(({ name, src }) => (
          <li key={name} className={styles.Card}>
            <img src={src} alt={name} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

const ClimbInfo = [
  {
    name: '세족실',
    src: 'https://via.placeholder.com/150',
  },
  {
    name: '주차가능',
    src: 'https://via.placeholder.com/150',
  },
  {
    name: '암벽화 대여',
    src: 'https://via.placeholder.com/150',
  },
  {
    name: '초크',
    src: 'https://via.placeholder.com/150',
  },
  {
    name: '초크2',
    src: 'https://via.placeholder.com/150',
  },
  {
    name: '초크3',
    src: 'https://via.placeholder.com/150',
  },
]
