import { useState } from 'react'
import styles from './PartySurveyFormPage.module.scss'
import { PartyTypeForm } from './components/PartyTypeForm.tsx'
import { IndoorStep } from './components/Steps.tsx'
import TopBar from '@/components/NavBar/TopBar.tsx'
import { ClimbingTypeKo, GenderKo } from '@/pages/PartySurveyForm/components/PartyConditionForm.tsx'

export type UpdateFormData = (
  key: keyof PartySurveyFormData,
  value: PartySurveyFormData[keyof PartySurveyFormData]
) => void

export type PartySurveyFormData = {
  cragName: string
  locationId: number
  maximumParticipationNumber: number
  gender: GenderKo
  climbingType: ClimbingTypeKo
  partyName: string
  partyDescription: string
  partyDate: string
  partyTime: string
  minSkillLevel: number
  maxSkillLevel: number
  isNatural: boolean
  approachDescription: string
}
export type Condition = Pick<
  PartySurveyFormData,
  'maximumParticipationNumber' | 'gender' | 'climbingType' | 'minSkillLevel' | 'maxSkillLevel'
>
export type Schedule = Pick<PartySurveyFormData, 'partyDate' | 'partyTime'>

export function PartySurveyFormPage() {
  const [formData, setFormData] = useState<PartySurveyFormData>({
    cragName: '',
    locationId: 0,
    maximumParticipationNumber: 3,
    gender: '남녀 모두',
    climbingType: '볼더링',
    partyName: '',
    partyDescription: '',
    partyDate: new Date().toISOString().substring(0, 10),
    partyTime: '18:00',
    minSkillLevel: 0,
    maxSkillLevel: 5,
    isNatural: false,
    approachDescription: '',
  })
  const [isFirstStep, setIsFirstStep] = useState(true)

  const updateFormData: UpdateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <TopBar />
      <div className={styles.wrapper}>
        <div className={styles.progressBar}>
          <div className={styles.indicator}></div>
        </div>
        {isFirstStep ? (
          <PartyTypeForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => {
              setIsFirstStep(false)
            }}
          />
        ) : formData.isNatural ? (
          <IndoorStep formData={formData} updateFormData={updateFormData} />
        ) : (
          <IndoorStep formData={formData} updateFormData={updateFormData} />
        )}
      </div>
    </>
  )
}
