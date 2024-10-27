import { PageData, Party, PartyDetail, SkillLevel } from '@/pages/types/api'
import api from '../utils/api'
import { stringify } from '@/utils/query'
import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { queryClient } from '@/utils/tanstack'
import {
  ClimbingTypeEn,
  ClimbingTypeKo,
  GenderEn,
  GenderKo,
} from '@/pages/PartySurveyForm/components/PartyConditionForm.tsx'
import dayjs from 'dayjs'
import { JoinStatusBe2Fe, clibingBe2Fe, constraintsBe2Fe } from './adaptor'
import { PartySurveyFormData } from '@/pages/PartySurveyForm/PartySurveyFormPage.tsx'
import { AxiosError } from 'axios'

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
  joinStatus?: 'AVAILABLE' | 'IMMINENT_FULL' | 'FULL' | null
  skillLevel?: SkillLevel
  appointmentDate?: string
  address1List?: string[]
  locationIds?: string
}

export const get_party_list = async (params?: GetPartyListParams) => {
  const queryString = params ? `${stringify(params)}` : ''

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
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return null
      return lastPage.totalPages <= lastPage.pageable.pageNumber ? null : lastPage.pageable.pageNumber + 1
    },
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}

export const PartyListQuery = {
  invalidate: async (params?: GetPartyListParams) =>
    await queryClient.invalidateQueries({
      queryKey: [PARTY_LIST_KEY, params && stringify(params)],
      refetchType: 'all',
    }),

  refetch: async (params?: GetPartyListParams) =>
    await queryClient.refetchQueries({
      queryKey: [PARTY_LIST_KEY, params && stringify(params)],
    }),
}

export class PartyItem {
  private value: Party

  constructor (value: Party) {
    this.value = value
  }

  get appointmentTime () {
    return dayjs(this.value.appointmentTime).format('A h:mm')
  }

  get constraints () {
    return constraintsBe2Fe(this.value.constraints)
  }

  get climbingType () {
    return clibingBe2Fe(this.value.climbingType)
  }

  get joinStatus () {
    return JoinStatusBe2Fe(this.value.joinStatus)
  }

  get levelRange () {
    return `V${this.value.minSkillLevel}부터 V${this.value.maxSkillLevel}까지`
  }

  adapt () {
    return {
      ...this.value,
      constraints: this.constraints,
      climbingType: this.climbingType,
      appointmentTime: this.appointmentTime,
      joinStatus: this.joinStatus,
      levelRange: this.levelRange,
    }
  }
}

// TODO: PartyDetail 과 통합 필요
export type GetPartyDetailRes = {
  partyName: string
  appointmentTime: string
  climbingType: ClimbingTypeEn
  constraints: GenderEn
  maxParticipants: number
  currentParticipants: number
  gymName: string
  partyDescription: string
  masterName: string
  skillDistributions: { skillLevel: string, count: number }[]
  approachDescription: string
  locationId: number
  minimumSkillLevel: number
  maximumSkillLevel: number
  isNatural: boolean
  partyImageUrl: string
}

export class SurveyFormAdapter {
  constructor (private value: GetPartyDetailRes) {}

  get cragName () {
    return this.value.gymName
  }

  get locationId () {
    return this.value.locationId
  }

  get maximumParticipationNumber () {
    return this.value.maxParticipants
  }

  get gender (): GenderKo {
    switch (this.value.constraints) {
      case 'MALE_ONLY':
        return '남자만'
      case 'FEMALE_ONLY':
        return '여자만'
      case 'BOTH':
        return '남녀 모두'
      default:
        return '남녀 모두'
    }
  }

