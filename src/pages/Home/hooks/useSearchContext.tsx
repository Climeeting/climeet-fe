import { ClimbSearchItem } from '@/pages/types/api'
import { createContext, useContext, useState } from 'react'

const SearchContext = createContext<ClimbSearchItem | null>(null)
const SearchActions = createContext<(searchItem: ClimbSearchItem) => void>(() => {})

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [searchItem, setSearchItem] = useState<ClimbSearchItem | null>(null)

  return (
    <SearchContext.Provider value={searchItem}>
      <SearchActions.Provider value={setSearchItem}>{children}</SearchActions.Provider>
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  return useContext(SearchContext)
}

export const useSearchActions = () => {
  return useContext(SearchActions)
}
