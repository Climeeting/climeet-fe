import dayjs from 'dayjs'
import { useDateContext } from './useDateContext'
import { PartyListParams, useFilterContext } from './useFilterContext'
import { useSearchContext } from './useSearchContext'

export const useFilterParams = () => {
  const date = useDateContext()
  const filters = useFilterContext()
  const searchResult = useSearchContext()

  const params = {
    ...new PartyListParams(filters).adapt(),
    ...(searchResult.length !== 0
      ? { locationIds: searchResult.map(({ id }) => id).join(',') }
      : null),
    appointmentDate: dayjs(date).tz('Asia/Seoul').format('YYYY-MM-DD'),
  }

  return params
}
