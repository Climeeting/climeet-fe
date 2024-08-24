import styles from './PartyPlaceForm.module.scss'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { useState } from 'react'
import classNames from 'classnames'
import Icon from '@/components/Icon/Icon.tsx'
import { useClimbingGymSearch } from '@/utils/useClimbingGymSearch.tsx'

type PartyPlaceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyPlaceForm ({ onNext, formData, updateFormData }: PartyPlaceFormProps) {
  const [locationId, setLocationId] = useState<number>(formData.locationId)
  const [value, setValue] = useState(formData.cragName)
  const [lastSelectedCragName, setLastSelectedCragName] = useState<string>(formData.cragName)
  const { gymList } = useClimbingGymSearch(value)

  const disabled = locationId === -1

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          파티를 진행하실
          <br />
          암장을 알려주세요.
        </h2>
        <div className={styles.inputContainer}>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            className={styles.input}
            placeholder='암장 이름을 입력해주세요.'
          />
          {value.length === 0
            ? (
                <Icon icon='Search' size={20} className={styles.SearchIcon} />
              )
            : (
                <button onClick={() => setValue('')} className={styles.DeleteBtn} aria-label='지우기'>
                  <Icon icon='DeleteCircle' size={18} />
                </button>
              )}
        </div>
        <div className={styles.searchList}>
          {gymList.map(el => (
            <div
              key={el.id}
              className={styles.searchItem}
              onClick={() => {
                setValue(el.name)
                setLastSelectedCragName(el.name)
                setLocationId(el.id)
              }}
            >
              <Icon icon='Search' size={16} />
              <span className={styles.searchItemText}>{el.name}</span>
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
            updateFormData('cragName', lastSelectedCragName)
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
