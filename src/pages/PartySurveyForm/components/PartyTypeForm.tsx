import styles from './PartyTypeForm.module.scss'
import classNames from 'classnames'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import Icon from '@/components/Icon/Icon.tsx'

type PartyTypeFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyTypeForm({ onNext, formData, updateFormData }: PartyTypeFormProps) {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          원하시는 파티를
          <br />
          선택해 주세요.
        </h2>
        <div>
          <div
            className={classNames(styles.radioItem, {
              [styles.selected]: !formData.isNatural,
            })}
            onClick={() => updateFormData('isNatural', false)}
          >
            <div className={styles.radioItemLeft}>
              <span className={styles.partyType}>암장</span>
              <span className={styles.desc}>볼더링, 리드, 지구력을 함께 즐겨요!</span>
            </div>
            <div className={styles.radioItemRight}>
              {formData.isNatural ? (
                <Icon icon={'RadioEmpty'} size={20} />
              ) : (
                <Icon icon={'RadioChecked'} size={20} />
              )}
            </div>
          </div>
          <div
            className={classNames(styles.radioItem, {
              [styles.selected]: formData.isNatural,
            })}
            onClick={() => updateFormData('isNatural', true)}
          >
            <div className={styles.radioItemLeft}>
              <span className={styles.partyType}>자연</span>
              <span className={styles.desc}>자연 암장에서 함께 즐겨요!</span>
            </div>
            <div className={styles.radioItemRight}>
              {formData.isNatural ? (
                <Icon icon={'RadioChecked'} size={20} />
              ) : (
                <Icon icon={'RadioEmpty'} size={20} />
              )}
            </div>
          </div>
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
