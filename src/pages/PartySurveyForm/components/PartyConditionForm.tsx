import styles from './PartyConditionForm.module.scss'
import { Condition, PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { RadioButtonGroup } from '../../../components/RadioButtonGroup.tsx'
import { AccordionContent, AccordionTrigger } from '../../../components/Accordion.tsx'
import * as Accordion from '@radix-ui/react-accordion'
import { useState } from 'react'

type PartyConditionFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

type Gender = '남녀 모두' | '남자만' | '여자만'
type Subject = '볼더링' | '리드' | '지구력' | '상관없음'

export function PartyConditionForm({ onNext, formData, updateFormData }: PartyConditionFormProps) {
  const genderList: Gender[] = ['남녀 모두', '남자만', '여자만']
  const subjectList: Subject[] = ['볼더링', '리드', '지구력', '상관없음']
  const [condition, setCondition] = useState<Condition>({
    members: formData.members,
    gender: formData.gender,
    subject: formData.subject,
    minSkillLevel: formData.minSkillLevel,
    maxSkillLevel: formData.maxSkillLevel,
  })

  const updateConditionData = (key: keyof Condition, value: Condition[keyof Condition]) => {
    setCondition((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>파티 조건을 선택해주세요.</h2>
        <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={['item-1']}>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>파티 인원 (본인 포함)</h3>
            <Accordion.Item className="AccordionItem" value={`members`}>
              <AccordionTrigger>{condition.members}</AccordionTrigger>
              <AccordionContent>
                <input
                  type="number"
                  min={2}
                  max={12}
                  value={condition.members}
                  onChange={(e) => {
                    updateConditionData('members', e.target.value)
                  }}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>성별</h3>
            <Accordion.Item className="AccordionItem" value={`gender`}>
              <AccordionTrigger>{condition.gender}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={genderList}
                  onValueChange={(value) => updateConditionData('gender', value)}
                  defaultValue={condition.gender}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>종목</h3>
            <Accordion.Item className="AccordionItem" value={`subject`}>
              <AccordionTrigger>{condition.subject}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={subjectList}
                  onValueChange={(value) => updateConditionData('subject', value)}
                  defaultValue={condition.subject}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>실력</h3>
            <Accordion.Item className="AccordionItem" value={`level`}>
              <AccordionTrigger>
                {condition.minSkillLevel}부터{condition.maxSkillLevel}
              </AccordionTrigger>
              <AccordionContent>
                <input
                  type="range"
                  step={1}
                  min={0}
                  max={5}
                  value={condition.minSkillLevel}
                  onChange={(e) => {
                    updateConditionData('minSkillLevel', e.target.value)
                  }}
                />
                <input
                  type="range"
                  step={1}
                  min={0}
                  max={5}
                  value={condition.maxSkillLevel}
                  onChange={(e) => {
                    updateConditionData('maxSkillLevel', e.target.value)
                  }}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
        </Accordion.Root>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          onClick={() => {
            updateFormData('members', condition.members)
            updateFormData('gender', condition.gender)
            updateFormData('subject', condition.subject)
            updateFormData('minSkillLevel', condition.minSkillLevel)
            updateFormData('maxSkillLevel', condition.maxSkillLevel)
            onNext()
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
