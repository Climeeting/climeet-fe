import { useState } from 'react'
import { ClimbSearchItem } from '@/pages/types/api.ts'
import { useDebounce } from 'react-use'
import { Hangul } from '@/utils/hangul.ts'
import { get_climb_search } from '@/services/gymSearch.ts'

export const useClimbingGymSearch = (value: string) => {
  const [gymList, setGymList] = useState<ClimbSearchItem[]>([])
  useDebounce(
    async () => {
      if (value === '') return
      if (!Hangul.isCompleteAll(value)) return
      const res = await get_climb_search(value)
      setGymList(res.content)
    },
    500,
    [value]
  )

  return {
    gymList,
  }
}
