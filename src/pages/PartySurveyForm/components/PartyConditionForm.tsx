import styles from './PartyConditionForm.module.scss'
import { PartySurveyFormData } from '../PartySurveyFormPage.tsx'
import { RadioButtonGroup } from '../../../components/RadioButtonGroup.tsx'
import { AccordionContent, AccordionTrigger } from '../../../components/Accordion.tsx'
import * as Accordion from '@radix-ui/react-accordion'

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
        <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={['item-1']}>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>파티 인원 (본인 포함)</h3>
            <input className={styles.input} placeholder={'0명'} />
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>성별</h3>
            <Accordion.Item className="AccordionItem" value={`gender`}>
              <AccordionTrigger>{formData.gender}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={genderList}
                  onValueChange={(value) => updateFormData('gender', value)}
                  defaultValue={formData.gender}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>종목</h3>
            <Accordion.Item className="AccordionItem" value={`subject`}>
              <AccordionTrigger>{formData.subject}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={subjectList}
                  onValueChange={(value) => updateFormData('subject', value)}
                  defaultValue={formData.subject}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>실력</h3>
            <input className={styles.input} placeholder={'상관없음'} />
          </div>
        </Accordion.Root>
      </div>
      <div className={styles.footer}>
        <button className={styles.nextBtn} onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  )
}
