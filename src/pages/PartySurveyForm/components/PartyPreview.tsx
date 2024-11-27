import {
  PartySurveyFormData,
  UpdateFormData,
} from '@/pages/PartySurveyForm/PartySurveyFormPage.tsx'
import { useMyProfile } from '@/services/user.ts'
import { PartyDetailType } from '@/services/party.ts'
import { Suspense } from 'react'
import PartyDetail from '@/pages/PartyDetailPage/components/PartyDetail.tsx'
import styles from './PartyPreview.module.scss'
import dayjs from 'dayjs'
import { SkillDistribution } from '@/pages/types/api.ts'

type PartyIntroduceFormProps = {
  onNext: () => void
  enableNext: boolean
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyPreview ({ onNext, formData, enableNext }: PartyIntroduceFormProps) {
  const { data, isError } = useMyProfile()

  if (!data || isError) return null

  const partyDetailData: PartyDetailType = {
    partyName: formData.partyName,
    appointmentTime: appointmentTimeToFormatTime(
      appointmentTime(formData.partyDate.format('YYYY-MM-DD'), formData.partyTime),
    ),
    climbingType: formData.climbingType,
    // @ts-expect-error TODO: 고쳐야함
    constraints: formData.gender,
    maxParticipants: formData.maximumParticipationNumber,
    currentParticipants: 1,
    gymName: formData.cragName,
    partyDescription: formData.partyDescription,
    masterName: data.nickname,
    skillDistributions: createSkillDistributions(data.skillLevel),
    approachDescription: formData.approachDescription,
    locationId: formData.locationId,
    minimumSkillLevel: formData.minSkillLevel,
    maximumSkillLevel: formData.maxSkillLevel,
    isNatural: formData.isNatural,
    masterProfileImageUrl: data.profileImageUrl,
    partyImageUrl: formData.partyImageUrl,
  }

  return (
    <div className={styles.container}>
      <div className={styles.Container}>
        <Suspense fallback={<PartyDetail.Skeleton />}>
          <PartyDetail data={partyDetailData} />
        </Suspense>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          disabled={!enableNext}
          data-disabled={!enableNext}
          onClick={() => {
            onNext()
          }}
        >
          파티 생성하기
        </button>
      </div>
    </div>
  )
}

const appointmentTime = (partyDate: string, partyTime: string) => {
  const date = partyDate
  const time = partyTime
  const dummyTime = ':00'

  return `${date}T${time}${dummyTime}`
}

const appointmentTimeToFormatTime = (appointmentTime: string) => {
  return dayjs(appointmentTime).format('M월 DD일 (dd) A h:mm')
}

const createSkillDistributions = (skillLevel: string = 'V0') => {
  const newSkillDistributions: SkillDistribution[] = [
    {
      skillLevel: 'V0',
      count: 0,
    },
    {
      skillLevel: 'V1',
      count: 0,
    },
    {
      skillLevel: 'V2',
      count: 0,
    },
    {
      skillLevel: 'V3',
      count: 0,
    },
    {
      skillLevel: 'V4',
      count: 0,
    },
    {
      skillLevel: 'V5',
      count: 0,
    },
    {
      skillLevel: 'V6',
      count: 0,
    },
    {
      skillLevel: 'V7',
      count: 0,
    },
    {
      skillLevel: 'V8',
      count: 0,
    },
  ]
  const index = newSkillDistributions.findIndex(skill => skill.skillLevel === skillLevel)
  newSkillDistributions[index].count = 1

  return newSkillDistributions
}
