import api from '@/utils/api.ts'
import { ClimbSearch } from '@/pages/types/api.ts'

export const get_climb_search = async (keyword: string) => {
  try {
    const result = await api.get<ClimbSearch>(`/v1/climb/search?keyword=${keyword}`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('클라이밍장 검색에 실패하였습니다. get v1/climb/search')
  }
}
