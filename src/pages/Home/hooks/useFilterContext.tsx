import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type FilterContextType = {
  addressList: AddressOption[]
  clibing: ClibingOption
  constrains: ConstrainsOption
  status: StatusOption
}

const defaultFilter: FilterContextType = {
  addressList: ['모든 지역'],
  clibing: '볼더링',
  constrains: '남녀 모두',
  status: '전체',
}

const FilterContext = createContext<{
  addressList: AddressOption[]
  clibing: ClibingOption
  constrains: ConstrainsOption
  status: StatusOption
}>(defaultFilter)

const ActionsContext = createContext<{
  toggleAddressList: (addressList: AddressOption) => void
  toggleClibing: (clibing: ClibingOption) => void
  toggleConstrains: (constrains: ConstrainsOption) => void
  toggleStatus: (status: StatusOption) => void
  reset: () => void
}>({
  toggleAddressList: () => {},
  toggleClibing: () => {},
  toggleConstrains: () => {},
  toggleStatus: () => {},
  reset: () => {},
})

export function FilterProvider({ children }: PropsWithChildren) {
  const [addressList, setAddressList] = useState<AddressOption[]>(defaultFilter['addressList'])
  const [clibing, setClibing] = useState<ClibingOption>(defaultFilter['clibing'])
  const [constrains, setConstrains] = useState<ConstrainsOption>(defaultFilter['constrains'])
  const [status, setStatus] = useState<StatusOption>(defaultFilter['status'])

  const toggleAddressList = (addressList: AddressOption) => {
    console.log('toggle')
    setAddressList((prev) => toggleDuplicates(prev, addressList))
  }

  const reset = () => {
    setAddressList(defaultFilter['addressList'])
    setClibing(defaultFilter['clibing'])
    setConstrains(defaultFilter['constrains'])
    setStatus(defaultFilter['status'])
  }

  return (
    <FilterContext.Provider
      value={{
        addressList,
        clibing,
        constrains,
        status,
      }}
    >
      <ActionsContext.Provider
        value={{
          toggleAddressList,
          toggleClibing: setClibing,
          toggleConstrains: setConstrains,
          toggleStatus: setStatus,
          reset,
        }}
      >
        {children}
      </ActionsContext.Provider>
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
