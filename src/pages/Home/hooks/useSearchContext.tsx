import { ClimbSearchItem } from '@/pages/types/api'
import { useLocalStorage } from '@uidotdev/usehooks'
import { createContext, useContext } from 'react'

type Actions = {
  add: (searchItem: ClimbSearchItem) => void
  remove: (searchItem: ClimbSearchItem) => void
}

const defaultActions: Actions = {
  add: () => {},
  remove: () => {},
}

const SearchContext = createContext<ClimbSearchItem[]>([])
const SearchActions = createContext<Actions>(defaultActions)

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [searchItem, setSearchItem] = useLocalStorage<ClimbSearchItem[]>('searchItems', [])

  const actions = {
    add: (searchItem: ClimbSearchItem) => {
      setSearchItem((prev) => [...prev, searchItem])
    },
    remove: (searchItem: ClimbSearchItem) => {
      setSearchItem((prev) => prev.filter((item) => item.id !== searchItem.id))
    },
  }

  return (
    <SearchContext.Provider value={searchItem}>
      <SearchActions.Provider value={actions}>{children}</SearchActions.Provider>
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  return useContext(SearchContext)
}

export const useSearchActions = () => {
  return useContext(SearchActions)
}
