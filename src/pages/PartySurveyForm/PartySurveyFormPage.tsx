import { useFunnel } from '../../utils/useFunnel.tsx'
import { useState } from 'react'
import { useStepFlow } from '../stackflow.ts'
import styles from './PartySurveyFormPage.module.scss'
import { CragForm } from './components/CragForm.tsx'
import { PartyConditionForm } from './components/PartyConditionForm.tsx'
import { PartyIntroduceForm } from './components/PartyIntroduceForm.tsx'

const steps = ['암장', '조건', '소개', '일정'] as const
type StepName = (typeof steps)[number]

export type SurveyPartyFormData = {
  cragName: string
  members: number
  gender: string
  subject: string // @desc 종목
  level: string
  image: string
  partyName: string
  partyIntroduce: string
  partyDate: string
  partyTime: string
}

export function SurveyPartyFormPage() {
  const [formData, setFormData] = useState<SurveyPartyFormData>({
    cragName: '',
    members: 0,
    gender: '남녀 모두',
    subject: '볼더링',
    level: '상관없음',
    image: '',
    partyName: '',
    partyIntroduce: '',
    partyDate: '',
    partyTime: '',
  })
  const { Funnel, Step, setStep } = useFunnel<StepName>('암장')
  const { stepPush } = useStepFlow('HomePage')

  const updateFormData = (key: keyof SurveyPartyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={styles.wrapper}>
      <Funnel>
        <Step name="암장">
          <CragForm
            onNext={() => {
              setStep('조건')
              stepPush({
                title: 'condition',
              })
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="조건">
          <PartyConditionForm
            onNext={() => {
              setStep('소개')
              stepPush({
                title: 'introduce',
              })
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="소개">
          <PartyIntroduceForm
            onNext={() => setStep('일정')}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
      </Funnel>
    </div>
  )
}
