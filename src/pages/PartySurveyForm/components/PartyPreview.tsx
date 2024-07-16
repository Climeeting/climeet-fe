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

type PartyIntroduceFormProps = {
  onNext: () => void
  formData: PartySurveyFormData
  updateFormData: UpdateFormData
}

export function PartyPreview({ onNext, formData }: PartyIntroduceFormProps) {
  const { data, isError } = useMyProfile()

  if (!data || isError) return null

  const partyDetailData: PartyDetailType = {
    partyName: formData.partyName,
    appointmentTime: appointmentTimeToFormatTime(
      appointmentTime(formData.partyDate, formData.partyTime)
    ),
    climbingType: formData.climbingType,
    // @ts-expect-error TODO: 고쳐야함
    constraints: formData.gender,
    maxParticipants: formData.maximumParticipationNumber,
    currentParticipants: 1,
    gymName: formData.cragName,
    partyDescription: formData.partyDescription,
    masterName: data.nickname,
    skillDistributions: [],
    approachDescription: formData.approachDescription,
    locationId: formData.locationId,
    minimumSkillLevel: formData.minSkillLevel,
    maximumSkillLevel: formData.maxSkillLevel,
    isNatural: formData.isNatural,
    masterProfileImageUrl: data.profileImageUrl,
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
