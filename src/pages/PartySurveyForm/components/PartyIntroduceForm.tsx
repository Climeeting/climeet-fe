import styles from './PartyIntroduceForm.module.scss'
import { PartySurveyFormData } from '../PartySurveyFormPage.tsx'
import React, { useState } from 'react'

type PartyIntroduceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: (key: keyof PartySurveyFormData, value: string) => void
}

export function PartyIntroduceForm({ onNext, formData, updateFormData }: PartyIntroduceFormProps) {
  const [partyName, setPartyName] = useState(formData.partyName)
  const [partyIntroduce, setPartyIntroduce] = useState(formData.partyIntroduce)

  const handlePartyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(e.target.value)
  }

  const handlePartyIntroduceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartyIntroduce(e.target.value)
  }

  const handleNextBtnClick = () => {
    updateFormData('partyName', partyName)
    updateFormData('partyIntroduce', partyIntroduce)
    onNext()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>파티를 소개해주세요.</h2>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>사진 등록</h3>
          <div className={styles.content}>
            <input
              className={styles.input}
              placeholder={'대표 사진을 등록해 주세요.'}
              type={'file'}
            />
          </div>
        </div>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>제목</h3>
          <div className={styles.content}>
            <input
              className={styles.input}
              placeholder={'파티 제목을 입력해주세요.'}
              value={partyName}
              onChange={handlePartyNameChange}
            />
          </div>
        </div>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>파티 소개 내용</h3>
          <div className={styles.content}>
            <input
              className={styles.input}
              placeholder={'내용을 입력해주세요.'}
              value={partyIntroduce}
              onChange={handlePartyIntroduceChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={handleNextBtnClick}>
          다음
        </button>
      </div>
    </div>
  )
}
