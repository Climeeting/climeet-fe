import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { MyProfile, PageData, SkillLevel } from '../pages/types/api'
import { AxiosError } from 'axios'
import { queryClient } from '../utils/tanstack'
import { sexBe2Fe, sexFe2Be } from './adaptor'
import { stringify } from '@/utils/query'

export const USER_KEY = ['my']

export const MyProfileQuery = {
  invalidate: async () =>
    await queryClient.invalidateQueries({
      queryKey: USER_KEY,
      refetchType: 'all',
    }),

  refetch: async () =>
    await queryClient.refetchQueries({
      queryKey: USER_KEY,
    }),

  logout: () => {
    queryClient.setQueryData(USER_KEY, null) // 로그아웃 시 쿼리 데이터를 null로 설정
  },
}

/**
 * GET /v1/user/myProfile
 */
export const get_user_myProfile = async () => {
  return await api.get<MyProfile>('/v1/user/myProfile')
}

export const useMyProfile = () => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: get_user_myProfile,
    // 1시간마다 새로고침
    refetchInterval: 60 * 60 * 1000,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}

export const useMyProfileSuspense = () => {
  return useSuspenseQuery({
    queryKey: USER_KEY,
    queryFn: get_user_myProfile,
    // 1시간마다 새로고침
    refetchInterval: 60 * 60 * 1000,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}

export const useIsLogin = () => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: get_user_myProfile,
    select: data => !!data,
    // 1시간마다 새로고침
    refetchInterval: 60 * 60 * 1000,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}

/**
 * POST /v1/user/additional-info
 */
export const post_user_additionalInfo = async (params: PostAdditonalInfoParams) => {
  try {
    const result = await api.post<PostAdditonalInfoParams>('/v1/user/additional-info', params)
    return result
  } catch (e) {
    if (e instanceof AxiosError && e.response?.data.detail) {
      throw new Error(e.response.data.detail)
    } else {
      throw new Error('추가정보 작성에 실패하였습니다')
    }
  }
}

export type PostAdditonalInfoParams = {
  sex: 'MALE' | 'FEMALE'
  skillLevel: SkillLevel
  description?: string
}

export type MyInfo = {
  sex: '남자' | '여자'
  skillLevel: SkillLevel
  description?: string
}

export const skillLevelOptions: MyInfo['skillLevel'][] = [
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8+',
]

export class AdditionalInfoAddapter {
  private value: MyInfo

  constructor (value: MyInfo) {
    this.value = value
  }

  get sex (): PostAdditonalInfoParams['sex'] {
    return sexFe2Be(this.value.sex)
  }

  get skillLevel (): PostAdditonalInfoParams['skillLevel'] {
    return this.value.skillLevel
  }

  adapt () {
    return {
      ...this.value,
      sex: this.sex,
      skillLevel: this.skillLevel,
    }
  }
}

/**
 * PUT /v1/user/information
 */
export const put_user_information = async (body: Partial<PutUserInformationBody>) => {
  try {
    const result = await api.put<PutUserInformationBody>('/v1/user/information', body)
    return result
  } catch (e) {
    if (e instanceof AxiosError && e.response?.data.detail) {
      throw new Error(e.response.data.detail)
    } else {
      throw new Error('수정에 실패하였습니다')
    }
  }
}

type PutUserInformationBody = {
  userName: string
  profileImageUrl: string
  skillLevel?: SkillLevel
  description?: string
  sex?: 'MALE' | 'FEMALE'
}

export class PutUserInfomationAdapter {
  private value: MyProfileInfo

  constructor (value: MyProfileInfo) {
    this.value = value
  }

  get userName () {
    return this.value.nickname
  }

  get sex (): PutUserInformationBody['sex'] {
    return sexFe2Be(this.value.sex)
  }

  get skillLevel () {
    return this.value.skillLevel
  }

  adapt (): PutUserInformationBody {
    return {
      userName: this.userName,
      profileImageUrl: this.value.profileImageUrl,
      description: this.value.description,
      skillLevel: this.skillLevel,
      // sex: this.sex,
    }
  }
}

export type MyProfileInfo = {
  nickname: string
  profileImageUrl: string
  skillLevel?: SkillLevel
  sex: '남자' | '여자'
  description: string
}

export class MyProfileBe2FeAdpter {
  private value: MyProfile

  constructor (value: MyProfile) {
    this.value = value
  }

  get sex () {
    if (!this.value.sex) return this.value.sex
    return sexBe2Fe(this.value.sex)
  }

  get skillLevel (): MyProfileInfo['skillLevel'] {
    return this.value.skillLevel as MyProfileInfo['skillLevel']
  }

  adapt () {
    return {
      ...this.value,
      sex: this.sex,
      skillLevel: this.skillLevel,
    }
  }
}

/*
 * GET /v1/user/check-additional-info
 */
export const get_user_checkAdditionalInfo = async () => {
  return await api.get<{ isTrue: boolean }>('/v1/user/check-additional-info')
}

export const useCheckAdditionalInfo = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['checkAdditionalInfo'],
    queryFn: get_user_checkAdditionalInfo,
    enabled,
  })
}

