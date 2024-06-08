import styles from './PartyIntroduceForm.module.scss'
import { PartySurveyFormData } from '../PartySurveyFormPage.tsx'
import { useState } from 'react'

type PartyIntroduceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: (key: keyof PartySurveyFormData, value: string) => void
}

export function PartyIntroduceForm({ onNext, formData, updateFormData }: PartyIntroduceFormProps) {
  const [partyName, setPartyName] = useState(formData.partyName)
  const [partyIntroduce, setPartyIntroduce] = useState(formData.partyIntroduce)

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>파티를 소개해주세요.</h2>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>제목</h3>
          <div className={styles.content}>
            <input
              className={styles.input}
              placeholder={'파티 제목을 입력해주세요.'}
              value={partyName}
              onChange={(e) => {
                setPartyName(e.target.value)
              }}
            />
          </div>
        </div>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>파티 소개 내용</h3>
          <div className={styles.content}>
            <textarea
              className={styles.input}
              placeholder={'내용을 입력해주세요.'}
              value={partyIntroduce}
              onChange={(e) => {
                setPartyIntroduce(e.target.value)
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          onClick={() => {
            updateFormData('partyName', partyName)
            updateFormData('partyIntroduce', partyIntroduce)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
