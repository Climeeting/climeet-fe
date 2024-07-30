import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { MyProfile, SkillLevel } from '../pages/types/api'
import { isAxiosError } from 'axios'
import { queryClient } from '../utils/tanstack'
import { sexBe2Fe, sexFe2Be } from './adaptor'

/**
 * GET /v1/user/myProfile
 */
export const get_user_myProfile = async () => {
  return await api.get<MyProfile>('/v1/user/myProfile')
}

export const USER_KEY = ['user']

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

    // 인증 만료시 재시도하지 않음
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}

export const useIsLogin = () => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: get_user_myProfile,
    select: (data) => !!data,
    // 1시간마다 새로고침
    refetchInterval: 60 * 60 * 1000,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,

    // 인증 만료시 재시도하지 않음
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}

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
}

/**
 * POST /v1/user/additional-info
 */
export const post_user_additionalInfo = async (params: PostAdditonalInfoParams) => {
  return await api.post<PostAdditonalInfoParams>('/v1/user/additional-info', params)
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
  'V8',
  'V9',
  'V10',
]

export class AdditionalInfoAddapter {
  private value: MyInfo

  constructor(value: MyInfo) {
    this.value = value
  }

  get sex(): PostAdditonalInfoParams['sex'] {
    return sexFe2Be(this.value.sex)
  }

  get skillLevel(): PostAdditonalInfoParams['skillLevel'] {
    return this.value.skillLevel
  }

  adapt() {
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
export const put_user_information = async (body: PutUserInformationBody) => {
  return await api.put<PutUserInformationBody>('/v1/user/information', body)
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

  constructor(value: MyProfileInfo) {
    this.value = value
  }

  get userName() {
    return this.value.nickname
  }

  get sex(): PutUserInformationBody['sex'] {
    return sexFe2Be(this.value.sex)
  }

  get skillLevel() {
    return this.value.skillLevel
  }

  adapt(): PutUserInformationBody {
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

  constructor(value: MyProfile) {
    this.value = value
  }

  get sex() {
    if (!this.value.sex) return this.value.sex
    return sexBe2Fe(this.value.sex)
  }

  get skillLevel(): MyProfileInfo['skillLevel'] {
    return this.value.skillLevel as MyProfileInfo['skillLevel']
  }

  adapt() {
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

export const useCheckAdditionalInfo = () => {
  return useQuery({
    queryKey: ['checkAdditionalInfo'],
    queryFn: get_user_checkAdditionalInfo,
  })
}
