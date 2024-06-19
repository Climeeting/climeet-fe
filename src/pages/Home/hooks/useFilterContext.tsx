import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type FilterContextType = {
  addressList: AddressOption[]
  clibing: ClibingOption
  constrains: ConstrainsOption
  status: StatusOption
}

export const defaultFilter: FilterContextType = {
  addressList: ['모든 지역'],
  clibing: '볼더링',
  constrains: '남녀 모두',
  status: '전체',
}

const FilterContext = createContext<FilterContextType>(defaultFilter)

export function useFilter() {
  const [addressList, setAddressList] = useState<FilterContextType['addressList']>(
    defaultFilter.addressList
  )
  const [clibing, setClibing] = useState<FilterContextType['clibing']>(defaultFilter.clibing)
  const [constrains, setConstrains] = useState<FilterContextType['constrains']>(
    defaultFilter.constrains
  )
  const [status, setStatus] = useState<FilterContextType['status']>(defaultFilter.status)

  const toggleAddressList = (addressList: AddressOption) => {
    setAddressList((prev) => {
      const newAddressList = toggleDuplicates(prev, addressList)
      if (addressList === '모든 지역' || newAddressList.length >= addressOptions.length - 1)
        return ['모든 지역']
      return newAddressList.filter((item) => item !== '모든 지역')
    })
  }

  const states = {
    addressList,
    clibing,
    constrains,
    status,
  }

  const actions = {
    addressList: {
      toggle: toggleAddressList,
      reset: () => setAddressList(defaultFilter.addressList),
    },
    clibing: {
      toggle: setClibing,
      reset: () => setClibing(defaultFilter.clibing),
    },
    constrains: {
      toggle: setConstrains,
      reset: () => setConstrains(defaultFilter.constrains),
    },
    status: {
      toggle: setStatus,
      reset: () => setStatus(defaultFilter.status),
    },
    update: (filters = defaultFilter) => {
      setAddressList(filters.addressList)
      setClibing(filters.clibing)
      setConstrains(filters.constrains)
      setStatus(filters.status)
    },
    reset: () => {
      setAddressList(defaultFilter.addressList)
      setClibing(defaultFilter.clibing)
      setConstrains(defaultFilter.constrains)
      setStatus(defaultFilter.status)
    },
  }

  return { states, actions }
}

const ActionsContext = createContext<{
  addressList: {
    toggle: (option: AddressOption) => void
    reset: () => void
  }
  clibing: {
    toggle: (option: ClibingOption) => void
    reset: () => void
  }
  constrains: {
    toggle: (option: ConstrainsOption) => void
    reset: () => void
  }
  status: {
    toggle: (option: StatusOption) => void
    reset: () => void
  }
  reset: () => void
  update: (filters?: FilterContextType) => void
}>({
  addressList: {
    toggle: () => {},
    reset: () => {},
  },
  clibing: {
    toggle: () => {},
    reset: () => {},
  },
  constrains: {
    toggle: () => {},
    reset: () => {},
  },
  status: {
    toggle: () => {},
    reset: () => {},
  },
  reset: () => {},
  update: () => {},
})

export function FilterProvider({ children }: PropsWithChildren) {
  const { states, actions } = useFilter()

  return (
    <FilterContext.Provider value={states}>
      <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
    </FilterContext.Provider>
  )
}

const toggleDuplicates = <T,>(prev: T[], item: T) => {
  // 최소 1개는 선택해야함
  if (prev.length === 1 && prev.includes(item)) return prev
  if (prev.includes(item)) {
    return prev.filter((curItem) => curItem !== item)
  }
  return [...prev, item]
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}

export const useFilterActions = () => {
  return useContext(ActionsContext)
}

export type FilterName = '지역' | '종목' | '성별' | '신청 현황'
export type AddressOption =
  | '모든 지역'
  | '서울'
  | '경기'
  | '인천'
  | '강원'
  | '대전/세종'
  | '충남'
  | '충북'
  | '대구'
  | '경북'
  | '부산'
  | '울산'
  | '경남'
  | '광주'
  | '전남'
  | '전북'
  | '제주'

export type ClibingOption = '볼더링' | '리드' | '지구력' | '상관없음'
export type ConstrainsOption = '남녀 모두' | '남자' | '여성'
export type StatusOption = '전체' | '신청하기' | '마감임박' | '마감'

export const addressOptions: AddressOption[] = [
  '모든 지역',
  '서울',
  '경기',
  '인천',
  '강원',
  '대전/세종',
  '충남',
  '충북',
  '대구',
  '경북',
  '부산',
  '울산',
  '경남',
  '광주',
  '전남',
  '전북',
  '제주',
]
export const clibingOptions: ClibingOption[] = ['볼더링', '리드', '지구력', '상관없음']
export const constrainsOptions: ConstrainsOption[] = ['남녀 모두', '남자', '여성']
export const statusOptions: StatusOption[] = ['전체', '신청하기', '마감임박', '마감']
