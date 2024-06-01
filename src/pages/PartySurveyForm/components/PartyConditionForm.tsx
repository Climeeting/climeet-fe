import styles from './PartyConditionForm.module.scss'
import { PartySurveyFormData } from '../PartySurveyFormPage.tsx'
import { RadioButtonGroup } from '../../../components/RadioButtonGroup.tsx'

type PartyConditionFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: (key: keyof PartySurveyFormData, value: string) => void
}

type Gender = '남녀 모두' | '남자만' | '여자만'
type Subject = '볼더링' | '리드' | '지구력' | '상관없음'

export function PartyConditionForm({ onNext, formData, updateFormData }: PartyConditionFormProps) {
  const genderList: Gender[] = ['남녀 모두', '남자만', '여자만']
  const subjectList: Subject[] = ['볼더링', '리드', '지구력', '상관없음']

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>파티 조건을 선택해주세요.</h2>
        <div>
          <h3>파티 인원 (본인 포함)</h3>
          <input className={styles.input} placeholder={'0명'} />
        </div>
        <div>
          <h3>성별</h3>
          <div className={styles.trigger}>
            <div className={styles.triggerText}>{formData.gender}</div>
          </div>
          <div className={styles.content}>
            <RadioButtonGroup
              list={genderList}
              onValueChange={(value) => updateFormData('gender', value)}
              defaultValue={formData.gender}
            />
          </div>
        </div>
        <div>
          <h3>종목</h3>
          <div className={styles.trigger}>
            <div className={styles.triggerText}>{formData.subject}</div>
          </div>
          <div className={styles.content}>
            <RadioButtonGroup
              list={subjectList}
              onValueChange={(value) => updateFormData('subject', value)}
              defaultValue={formData.subject}
            />
          </div>
        </div>
        <div>
          <h3>실력</h3>
          <input className={styles.input} placeholder={'상관없음'} />
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
