import { useFunnel } from '../../utils/useFunnel.tsx'
import { useState } from 'react'
import { useFlow, useStepFlow } from '../stackflow.ts'
import styles from './PartySurveyFormPage.module.scss'
import { PartyPlaceForm } from './components/PartyPlaceForm.tsx'
import { PartyConditionForm } from './components/PartyConditionForm.tsx'
import { PartyIntroduceForm } from './components/PartyIntroduceForm.tsx'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { PartyScheduleForm } from './components/PartyScheduleForm.tsx'

const steps = ['암장', '조건', '소개', '일정'] as const
type StepName = (typeof steps)[number]

export type PartySurveyFormData = {
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

export function PartySurveyFormPage() {
  const [formData, setFormData] = useState<PartySurveyFormData>({
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
  const { Funnel, Step, setStep, step } = useFunnel<StepName>('암장')
  const { stepPush } = useStepFlow('HomePage')
  const { pop } = useFlow()

  const updateFormData = (key: keyof PartySurveyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const getCurrentStepIndex = (steps: readonly StepName[], step: StepName) => {
    return steps.findIndex((el) => el === step)
  }

  const getPreviousStep = (steps: readonly StepName[], currentStepIndex: number) => {
    if (currentStepIndex <= 0) {
      return steps[0]
    }

    return steps[currentStepIndex - 1]
  }

  return (
    <AppScreen appBar={{ title: '' }}>
      <div className={styles.wrapper}>
        <div
          onClick={() => {
            const currentStepIndex = getCurrentStepIndex(steps, step)
            const previousStep = getPreviousStep(steps, currentStepIndex)
            setStep(previousStep)
          }}
        >
          이전으로
        </div>
        <Funnel>
          <Step name="암장">
            <PartyPlaceForm
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
              onNext={() => {
                setStep('일정')
                stepPush({
                  title: 'date',
                })
              }}
              formData={formData}
              updateFormData={updateFormData}
            />
          </Step>
          <Step name="일정">
            <PartyScheduleForm
              onNext={() => {
                pop()
              }}
              formData={formData}
              updateFormData={updateFormData}
            />
          </Step>
        </Funnel>
      </div>
    </AppScreen>
  )
}
