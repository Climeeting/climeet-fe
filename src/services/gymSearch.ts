import api from '@/utils/api.ts'
import { ClimbSearch } from '@/pages/types/api.ts'
import { useSuspenseQuery } from '@tanstack/react-query'

export const get_climb_search = async (keyword: string) => {
  try {
    const result = await api.get<ClimbSearch>(`/v1/climb/search?keyword=${keyword}`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('클라이밍장 검색에 실패하였습니다. get v1/climb/search')
  }
}

type GetRecentSearches = {
  content: {
    gymName: string
    searchedAt: string
  }[]
}

export const get_climb_recent_searches = async () => {
  try {
    const result = await api.get<GetRecentSearches>('/v1/climb/recent-searches')
    return result
  } catch (e) {
    console.error(e)
    throw new Error('최근 검색어 조회에 실패하였습니다. get v1/climb/recent-searches')
  }
}

export const RECENT_SEARCHES_KEY = ['recentSearches']

export const useClimbingGymRecentSearches = () => {
  return useSuspenseQuery({
    queryKey: RECENT_SEARCHES_KEY,
    queryFn: get_climb_recent_searches,
    refetchInterval: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
