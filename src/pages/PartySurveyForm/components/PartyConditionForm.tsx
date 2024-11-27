import styles from './PartyConditionForm.module.scss'
import { Condition, PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import { RadioButtonGroup } from '../../../components/RadioButtonGroup.tsx'
import { AccordionContent, AccordionTrigger } from '../../../components/Accordion.tsx'
import * as Accordion from '@radix-ui/react-accordion'
import { useState } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import ScrollPicker, { getScrollOption } from '@/components/ScrollPicker.tsx'
import { SkillRange } from '@/pages/Home/components/SkillRange.tsx'

const MEMBERS = Array.from({ length: 11 }, (_, i) => i + 2).map(getScrollOption)

type PartyConditionFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyConditionForm ({ onNext, formData, updateFormData }: PartyConditionFormProps) {
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
    setCondition(prev => ({ ...prev, [key]: value }))
  }

  const isAllSkillLevel = condition.minSkillLevel === 0 && condition.maxSkillLevel === 8

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>파티 조건을 선택해주세요.</h2>
        <Accordion.Root className='AccordionRoot' type='multiple' defaultValue={['item-1']}>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>파티 인원 (본인 포함)</h3>
            <Accordion.Item className={styles.AccordionItem} value='members'>
              <AccordionTrigger>{condition.maximumParticipationNumber}</AccordionTrigger>
              <AccordionContent>
                <div className={styles.ScrollPickerWrapper}>
                  <ScrollPicker
                    defaultValue={{
                      value: condition.maximumParticipationNumber,
                      label: String(condition.maximumParticipationNumber),
                    }}
                    list={MEMBERS}
                    onSelectedChange={(option) => {
                      if (!option) return
                      updateConditionData('maximumParticipationNumber', Number(option.value))
                    }}
                  />
                </div>
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>성별</h3>
            <Accordion.Item className={styles.AccordionItem} value='gender'>
              <AccordionTrigger>{condition.gender}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={genderList}
                  onValueChange={value => updateConditionData('gender', value as GenderKo)}
                  defaultValue={condition.gender}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>종목</h3>
            <Accordion.Item className={styles.AccordionItem} value='subject'>
              <AccordionTrigger>{condition.climbingType}</AccordionTrigger>
              <AccordionContent>
                <RadioButtonGroup
                  list={subjectList}
                  onValueChange={value =>
                    updateConditionData('climbingType', value as ClimbingTypeKo)}
                  defaultValue={condition.climbingType}
                />
              </AccordionContent>
            </Accordion.Item>
          </div>
          <div className={styles.question}>
            <h3 className={styles.questionTitle}>실력</h3>
            <Accordion.Item className={styles.AccordionItem} value='level'>
              <AccordionTrigger>
                {isAllSkillLevel
                  ? '상관없음'
                  : `V${condition.minSkillLevel}부터 V${condition.maxSkillLevel} 까지`}
              </AccordionTrigger>
              <AccordionContent>
                <SkillRange
                  defaultValue={[condition.minSkillLevel, condition.maxSkillLevel]}
                  value={[condition.minSkillLevel, condition.maxSkillLevel]}
                  min={0}
                  max={8}
                  step={1}
                  onValueChange={(value) => {
                    updateConditionData('minSkillLevel', value[0])
                    updateConditionData('maxSkillLevel', value[1])
                  }}
                />
                <div
                  className={styles.checkboxWrapper}
                  onClick={() => {
                    updateConditionData('minSkillLevel', 0)
                    updateConditionData('maxSkillLevel', 8)
                  }}
                >
                  {isAllSkillLevel
                    ? (
                        <Icon icon='CheckboxChecked' size={16} />
                      )
                    : (
                        <Icon icon='CheckboxEmpty' size={16} />
                      )}
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ClimbingType = {
  BOULDERING: '볼더링',
  LEAD: '리드',
  ENDURANCE: '지구력',
  ANY: '상관없음',
} as const
export type ClimbingTypeEn = keyof typeof ClimbingType
export type ClimbingTypeKo = (typeof ClimbingType)[ClimbingTypeEn]
