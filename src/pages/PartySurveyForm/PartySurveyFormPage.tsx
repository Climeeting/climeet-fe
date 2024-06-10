import { useState } from 'react'
import styles from './PartySurveyFormPage.module.scss'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { PartyTypeForm } from './components/PartyTypeForm.tsx'
import { IndoorStep, OutdoorStep } from './components/Steps.tsx'

export type UpdateFormData = (
  key: keyof PartySurveyFormData,
  value: PartySurveyFormData[keyof PartySurveyFormData]
) => void

export type PartySurveyFormData = {
  cragName: string
  members: number
  gender: string
  subject: string // @desc 종목
  partyName: string
  partyIntroduce: string
  partyDate: string
  partyTime: string
  minSkillLevel: number
  maxSkillLevel: number
  isNatural: boolean
}
export type Condition = Pick<
  PartySurveyFormData,
  'members' | 'gender' | 'subject' | 'minSkillLevel' | 'maxSkillLevel'
>
export type Schedule = Pick<PartySurveyFormData, 'partyDate' | 'partyTime'>

export function PartySurveyFormPage() {
  const [formData, setFormData] = useState<PartySurveyFormData>({
    cragName: '',
    members: 2,
    gender: '남녀 모두',
    subject: '볼더링',
    partyName: '',
    partyIntroduce: '',
    partyDate: new Date().toISOString().substring(0, 10),
    partyTime: '18:00',
    minSkillLevel: 0,
    maxSkillLevel: 0,
    isNatural: false,
  })
  const [isFirstStep, setIsFirstStep] = useState(true)

  const updateFormData: UpdateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AppScreen appBar={{ title: '' }}>
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
          <OutdoorStep formData={formData} updateFormData={updateFormData} />
        ) : (
          <IndoorStep formData={formData} updateFormData={updateFormData} />
        )}
      </div>
    </AppScreen>
  )
}
