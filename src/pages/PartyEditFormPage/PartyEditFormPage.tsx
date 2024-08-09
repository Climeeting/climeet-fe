import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAsync } from 'react-use'
import { get_party_$partyId_detail, SurveyFormAdapter } from '@/services/party.ts'
import { IndoorStep, PartyEditStep } from '@/pages/PartySurveyForm/components/Steps.tsx'
import styles from '@/pages/PartySurveyForm/PartySurveyFormPage.module.scss'
import { usePartySurveyForm } from '@/pages/PartySurveyForm/PartySurveyFormPage.tsx'

export function PartyEditFormPage() {
  const { formData, updateFormData, setFormData } = usePartySurveyForm()
  const [isExistParticipant, setIsExistParticipant] = useState(false)
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
      if (partyDetail.currentParticipants > 1) {
        setIsExistParticipant(true)
      }
      const nextSurveyFormData = new SurveyFormAdapter(partyDetail).adapt()
      setFormData(nextSurveyFormData)
    } catch (e) {
      console.log(e)
    }
  }, [id])

  if (isExistParticipant) {
    return <PartyEditStep updateFormData={updateFormData} formData={formData} id={id!} />
  }

  return (
    <>
      <div className={styles.wrapper}>
        <IndoorStep formData={formData} updateFormData={updateFormData} />
      </div>
    </>
  )
}
