import styles from './PartyIntroduceForm.module.scss'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { useState } from 'react'
import classNames from 'classnames'

type PartyIntroduceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyIntroduceForm({ onNext, formData, updateFormData }: PartyIntroduceFormProps) {
  const [partyName, setPartyName] = useState(formData.partyName)
  const [partyIntroduce, setPartyIntroduce] = useState(formData.partyIntroduce)

  const disabled = partyName.length < 5 || partyIntroduce.length < 10

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
          className={classNames(styles.nextBtn, {
            [styles.disabled]: disabled,
          })}
          onClick={() => {
            if (disabled) {
              return
            }
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
