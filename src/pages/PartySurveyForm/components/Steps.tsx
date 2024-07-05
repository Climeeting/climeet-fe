import { useFunnel } from '../../../utils/useFunnel.tsx'
import { PartyPlaceForm } from './PartyPlaceForm.tsx'
import { PartyConditionForm } from './PartyConditionForm.tsx'
import { PartyIntroduceForm } from './PartyIntroduceForm.tsx'
import { PartyScheduleForm } from './PartyScheduleForm.tsx'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'
import {
  PostPartyNewReqAdapter,
  post_party_new,
  put_party_edit,
  PutPartyReqAdapter,
} from '@/services/party.ts'
import { useNavigate, useParams } from 'react-router-dom'
import ProgressBar from '@/components/ProgressBar.tsx'
import TopBar from '@/components/NavBar/TopBar.tsx'
import { PartyPreview } from '@/pages/PartySurveyForm/components/PartyPreview.tsx'

const indoorSteps = ['암장', '조건', '소개', '일정', '미리보기'] as const
type IndoorStepName = (typeof indoorSteps)[number]

const outdoorSteps = ['암장', '어프로치', '조건', '소개', '일정', '미리보기'] as const
type OutdoorStepName = (typeof outdoorSteps)[number]

type StepProps = {
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
  goToFirstStep?: () => void
}

export function IndoorStep({ formData, updateFormData, goToFirstStep }: StepProps) {
  const { Funnel, Step, setStep, step } = useFunnel<IndoorStepName>('암장')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const getCurrentStepIndex = (steps: readonly IndoorStepName[], step: IndoorStepName) => {
    return steps.findIndex((el) => el === step)
  }

  const getPreviousStep = (steps: readonly IndoorStepName[], currentStepIndex: number) => {
    if (currentStepIndex <= 0) {
      return steps[0]
    }

    return steps[currentStepIndex - 1]
  }

  return (
    <>
      <TopBar
        onClick={() => {
          const currentStepIndex = getCurrentStepIndex(indoorSteps, step)
          if (currentStepIndex === 0) return goToFirstStep?.()
          const previousStep = getPreviousStep(indoorSteps, currentStepIndex)
          setStep(previousStep)
        }}
      />
      <ProgressBar ratio={calcCurrentProgressValue(indoorSteps, step)} />
      <Funnel>
        <Step name="암장">
          <PartyPlaceForm
            onNext={() => {
              setStep('조건')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="조건">
          <PartyConditionForm
            onNext={() => {
              setStep('소개')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="소개">
          <PartyIntroduceForm
            onNext={() => {
              setStep('일정')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="일정">
          <PartyScheduleForm
            onNext={async () => {
              setStep('미리보기')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="미리보기">
          <PartyPreview
            onNext={async () => {
              try {
                const isPartyEdit = id !== undefined
                if (isPartyEdit) {
                  const req = new PutPartyReqAdapter(formData).adapt()
                  await put_party_edit(id, req)
                } else {
                  const req = new PostPartyNewReqAdapter(formData).adapt()
                  await post_party_new(req)
                }
                navigate('/')
              } catch (e) {
                console.log(e)
              }
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
      </Funnel>
    </>
  )
}

export function OutdoorStep({ formData, updateFormData, goToFirstStep }: StepProps) {
  const { Funnel, Step, setStep, step } = useFunnel<OutdoorStepName>('소개')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const getCurrentStepIndex = (steps: readonly OutdoorStepName[], step: OutdoorStepName) => {
    return steps.findIndex((el) => el === step)
  }

  const getPreviousStep = (steps: readonly OutdoorStepName[], currentStepIndex: number) => {
    if (currentStepIndex <= 0) {
      return steps[0]
    }

    return steps[currentStepIndex - 1]
  }

  return (
    <>
      <TopBar
        onClick={() => {
          const currentStepIndex = getCurrentStepIndex(indoorSteps, step)
          if (currentStepIndex === 0) return goToFirstStep?.()
          const previousStep = getPreviousStep(indoorSteps, currentStepIndex)
          setStep(previousStep)
        }}
      />
      <ProgressBar ratio={calcCurrentProgressValue(outdoorSteps, step)} />
      <Funnel>
        <Step name="소개">
          <PartyIntroduceForm
            onNext={() => {
              setStep('일정')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="일정">
          <PartyScheduleForm
            onNext={() => {
              setStep('미리보기')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name="미리보기">
          <PartyPreview
            onNext={async () => {
              try {
                const isPartyEdit = id !== undefined
                if (isPartyEdit) {
                  const req = new PutPartyReqAdapter(formData).adapt()
                  await put_party_edit(id, req)
                } else {
                  const req = new PostPartyNewReqAdapter(formData).adapt()
                  await post_party_new(req)
                }
                navigate('/')
              } catch (e) {
                console.log(e)
              }
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
      </Funnel>
    </>
  )
}

function calcCurrentProgressValue(steps: typeof indoorSteps, currentStep: IndoorStepName): number
function calcCurrentProgressValue(steps: typeof outdoorSteps, currentStep: OutdoorStepName): number

function calcCurrentProgressValue(steps: any, currentStep: any): number {
  const index = steps.findIndex((el: any) => el === currentStep)

  return Math.round(((index + 1) / steps.length) * 100)
}