  get climbingType (): ClimbingTypeKo {
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

  get partyName () {
    return this.value.partyName
  }

  get partyDescription () {
    return this.value.partyDescription
  }

  get partyDate () {
    return dayjs(this.value.appointmentTime)
  }

  get partyTime () {
    /**
     * @desc "2024-06-17T18:00:00.000Z" -> "18:00"
     */
    return this.value.appointmentTime.substring(11, 16)
  }

  get minSkillLevel () {
    return this.value.minimumSkillLevel
  }

  get maxSkillLevel () {
    return this.value.maximumSkillLevel
  }

  get isNatural () {
    return this.value.isNatural
  }

  get approachDescription () {
    return this.value.approachDescription
  }

  get partyImageUrl () {
    return this.value.partyImageUrl
  }

  adapt (): PartySurveyFormData {
    return {
      cragName: this.cragName,
      locationId: this.locationId,
      maximumParticipationNumber: this.maximumParticipationNumber,
      gender: this.gender,
      climbingType: this.climbingType,
      partyName: this.partyName,
      partyDescription: this.partyDescription,
      partyDate: this.partyDate,
      partyTime: this.partyTime,
      minSkillLevel: this.minSkillLevel,
      maxSkillLevel: this.maxSkillLevel,
      isNatural: this.isNatural,
      approachDescription: this.approachDescription,
      partyImageUrl: this.partyImageUrl,
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
  partyImageUrl: string
}

export type PostPartyNewRes = {
  partyId: number
}

export const post_party_new = async (reqBody: PostPartyNewReq) => {
  try {
    const result = await api.post<PostPartyNewRes>('/v1/party/new', reqBody)
    return result
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail)
    } else {
      throw new Error('파티 생성에 실패하였습니다. post v1/party/new')
    }
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

export const usePartyDetail = (partyId?: number) => {
  return useQuery({
    queryKey: [...PARTY_DETAIL_KEY, partyId],
    queryFn: () => get_party_$partyId_detail(partyId!),
    retryOnMount: false,
    refetchOnWindowFocus: false,
    select: data => new PartyDetailAdapter(data).adapt(),
    enabled: !!partyId,
  })
}

export const PartyDetailQuery = {
  invalidate: async (partyId: number) =>
    await queryClient.invalidateQueries({
      queryKey: [...PARTY_DETAIL_KEY, partyId],
      refetchType: 'all',
    }),

  refetch: async (partyId: number) =>
    await queryClient.refetchQueries({
      queryKey: [...PARTY_DETAIL_KEY, partyId],
    }),
}

export const usePartyDetailSuspense = (partyId: number) => {
  return useSuspenseQuery({
    queryKey: [...PARTY_DETAIL_KEY, partyId],
    queryFn: () => get_party_$partyId_detail(partyId),
    retryOnMount: false,
    refetchOnWindowFocus: false,
    select: data => new PartyDetailAdapter(data).adapt(),
  })
}

export type PartyDetailType = ReturnType<PartyDetailAdapter['adapt']>

export class PartyDetailAdapter {
  private value: PartyDetail & { location?: string }

  constructor (value: PartyDetail) {
    this.value = value
  }

  get location () {
    return this.value.location
  }

  get appointmentTime () {
    return dayjs(this.value.appointmentTime).format('M월 DD일 (dd) A h:mm')
  }

  get climbingType () {
    return clibingBe2Fe(this.value.climbingType)
  }

  get constraints () {
    return constraintsBe2Fe(this.value.constraints)
  }

  adapt () {
    return {
      ...this.value,
      appointmentTime: this.appointmentTime,
      climbingType: this.climbingType,
      constraints: this.constraints,
      location: this.value.location,
    }
  }
}
export class PostPartyNewReqAdapter {
  private value: PartySurveyFormData

  constructor (value: PartySurveyFormData) {
    this.value = value
  }

  get constraints (): GenderEn {
    switch (this.value.gender) {
      case '남녀 모두':
        return 'BOTH'
      case '남자만':
        return 'MALE_ONLY'
      case '여자만':
        return 'FEMALE_ONLY'
      default:
        return 'BOTH'
    }
  }

  get climbingType (): ClimbingTypeEn {
    switch (this.value.climbingType) {
      case '볼더링':
        return 'BOULDERING'
      case '리드':
        return 'LEAD'
      case '지구력':
        return 'ENDURANCE'
      case '상관없음':
        return 'ANY'
      default:
        return 'ANY'
    }
  }

  get maximumParticipationNumber (): number {
    return this.value.maximumParticipationNumber
  }

  get partyTitle (): string {
    return this.value.partyName
  }

  get isNatural (): boolean {
    return this.value.isNatural
  }

  get minSkillLevel (): number {
    return this.value.minSkillLevel
  }

  get maxSkillLevel (): number {
    return this.value.maxSkillLevel
  }

  get locationId (): number {
    return this.value.locationId
  }

  // @todo 임시로 설정
  get participationDeadline (): string {
    return this.appointmentTime
  }

  get approachDescription (): string {
    return this.value.approachDescription
  }

  get partyDescription (): string {
    return this.value.partyDescription
  }

  get appointmentTime (): string {
    const date = dayjs(this.value.partyDate).format('YYYY-MM-DD')
    const time = this.value.partyTime
    // @desc ss, ms는 입력받을 수 없으니 임의로 설정
    const dummyTime = ':00.000Z'

    return `${date}T${time}${dummyTime}`
  }

  get partyImageUrl (): string {
    return this.value.partyImageUrl
  }

  adapt (): PostPartyNewReq {
    return {
      constraints: this.constraints,
      climbingType: this.climbingType,
      maximumParticipationNumber: this.maximumParticipationNumber,
      partyTitle: this.partyTitle,
      isNatural: this.isNatural,
      minSkillLevel: this.minSkillLevel,
      maxSkillLevel: this.maxSkillLevel,
      locationId: this.locationId,
      participationDeadline: this.participationDeadline,
      approacheDescription: this.approachDescription,
      partyDescription: this.partyDescription,
      appointmentTime: this.appointmentTime,
      partyImageUrl: this.partyImageUrl,
    }
  }
}

/** *********** PUT Party New **************/
export type PutPartyEditReq = {
  constraints: GenderEn
  minSkillLevel: number
  maxSkillLevel: number
  locationId: number
  participationDeadline: string
  userLimitCount: number
  approacheDescription: string
  isNatural: boolean
  description: string
  appointmentTime: string
  climbingType: ClimbingTypeEn
  partyTitle: string
}

export const put_party_edit = async (partyId: number | string, reqBody: PutPartyEditReq) => {
  try {
    const result = await api.put<PostPartyNewRes>(`/v1/party/${partyId}`, reqBody)
    return result
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail)
    } else {
      throw new Error('파티 수정에 실패하였습니다. put v1/party/${partyId}`')
    }
  }
}

export class PutPartyReqAdapter {
  private value: PartySurveyFormData

