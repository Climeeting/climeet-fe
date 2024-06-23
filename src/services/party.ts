import { PageData, Party, PartyDetail } from '@/pages/types/api'
import api from '../utils/api'
import { stringify } from '@/utils/query'
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { queryClient } from '@/utils/tanstack'
import { ClimbingTypeEn, GenderEn } from '@/pages/PartySurveyForm/components/PartyConditionForm.tsx'
import dayjs from 'dayjs'

/**
 * GET /v1/party/list?${queryString}
 */
export type GetPartyListParams = {
  page?: number
  size?: number
  sortColumn?: 'CREATED_AT'
  sortOrder?: 'DESC' | 'ASC'
  isNatural?: boolean
  climbingType?: 'BOULDERING' | 'LEAD' | 'ENDURANCE' | 'ANY'
  constraints?: 'BOTH' | 'MALE_ONLY' | 'FEMALE_ONLY'
  appointmentDate?: string
  address1List?: string[]
  locationId?: number
}

export const get_party_list = async (params?: GetPartyListParams) => {
  const queryString = params ? `?${stringify(params)}` : ''

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
  return useSuspenseInfiniteQuery({
    queryKey: [PARTY_LIST_KEY, params && stringify(params)],
    queryFn: ({ pageParam }) => get_party_list({ ...params, page: pageParam ?? 0 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.totalPages <= lastPage.pageable.pageNumber ? null : lastPage.pageable.pageNumber + 1,
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

export class PartyItem {
  private value: Party

  constructor(value: Party) {
    this.value = value
  }

  get appointmentTime() {
    return dayjs(this.value.appointmentTime).format('A h:mm')
  }

  get constraints() {
    switch (this.value.constraints) {
      case 'BOTH':
        return '남녀 모두'
      case 'MALE_ONLY':
        return '남자'
      case 'FEMALE_ONLY':
        return '여자'
      default:
        return '남녀 모두'
    }
  }

  get climbingType() {
    switch (this.value.climbingType) {
      case 'BOULDERING':
        return '볼더링'
      case 'LEAD':
        return '리드'
      case 'ENDURANCE':
        return '지구력'
      case 'ANY':
        return '상관없음'
      default:
        return '상관없음'
    }
  }

  adapt() {
    return {
      ...this.value,
      constraints: this.constraints,
      climbingType: this.climbingType,
      appointmentTime: this.appointmentTime,
    }
  }
}

/**
 * POST /v1/party/new
 */
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

/**
 * GET /v1/party/${partyId}/detail
 */
export const get_party_$partyId_detail = async (partyId: number) => {
  try {
    const result = await api.get<PartyDetail>(`/v1/party/${partyId}/detail`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('파티 상세 조회에 실패하였습니다. get v1/party/${partyId}/detail')
  }
}

export const PARTY_DETAIL_KEY = ['party', 'detail']

export const usePartyDetail = (partyId: number) => {
  return useSuspenseQuery({
    queryKey: [...PARTY_DETAIL_KEY, partyId],
    queryFn: () => get_party_$partyId_detail(partyId),
    retryOnMount: false,
    refetchOnWindowFocus: false,
    select: (data) => new PartyDetailAdapter(data).adapt(),
  })
}

export type PartyDetailType = ReturnType<PartyDetailAdapter['adapt']>

export class PartyDetailAdapter {
  private value: PartyDetail

  constructor(value: PartyDetail) {
    this.value = value
  }

  get appointmentTime() {
    return dayjs(this.value.appointmentTime).format('M월 DD일 (dd) A h:mm')
  }

  get climbingType() {
    switch (this.value.climbingType) {
      case 'BOULDERING':
        return '볼더링'
      case 'LEAD':
        return '리드'
      case 'ENDURANCE':
        return '지구력'
      case 'ANY':
        return '상관없음'
      default:
        return '상관없음'
    }
  }

  get constraints() {
    switch (this.value.constraints) {
      case 'BOTH':
        return '남녀 모두'
      case 'MALE_ONLY':
        return '남자'
      case 'FEMALE_ONLY':
        return '여자'
      default:
        return '남녀 모두'
    }
  }

  adapt() {
    return {
      ...this.value,
      appointmentTime: this.appointmentTime,
      climbingType: this.climbingType,
      constraints: this.climbingType,
    }
  }
}
