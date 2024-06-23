import { useFunnel } from '../../../utils/useFunnel.tsx'
import { useFlow, useStepFlow } from '../../stackflow.ts'
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

const indoorSteps = ['암장', '조건', '소개', '일정'] as const
type IndoorStepName = (typeof indoorSteps)[number]

const outdoorSteps = ['암장', '어프로치', '조건', '소개', '일정'] as const
type OutdoorStepName = (typeof outdoorSteps)[number]

type StepProps = {
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function IndoorStep({ formData, updateFormData }: StepProps) {
  const { Funnel, Step, setStep, step } = useFunnel<IndoorStepName>('암장')
  const { stepPush } = useStepFlow('HomePage')
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
      <div
        onClick={() => {
          const currentStepIndex = getCurrentStepIndex(indoorSteps, step)
          const previousStep = getPreviousStep(indoorSteps, currentStepIndex)
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

export function OutdoorStep({ formData, updateFormData }: StepProps) {
  const { Funnel, Step, setStep, step } = useFunnel<OutdoorStepName>('소개')
  const { stepPush } = useStepFlow('HomePage')
  const { pop } = useFlow()
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
      <div
        onClick={() => {
          const currentStepIndex = getCurrentStepIndex(indoorSteps, step)
          const previousStep = getPreviousStep(indoorSteps, currentStepIndex)
          setStep(previousStep)
        }}
      >
        이전으로
      </div>
      <Funnel>
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
    </>
  )
}
