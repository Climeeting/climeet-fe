import { PageData, Party } from '@/pages/types/api'
import api from '../utils/api'
import { stringify } from '@/utils/query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { queryClient } from '@/utils/tanstack'
import { ClimbingTypeEn, GenderEn } from '@/pages/PartySurveyForm/components/PartyConditionForm.tsx'

type GetPartyListParams = {
  page?: number
  size?: number
  sortColumn?: "CREATED_AT"
  sortOrder?: "DESC" | "ASC"
  isNatural?: boolean
  climbingType?: "BOULDERING" | "LEAD" | "ENDURANCE" | "ANY"
  constraints?: "BOTH" | "MALE_ONLY" | "FEMALE_ONLY"
  appointmentDate?: string
  address1List?: string[]
}

export const get_party_list = async (params?: GetPartyListParams) => {
  const queryString = params ? `?${stringify(params)}` : ""

  try {
    const result = await api.get<PageData<Party>>(`/v1/party/list?${queryString}`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('로그인이 실패하였습니다. post v1/oauth/login')
  }
}

export const PARTY_LIST_KEY = ['party', 'list']

export const usePartyList = (params?: GetPartyListParams) => {
  return useSuspenseQuery({
    queryKey: PARTY_LIST_KEY,
    queryFn: () => get_party_list(params),
    // 1시간마다 새로고침
    refetchInterval: 60 * 60 * 1000,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}

export const PartyListQuery = {
  invalidate: async () =>
    await queryClient.invalidateQueries({
      queryKey: PARTY_LIST_KEY,
      refetchType: 'all',
    }),

  refetch: async () =>
    await queryClient.refetchQueries({
      queryKey: PARTY_LIST_KEY,
    }),
}

export type PostPartyNewReq = {
  constraints: GenderEn
  climbingType: ClimbingTypeEn
  maximumParticipationNumber: number
  partyTitle: string
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
  try {
    const result = await api.post<PostPartyNewRes>('/v1/party/new', reqBody)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('파티 생성에 실패하였습니다. post v1/party/new')
  }
}