/*
 * GET /v1/user/profile/{userId}
 */
export const get_user_profile_$userId = async (userId: number) => {
  return await api.get<MyProfile>(`/v1/user/profile/${userId}`)
}

export const useUserProfile = (userId: number, enabled?: boolean) => {
  return useQuery({
    queryKey: [...USER_KEY, userId],
    queryFn: () => get_user_profile_$userId(userId),
    enabled,
  })
}

export const useUserProfileSuspense = (userId: number) => {
  return useSuspenseQuery({
    queryKey: [...USER_KEY, userId],
    queryFn: () => get_user_profile_$userId(userId),
  })
}

/*
 * GET /v1/user/{userId}/party
 */
export const get_user_$userId_party = async ({ userId, ...params }: GetPartyListParams) => {
  const queryString = stringify(params)

  return await api.get<PageData<PartyListDto>>(`/v1/user/${userId}/party?${queryString}`)
}

type GetPartyListParams = {
  userId: number
  page?: number
  startDate?: string
  endDate?: string
}

export const USER_PARTY_LIST_KEY = ['user', 'party', 'list']

export const useUserPartyList = (params: GetPartyListParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: [...USER_PARTY_LIST_KEY, stringify(params)],
    queryFn: ({ pageParam }) => get_user_$userId_party({ ...params, page: pageParam ?? 0 }),
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

export const UserPartyListQuery = {
  invalidate: async (params: GetPartyListParams) =>
    await queryClient.invalidateQueries({
      queryKey: [...USER_PARTY_LIST_KEY, stringify(params)],
      refetchType: 'all',
    }),

  refetch: async (params: GetPartyListParams) =>
    await queryClient.refetchQueries({
      queryKey: [...USER_PARTY_LIST_KEY, stringify(params)],
    }),
}

export type PartyListDto = {
  id: number
  constraints: 'BOTH' | 'MALE_ONLY' | 'FEMALE_ONLY'
  minSkillLevel: number
  maxSkillLevel: number
  locationId: number
  participationDeadline: string
  description: string
  userLimitCount: number
  currentTotalMemberCount: number
  approacheDescription: string
  isNatural: boolean
  appointmentTime: string
  climbingType: 'BOULDERING' | 'LEAD' | 'ENDURANCE' | 'ANY'
  masterId: number
  partyTitle: string
  gymName: string
  joinStatus: 'AVAILABLE' | 'IMMINENT_FULL' | 'FULL'
  partyImageUrl: string
}

/**
 * GET /v1/user/chat-rooms
 */
export const get_user_chatRooms = async (params: GetUserChatRoomsParams) => {
  const queryString = stringify(params)

  return await api.get<PageData<ChatRoomDto>>(`/v1/user/chat-rooms?${queryString}`)
}

export type ChatRoomDto = {
  roomId: number
  lastMessage: string
  lastMessageTime: string
  memberCount: number
  hasUnreadMessages: boolean
  chatThumbnail: string
  roomTitle: string
}

type GetUserChatRoomsParams = {
  page?: number
  size?: number
}

export const USER_CHAT_ROOS_KEY = ['chat', 'rooms']

export const useUserChatRooms = () => {
  return useSuspenseInfiniteQuery({
    queryKey: USER_CHAT_ROOS_KEY,
    queryFn: ({ pageParam }) => get_user_chatRooms({ page: pageParam ?? 0 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return null
      return lastPage.totalPages <= lastPage.pageable.pageNumber ? null : lastPage.pageable.pageNumber + 1
    },
    refetchInterval: 30 * 1000, // 30초마다 새로고침
    // refetchOnMount: 'always',
    // refetchOnWindowFocus: 'always',
  })
}

export const UserChatRoomsQuery = {
  invalidate: async () =>
    await queryClient.invalidateQueries({
      queryKey: USER_CHAT_ROOS_KEY,
      refetchType: 'all',
    }),

  refetch: async () =>
    await queryClient.refetchQueries({
      queryKey: USER_CHAT_ROOS_KEY,
    }),

  reset: async () =>
    await queryClient.resetQueries({
      queryKey: USER_CHAT_ROOS_KEY,
    }),
}
