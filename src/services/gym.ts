import { useSuspenseQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { ClimbingGym } from '../pages/types/api'

/**
 * GET /v1/climb/${locationId}
 */
export const get_climb_$locationId = async (locationId: number) => {
  return await api.get<ClimbingGym>(`/v1/climb/${locationId}`)
}

export const USER_KEY = ['user']

export const useClimbingGym = (locationId: number) => {
  return useSuspenseQuery({
    queryKey: USER_KEY,
    queryFn: () => get_climb_$locationId(locationId),
    // 1시간마다 새로고침
    refetchInterval: 60 * 60 * 1000,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}