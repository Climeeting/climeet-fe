import { useFunnel } from '../../../utils/useFunnel.tsx'
import { useFlow, useStepFlow } from '../../stackflow.ts'
import { PartyPlaceForm } from './PartyPlaceForm.tsx'
import { ClimbingTypeEn, GenderEn, PartyConditionForm } from './PartyConditionForm.tsx'
import { PartyIntroduceForm } from './PartyIntroduceForm.tsx'
import { PartyScheduleForm } from './PartyScheduleForm.tsx'
import { PartySurveyFormData, UpdateFormData } from '../PartySurveyFormPage.tsx'

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
  const { pop } = useFlow()

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

class PartyNewAdapter {
  private value: PartySurveyFormData

  constructor(value: PartySurveyFormData) {
    this.value = value
  }

  get constraints(): GenderEn {
    switch (this.value.gender) {
      case '남녀 모두':
        return 'BOTH'
      case '남자만':
        return 'MALE_ONLY'
      case '여자만':
        return 'FEMALE_ONLY'
      default:
        return 'BOTH'
    }
  }

  get climbingType(): ClimbingTypeEn {
    switch (this.value.climbingType) {
      case '볼더링':
        return 'BOULDERING'
      case '리드':
        return 'LEAD'
      case '지구력':
        return 'ENDURANCE'
      case '상관없음':
        return 'ANY'
      default:
        return 'ANY'
    }
  }

  get maximumParticipationNumber(): number {
    return this.value.maximumParticipationNumber
  }

  get partyTitle(): string {
    return this.value.partyName
  }

  get isNatural(): boolean {
    return this.value.isNatural
  }

  get minSkillLevel(): number {
    return this.value.minSkillLevel
  }

  get maxSkillLevel(): number {
    return this.value.maxSkillLevel
  }

  get locationId(): number {
    return this.value.locationId
  }

  // @todo 임시로 설정
  get participationDeadline(): string {
    return this.appointmentTime
  }

  get approachDescription(): string {
    return this.value.approachDescription
  }

  get partyDescription(): string {
    return this.value.partyDescription
  }

  get appointmentTime(): string {
    const date = this.value.partyDate
    const time = this.value.partyTime
    // @desc ss, ms는 입력받을 수 없으니 임의로 설정
    const dummyTime = ':00.000Z'

    return `${date}T${time}${dummyTime}`
  }

  adapt(): PostPartyNewReq {
    return {
      constraints: this.constraints,
      climbingType: this.climbingType,
      maximumParticipationNumber: this.maximumParticipationNumber,
      partyTitle: this.partyTitle,
      isNatural: this.isNatural,
      minSkillLevel: this.minSkillLevel,
      maxSkillLevel: this.maxSkillLevel,
      locationId: this.locationId,
      participationDeadline: this.participationDeadline,
      approacheDescription: this.approachDescription,
      partyDescription: this.partyDescription,
      appointmentTime: this.appointmentTime,
    }
  }
}
