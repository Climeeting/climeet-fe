import styles from './PartyConditionForm.module.scss'
import { Condition, PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { RadioButtonGroup } from '../../../components/RadioButtonGroup.tsx'
import { AccordionContent, AccordionTrigger } from '../../../components/Accordion.tsx'
import * as Accordion from '@radix-ui/react-accordion'
import { useState } from 'react'
import { Slider } from '@/components/Slider.tsx'
import classNames from 'classnames'

type PartyConditionFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyConditionForm({ onNext, formData, updateFormData }: PartyConditionFormProps) {
  const genderList: GenderKo[] = ['남녀 모두', '남자만', '여자만']
  const subjectList: ClimbingTypeKo[] = ['볼더링', '리드', '지구력', '상관없음']
  const [condition, setCondition] = useState<Condition>({
    maximumParticipationNumber: formData.maximumParticipationNumber,
    gender: formData.gender,
    climbingType: formData.climbingType,
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
              <AccordionTrigger>{condition.maximumParticipationNumber}</AccordionTrigger>
              <AccordionContent>
                <input
                  type="number"
                  min={2}
                  max={12}
                  value={condition.maximumParticipationNumber}
                  onChange={(e) => {
                    updateConditionData('maximumParticipationNumber', Number(e.target.value))
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
                  onValueChange={(value) => updateConditionData('gender', value as GenderKo)}
                  defaultValue={condition.gender}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>종목</h3>
            <Accordion.Item className="AccordionItem" value={`subject`}>
              <AccordionTrigger>{condition.climbingType}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={subjectList}
                  onValueChange={(value) =>
                    updateConditionData('climbingType', value as ClimbingTypeKo)
                  }
                  defaultValue={condition.climbingType}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>실력</h3>
            <Accordion.Item className="AccordionItem" value={`level`}>
              <AccordionTrigger>
                V{condition.minSkillLevel}부터 V{condition.maxSkillLevel} 까지
              </AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[condition.minSkillLevel, condition.maxSkillLevel]}
                  value={[condition.minSkillLevel, condition.maxSkillLevel]}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    updateConditionData('minSkillLevel', value[0])
                    updateConditionData('maxSkillLevel', value[1])
                  }}
                />
                <div className={styles.xAxis}>
                  <span>Vb</span>
                  <span>V9-V10</span>
                </div>
                <div
                  className={styles.checkboxWrapper}
                  onClick={() => {
                    updateConditionData('minSkillLevel', 0)
                    updateConditionData('maxSkillLevel', 10)
                  }}
                >
                  <div
                    className={classNames(styles.checkbox, {
                      [styles.checked]:
                        condition.minSkillLevel === 0 && condition.maxSkillLevel === 10,
                    })}
                  ></div>
                  <span className={styles.checkboxLabel}>상관없음</span>
                </div>
              </AccordionContent>
            </Accordion.Item>
          </div>
        </Accordion.Root>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          onClick={() => {
            updateFormData('maximumParticipationNumber', condition.maximumParticipationNumber)
            updateFormData('gender', condition.gender)
            updateFormData('climbingType', condition.climbingType)
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

export const Gender = {
  BOTH: '남녀 모두',
  MALE_ONLY: '남자만',
  FEMALE_ONLY: '여자만',
} as const
export type GenderEn = keyof typeof Gender
export type GenderKo = (typeof Gender)[GenderEn]

const ClimbingType = {
  BOULDERING: '볼더링',
  LEAD: '리드',
  ENDURANCE: '지구력',
  ANY: '상관없음',
} as const
export type ClimbingTypeEn = keyof typeof ClimbingType
export type ClimbingTypeKo = (typeof ClimbingType)[ClimbingTypeEn]
