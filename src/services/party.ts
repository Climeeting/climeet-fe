import api from '@/utils/api.ts'

export type PostPartyNewReq = {
  constraints: 'BOTH' | 'MALE_ONLY' | 'FEMALE_ONLY'
  climbingType: 'BOULDERING' | 'LEAD' | 'ENDURANCE' | 'ANY'
  maximumParticipationNumber: number
  isNatural: boolean
  minSkillLevel: number
  maxSkillLevel: number
  locationId: number
  participationDeadline: string
  approacheDescription: string
  partyDescription: string
  appointmentTime: string
}

export type PostPartyNewRes = {
  partyId: number
}

export const post_party_new = async (reqBody: PostPartyNewReq) => {
  return await api.post<PostPartyNewRes>('/v1/party/new', reqBody)
}