  constructor (value: PartySurveyFormData) {
    this.value = value
  }

  get constraints (): GenderEn {
    switch (this.value.gender) {
      case '남녀 모두':
        return 'BOTH'
      case '남자만':
        return 'MALE_ONLY'
      case '여자만':
        return 'FEMALE_ONLY'
      default:
        return 'BOTH'
    }
  }

  get climbingType (): ClimbingTypeEn {
    switch (this.value.climbingType) {
      case '볼더링':
        return 'BOULDERING'
      case '리드':
        return 'LEAD'
      case '지구력':
        return 'ENDURANCE'
      case '상관없음':
        return 'ANY'
      default:
        return 'ANY'
    }
  }

  get maximumParticipationNumber (): number {
    return this.value.maximumParticipationNumber
  }

  get partyTitle (): string {
    return this.value.partyName
  }

  get isNatural (): boolean {
    return this.value.isNatural
  }

  get minSkillLevel (): number {
    return this.value.minSkillLevel
  }

  get maxSkillLevel (): number {
    return this.value.maxSkillLevel
  }

  get locationId (): number {
    return this.value.locationId
  }

  get participationDeadline (): string {
    return this.appointmentTime
  }

  get approachDescription (): string {
    return this.value.approachDescription
  }

  get partyDescription (): string {
    return this.value.partyDescription
  }

  get appointmentTime (): string {
    const date = dayjs(this.value.partyDate).format('YYYY-MM-DD')
    const time = this.value.partyTime
    const dummyTime = ':00.000Z'

    return `${date}T${time}${dummyTime}`
  }

  adapt (): PutPartyEditReq {
    return {
      constraints: this.constraints,
      climbingType: this.climbingType,
      userLimitCount: this.maximumParticipationNumber,
      partyTitle: this.partyTitle,
      isNatural: this.isNatural,
      minSkillLevel: this.minSkillLevel,
      maxSkillLevel: this.maxSkillLevel,
      locationId: this.locationId,
      participationDeadline: this.participationDeadline,
      approacheDescription: this.approachDescription,
      description: this.partyDescription,
      appointmentTime: this.appointmentTime,
    }
  }
}

/**
 * POST /v1/party/{partyId}/participate
 */
export const post_party_$partyId_participate = async (partyId: number) => {
  try {
    const result = await api.post(`/v1/party/${partyId}/participate`)
    return result
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail)
    } else {
      throw new Error('파티 참가에 실패하였습니다')
    }
  }
}

/**
 * DELETE /v1/party/{partyId}
 */
export const delete_party_$partyId = async (partyId: number) => {
  try {
    const result = await api.delete(`/v1/party/${partyId}`)
    return result
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail)
    } else {
      throw new Error('파티 삭제에 실패하였습니다')
    }
  }
}

/**
 * DELETE /v1/party/{partyId}/leave
 */
export const delete_party_$partyId_leave = async (partyId: number) => {
  try {
    const result = await api.delete(`/v1/party/${partyId}/leave`)
    return result
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail)
    } else {
      throw new Error('파티 탈퇴에 실패하였습니다')
    }
  }
}

/**
 * POST /v1/report/{partyId}
 */
export const post_party_report = async (partyId: number, reqBody: { reason: string }) => {
  try {
    const result = await api.post(`/v1/report/${partyId}`, reqBody)
    return result
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail)
    } else {
      throw new Error('파티 신고에 실패하였습니다')
    }
  }
}
