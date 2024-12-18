import { useRef } from 'react'
import styles from './PartySurveyFormPage.module.scss'
import { IndoorStep } from './components/Steps.tsx'
import { ClimbingTypeKo, GenderKo } from '@/pages/PartySurveyForm/components/PartyConditionForm.tsx'
import dayjs from 'dayjs'
import { FileProvider } from '@/pages/PartySurveyForm/hooks/useFileContext.tsx'

export function PartySurveyFormPage () {
  const { formData, updateFormData } = usePartySurveyForm()

  return (
    <>
      <div className={styles.wrapper}>
        <FileProvider>
          <IndoorStep formData={formData} updateFormData={updateFormData} />
        </FileProvider>
      </div>
    </>
  )
}

export type PartySurveyFormData = {
  cragName: string
  locationId: number
  maximumParticipationNumber: number
  gender: GenderKo
  climbingType: ClimbingTypeKo
  partyName: string
  partyDescription: string
  partyDate: dayjs.Dayjs
  partyTime: string
  minSkillLevel: number
  maxSkillLevel: number
  isNatural: boolean
  approachDescription: string
  partyImageUrl: string
}
export type Condition = Pick<
  PartySurveyFormData,
  'maximumParticipationNumber' | 'gender' | 'climbingType' | 'minSkillLevel' | 'maxSkillLevel'
>

export type Schedule = Pick<PartySurveyFormData, 'partyDate' | 'partyTime'>

export type UpdateFormData = <K extends keyof PartySurveyFormData>(
  key: K,
  value: PartySurveyFormData[K]
) => void

export const usePartySurveyForm = () => {
  const formData = useRef<PartySurveyFormData>({
    cragName: '',
    locationId: -1,
    maximumParticipationNumber: 3,
    gender: '남녀 모두',
    climbingType: '볼더링',
    partyName: '',
    partyDescription: '',
    partyDate: dayjs().add(3, 'day'),
    partyTime: '18:00',
    minSkillLevel: 0,
    maxSkillLevel: 8,
    isNatural: false,
    approachDescription: '',
    partyImageUrl: '',
  })

  const updateFormData: UpdateFormData = (key, value) => {
    formData.current[key] = value
  }

  const setFormData = (data: PartySurveyFormData) => {
    formData.current = data
  }

  return {
    formData: formData.current,
    updateFormData,
    setFormData,
  }
}
