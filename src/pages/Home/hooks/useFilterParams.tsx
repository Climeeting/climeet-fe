import { useDateContext } from './useDateContext'
import { PartyListParams, useFilterContext } from './useFilterContext'
import { useSearchContext } from './useSearchContext'

export const useFilterParams = () => {
  const date = useDateContext()
  const filters = useFilterContext()
  const searchResult = useSearchContext()

  const params = {
    ...new PartyListParams(filters).adapt(),
    ...(searchResult ? { locationId: searchResult.id } : null),
    date: date.tz('Asia/Seoul').format(),
  }

  return params
}
