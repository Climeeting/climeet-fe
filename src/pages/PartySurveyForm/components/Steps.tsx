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
import styles from './Steps.module.scss'
import useToast from '@/utils/useToast.tsx'
import { uploadFileS3 } from '@/utils/s3.ts'
import { useFileContext } from '@/pages/PartySurveyForm/hooks/useFileContext.tsx'
import Dialog from '@/components/Dialog/Dialog.tsx'
import { useState } from 'react'

const indoorSteps = ['암장', '조건', '소개', '일정', '미리보기'] as const
type IndoorStepName = (typeof indoorSteps)[number]

const outdoorSteps = ['암장', '어프로치', '조건', '소개', '일정', '미리보기'] as const
type OutdoorStepName = (typeof outdoorSteps)[number]

const editSteps = ['소개', '미리보기'] as const
type EditStepName = (typeof editSteps)[number]

type StepProps = {
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function IndoorStep ({ formData, updateFormData }: StepProps) {
  const [openAlertGoHome, setOpenAlertGoHome] = useState(false)
  const { Funnel, Step, setStep, step } = useFunnel<IndoorStepName>('암장')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()
  const file = useFileContext()

  const getCurrentStepIndex = (steps: readonly IndoorStepName[], step: IndoorStepName) => {
    return steps.findIndex(el => el === step)
  }

  const getPreviousStep = (steps: readonly IndoorStepName[], currentStepIndex: number) => {
    if (currentStepIndex <= 0) {
      return steps[0]
    }

    return steps[currentStepIndex - 1]
  }

  return (
    <>
      <TopBar>
        <TopBar.Left
          back
          onClick={() => {
            const currentStepIndex = getCurrentStepIndex(indoorSteps, step)
            if (currentStepIndex === 0) return navigate(-1)
            const previousStep = getPreviousStep(indoorSteps, currentStepIndex)
            setStep(previousStep)
          }}
        />
        <TopBar.Right
          close
          onClick={() => {
            setOpenAlertGoHome(true)
          }}
        />
      </TopBar>
      <div className={styles.ProgressBarContainer}>
        <ProgressBar ratio={calcCurrentProgressValue(indoorSteps, step)} />
      </div>
      <Funnel>
        <Step name='암장'>
          <PartyPlaceForm
            onNext={() => {
              setStep('조건')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='조건'>
          <PartyConditionForm
            onNext={() => {
              setStep('소개')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='소개'>
          <PartyIntroduceForm
            onNext={() => {
              setStep('일정')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='일정'>
          <PartyScheduleForm
            onNext={async () => {
              setStep('미리보기')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='미리보기'>
          <PartyPreview
            onNext={async () => {
              try {
                const isPartyEdit = id !== undefined
                if (isPartyEdit) {
                  const req = new PutPartyReqAdapter(formData).adapt()
                  await put_party_edit(id, req)
                  toast.add({
                    message: '파티 수정이 완료되었습니다.',
                  })
                } else {
                  const req = new PostPartyNewReqAdapter(formData).adapt()
                  const newPartyInfo = {
                    ...req,
                    partyImageUrl: file ? await uploadFileS3(file) : formData.partyImageUrl,
                  }
                  await post_party_new(newPartyInfo)
                  toast.add({
                    message: '파티가 생성되었습니다.',
                  })
                }
                navigate('/')
              } catch (e) {
                if (e instanceof Error) {
                  console.log({ e })
                  toast.add({
                    message: e.message,
                  })
                }
              }
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
      </Funnel>

      <Dialog open={openAlertGoHome} onOpenChange={setOpenAlertGoHome}>
        <Dialog.Content
          hasCancel
          onAction={() => {
            navigate('/')
            setOpenAlertGoHome(false)
          }}
          onClose={() => {
            setOpenAlertGoHome(false)
          }}
        >
          파티 생성을 종료하시겠습니까?
          <br />
          작성중인 내용은 저장되지 않습니다.
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export function OutdoorStep ({ formData, updateFormData }: StepProps) {
  const [openAlertGoHome, setOpenAlertGoHome] = useState(false)
  const { Funnel, Step, setStep, step } = useFunnel<OutdoorStepName>('소개')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const getCurrentStepIndex = (steps: readonly OutdoorStepName[], step: OutdoorStepName) => {
    return steps.findIndex(el => el === step)
  }
  const toast = useToast()

  const getPreviousStep = (steps: readonly OutdoorStepName[], currentStepIndex: number) => {
    if (currentStepIndex <= 0) {
      return steps[0]
    }

    return steps[currentStepIndex - 1]
  }

  return (
    <>
      <TopBar>
        <TopBar.Left
          back
          onClick={() => {
            const currentStepIndex = getCurrentStepIndex(indoorSteps, step)
            if (currentStepIndex === 0) return navigate(-1)
            const previousStep = getPreviousStep(indoorSteps, currentStepIndex)
            setStep(previousStep)
          }}
        />
        <TopBar.Right
          close
          onClick={() => {
            setOpenAlertGoHome(true)
          }}
        />
      </TopBar>
      <ProgressBar ratio={calcCurrentProgressValue(outdoorSteps, step)} />
      <Funnel>
        <Step name='소개'>
          <PartyIntroduceForm
            onNext={() => {
              setStep('일정')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='일정'>
          <PartyScheduleForm
            onNext={() => {
              setStep('미리보기')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='미리보기'>
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
                if (e instanceof Error) {
                  console.log({ e })
                  toast.add({
                    message: e.message,
                  })
                }
              }
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
      </Funnel>

      <Dialog open={openAlertGoHome} onOpenChange={setOpenAlertGoHome}>
        <Dialog.Content
          hasCancel
          onAction={() => {
            navigate('/')
            setOpenAlertGoHome(false)
          }}
          onClose={() => {
            setOpenAlertGoHome(false)
          }}
        >
          파티 생성을 종료하시겠습니까?
          <br />
          작성중인 내용은 저장되지 않습니다.
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export function PartyEditStep ({
  formData,
  updateFormData,
  id,
}: {
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
  id: string
}) {
  const [openAlertGoHome, setOpenAlertGoHome] = useState(false)
  const { Funnel, Step, setStep, step } = useFunnel<EditStepName>('소개')
  const navigate = useNavigate()
  const toast = useToast()

  const getCurrentStepIndex = (steps: readonly EditStepName[], step: EditStepName) => {
    return steps.findIndex(el => el === step)
  }

  const getPreviousStep = (steps: readonly EditStepName[], currentStepIndex: number) => {
    if (currentStepIndex <= 0) {
      return steps[0]
    }

    return steps[currentStepIndex - 1]
  }

  return (
    <div className={styles.Wrapper}>
      <TopBar>
        <TopBar.Left
          back
          onClick={() => {
            const currentStepIndex = getCurrentStepIndex(editSteps, step)
            if (currentStepIndex === 0) return navigate(-1)
            const previousStep = getPreviousStep(editSteps, currentStepIndex)
            setStep(previousStep)
          }}
        />
        <TopBar.Right
          close
          onClick={() => {
            setOpenAlertGoHome(true)
          }}
        />
      </TopBar>
      <div className={styles.ProgressBarContainer}>
        <ProgressBar ratio={calcCurrentProgressValue(editSteps, step)} />
      </div>
      <Funnel>
        <Step name='소개'>
          <PartyIntroduceForm
            onNext={() => {
              setStep('미리보기')
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
        <Step name='미리보기'>
          <PartyPreview
            onNext={async () => {
              try {
                const req = new PutPartyReqAdapter(formData).adapt()
                await put_party_edit(id, req)
                navigate('/')
              } catch (e) {
                if (e instanceof Error) {
                  console.log({ e })
                  toast.add({
                    message: e.message,
                  })
                }
              }
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Step>
      </Funnel>

      <Dialog open={openAlertGoHome} onOpenChange={setOpenAlertGoHome}>
        <Dialog.Content
          hasCancel
          onAction={() => {
            navigate('/')
            setOpenAlertGoHome(false)
          }}
          onClose={() => {
            setOpenAlertGoHome(false)
          }}
        >
          파티 생성을 종료하시겠습니까?
          <br />
          작성중인 내용은 저장되지 않습니다.
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

function calcCurrentProgressValue (steps: typeof indoorSteps, currentStep: IndoorStepName): number
function calcCurrentProgressValue (steps: typeof outdoorSteps, currentStep: OutdoorStepName): number
function calcCurrentProgressValue (steps: typeof editSteps, currentStep: EditStepName): number

function calcCurrentProgressValue (steps: any, currentStep: any): number {
  const index = steps.findIndex((el: any) => el === currentStep)

  return Math.round(((index + 1) / steps.length) * 100)
}
