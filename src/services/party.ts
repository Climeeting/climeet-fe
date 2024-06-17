import { PageData, Party } from '@/pages/types/api'
import api from '../utils/api'
import { stringify } from '@/utils/query'
import { useQuery } from '@tanstack/react-query'

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
  return useQuery({
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