import styles from './PartyPlaceForm.module.scss'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { useState } from 'react'
import classNames from 'classnames'
import { ClimbSearchItem } from '@/pages/types/api.ts'
import { get_climb_search } from '@/services/gymSearch.ts'

type PartyPlaceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyPlaceForm({ onNext, formData, updateFormData }: PartyPlaceFormProps) {
  const [locationId, setLocationId] = useState<number>(formData.locationId)
  const [value, setValue] = useState(formData.cragName)
  const [gymList, setGymList] = useState<ClimbSearchItem[]>([])

  const disabled = !value

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
          onBlur={async () => {
            if (value !== '') {
              const res = await get_climb_search(value)
              setGymList(res.content)
            }
          }}
        />
        <div>
          {gymList.map((el) => (
            <div
              onClick={() => {
                setValue(el.name)
                setLocationId(el.id)
              }}
            >
              {el.name}
            </div>
          ))}
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
            updateFormData('cragName', value)
            updateFormData('locationId', locationId)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
