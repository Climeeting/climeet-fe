import styles from './PartyPlaceForm.module.scss'
import { PartySurveyFormData } from '../PartySurveyFormPage.tsx'
import { useState } from 'react'

type PartyPlaceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: (key: keyof PartySurveyFormData, value: string) => void
}

export function PartyPlaceForm({ onNext, formData, updateFormData }: PartyPlaceFormProps) {
  const [value, setValue] = useState(formData.cragName)

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          파티를 진행하실
          <br />
          암장을 알려주세요.
        </h2>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          className={styles.input}
          placeholder={'암장 이름을 입력해주세요.'}
        />
      </div>
      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          onClick={() => {
            updateFormData('cragName', value)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
