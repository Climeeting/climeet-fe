import { useRef, useState } from 'react'
import styles from './PartySurveyFormPage.module.scss'
import { PartyTypeForm } from './components/PartyTypeForm.tsx'
import { IndoorStep } from './components/Steps.tsx'
import { ClimbingTypeKo, GenderKo } from '@/pages/PartySurveyForm/components/PartyConditionForm.tsx'
import { useParams } from 'react-router-dom'
import { get_party_$partyId_detail, SurveyFormAdapter } from '@/services/party.ts'
import { useAsync } from 'react-use'
import dayjs from 'dayjs'

export function PartySurveyFormPage() {
  const { formData, updateFormData, setFormData } = usePartySurveyForm()
  const [isFirstStep, setIsFirstStep] = useState(true)
  const { id } = useParams<{ id: string }>()

  useAsync(async () => {
    // @todo 현재 로그인한 사용자가 쓴 글인지 확인하는 로직 필요
    const isPartyEdit = id !== undefined
    if (!isPartyEdit) return
    try {
      const partyDetail = await get_party_$partyId_detail(Number(id))
      if (!partyDetail) {
        throw new Error('파티 상세 정보가 존재하지 않습니다.')
      }
      const nextSurveyFormData = new SurveyFormAdapter(partyDetail).adapt()
      setFormData(nextSurveyFormData)
    } catch (e) {
      console.log(e)
    }
  }, [id])

  return (
    <>
      <div className={styles.wrapper}>
        {isFirstStep ? (
          <PartyTypeForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => {
              setIsFirstStep(false)
            }}
          />
        ) : formData.isNatural ? (
          <IndoorStep
            goToFirstStep={() => {
              setIsFirstStep(true)
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        ) : (
          <IndoorStep
            goToFirstStep={() => {
              setIsFirstStep(true)
            }}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
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

const usePartySurveyForm = () => {
  const formData = useRef<PartySurveyFormData>({
    cragName: '',
    locationId: 0,
    maximumParticipationNumber: 3,
    gender: '남녀 모두',
    climbingType: '볼더링',
    partyName: '',
    partyDescription: '',
    partyDate: dayjs(),
    partyTime: '18:00',
    minSkillLevel: 0,
    maxSkillLevel: 5,
    isNatural: false,
    approachDescription: '',
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
