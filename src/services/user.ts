import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { MyProfile } from '../pages/types/api'
import { isAxiosError } from 'axios'
import { queryClient } from '../utils/tanstack'

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
      console.log({ error })
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}

export const useIsLogin = () => {
  const { data, isError } = useMyProfile()
  return !!data && !isError
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
