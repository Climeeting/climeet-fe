import { PartySurveyFormData } from '../PartySurveyFormPage.tsx'
import styles from './PartyScheduleForm.module.scss'

type PartyScheduleFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: (key: keyof PartySurveyFormData, value: string) => void
}

export function PartyScheduleForm({ onNext, formData, updateFormData }: PartyScheduleFormProps) {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          마지막이에요!
          <br />
          파티 일정을 입력해주세요.
        </h2>
        <div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>파티 날짜</h3>
            <div className={styles.trigger}>
              <div className={styles.triggerText}>{formData.partyDate}</div>
            </div>
            <div className={styles.content}>
              <input className={styles.input} placeholder={'5월 22일'} />
            </div>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>파티 시간</h3>
            <div className={styles.trigger}>
              <div className={styles.triggerText}>{formData.partyDate}</div>
            </div>
            <div className={styles.content}>
              <input className={styles.input} placeholder={'오후 06:00'} />
            </div>
          </div>
        </div>
        <div className={styles.notice}>
          <span>
            ※ 만남 3일 전부터 파티 삭제 및 수정은 불가합니다.
            <br />※ 유의 사항 문구를 입력해주세요.
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  )
}
