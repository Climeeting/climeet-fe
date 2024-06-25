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
  const [partyIntroduce, setPartyIntroduce] = useState(formData.partyDescription)

  const PARTY_NAME_MIN_LIMIT = 5
  const PARTY_NAME_MAX_LIMIT = 20
  const PARTY_INTRODUCE_MIN_LIMIT = 10
  const PARTY_INTRODUCE_MAX_LIMIT = 300

  const isPartyNameValid =
    partyName.length >= PARTY_NAME_MIN_LIMIT && partyName.length <= PARTY_NAME_MAX_LIMIT

  const isPartyIntroduceValid =
    partyIntroduce.length >= PARTY_INTRODUCE_MIN_LIMIT &&
    partyIntroduce.length <= PARTY_INTRODUCE_MAX_LIMIT

  const isFormValid = isPartyNameValid && isPartyIntroduceValid

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
            {partyName === '' ? (
              <div className={styles.minMax}>
                최소 {PARTY_NAME_MIN_LIMIT}자 / 최대 {PARTY_NAME_MAX_LIMIT}자
              </div>
            ) : (
              <div className={styles.minMax}>
                <strong>{partyName.length}자</strong> / 최대 {PARTY_NAME_MAX_LIMIT}자
              </div>
            )}
          </div>
        </div>
        <div className={styles.question}>
          <h3 className={styles.questionTitle}>파티 소개 내용</h3>
          <div className={styles.content}>
            <textarea
              className={styles.textarea}
              placeholder={'내용을 입력해주세요.'}
              value={partyIntroduce}
              onChange={(e) => {
                setPartyIntroduce(e.target.value)
              }}
            />
            {partyIntroduce === '' ? (
              <div className={styles.minMax}>
                최소 {PARTY_INTRODUCE_MIN_LIMIT}자 / 최대 {PARTY_INTRODUCE_MAX_LIMIT}자
              </div>
            ) : (
              <div className={styles.minMax}>
                <strong>{partyIntroduce.length}자</strong> / 최대 {PARTY_INTRODUCE_MAX_LIMIT}자
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button
          className={classNames(styles.nextBtn, {
            [styles.disabled]: !isFormValid,
          })}
          onClick={() => {
            if (!isFormValid) {
              return
            }
            updateFormData('partyName', partyName)
            updateFormData('partyDescription', partyIntroduce)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
