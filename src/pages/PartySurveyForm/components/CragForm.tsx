import styles from './CragForm.module.scss'

type CragFormProps = {
  onNext: (cragName: string) => void
}

export function CragForm({ onNext }: CragFormProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          파티를 진행하실
          <br />
          암장을 알려주세요.
        </h2>
        <input className={styles.input} placeholder={'암장 이름을 입력해주세요.'} />
      </div>
      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={() => onNext('더클 사당')}>
          다음
        </button>
      </div>
    </div>
  )
}
