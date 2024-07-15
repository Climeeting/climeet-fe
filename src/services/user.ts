import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { MyProfile, Skill } from '../pages/types/api'
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
  skill: Skill
  description?: string
}

export type MyInfo = {
  sex: '남자' | '여자'
  skill: Skill
  description?: string
}

export const skillOptions: MyInfo['skill'][] = [
  'BLUE',
  'RED',
  'WHITE',
  'YELLOW',
  'ORANGE',
  'GREEN',
  'PURPLE',
  'GREY',
  'BROWN',
  'BLACK',
]

export class AdditionalInfoAddapter {
  private value: MyInfo

  constructor(value: MyInfo) {
    this.value = value
  }

  get sex(): PostAdditonalInfoParams['sex'] {
    return sexFe2Be(this.value.sex)
  }

  get skill(): PostAdditonalInfoParams['skill'] {
    return this.value.skill
  }

  adapt() {
    return {
      ...this.value,
      sex: this.sex,
      skill: this.skill,
    }
  }
}

export type MyProfileInfo = {
  nickname: string
  profileImageUrl: string
  skillLevel: Skill
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
