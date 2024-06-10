import styles from './PartyPlaceForm.module.scss'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { useState } from 'react'
import classNames from 'classnames'

type PartyPlaceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyPlaceForm({ onNext, formData, updateFormData }: PartyPlaceFormProps) {
  const [value, setValue] = useState(formData.cragName)

  const isEmpty = value === ''

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
          className={classNames(styles.nextBtn, {
            [styles.disabled]: isEmpty,
          })}
          onClick={() => {
            if (isEmpty) {
              return
            }
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
