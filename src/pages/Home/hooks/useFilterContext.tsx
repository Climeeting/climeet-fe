import {
  ClibingFe,
  ConstraintsFe,
  JoinStatusFe,
  clibingFe2Be,
  constraintsFe2Be,
} from '@/services/adaptor'
import { GetPartyListParams } from '@/services/party'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type FilterContextType = {
  addressList: (AddressOption | '')[]
  clibing: ClibingFe | ''
  constraints: ConstraintsFe | ''
  status: JoinStatusFe | ''
}

export const defaultFilter: FilterContextType = {
  addressList: ['모든 지역'],
  clibing: '볼더링',
  constraints: '남녀 모두',
  status: '전체',
}

export const initialFilter: FilterContextType = {
  addressList: [],
  clibing: '',
  constraints: '',
  status: '',
}

const FilterContext = createContext<FilterContextType>(defaultFilter)

export function useFilter() {
  const [addressList, setAddressList] = useState<FilterContextType['addressList']>(
    initialFilter.addressList
  )
  const [clibing, setClibing] = useState<FilterContextType['clibing']>(initialFilter.clibing)
  const [constraints, setconstraints] = useState<FilterContextType['constraints']>(
    initialFilter.constraints
  )
  const [status, setStatus] = useState<FilterContextType['status']>(initialFilter.status)

  const toggleAddressList = (addressList: AddressOption | '') => {
    if (!addressList) return
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
    constraints,
    status,
  }

  const actions = {
    addressList: {
      toggle: toggleAddressList,
      init: () => setAddressList(initialFilter.addressList),
    },
    clibing: {
      toggle: setClibing,
      init: () => setClibing(initialFilter.clibing),
    },
    constraints: {
      toggle: setconstraints,
      init: () => setconstraints(initialFilter.constraints),
    },
    status: {
      toggle: setStatus,
      init: () => setStatus(initialFilter.status),
    },
    update: (filters = defaultFilter) => {
      setAddressList(filters.addressList)
      setClibing(filters.clibing)
      setconstraints(filters.constraints)
      setStatus(filters.status)
    },
    init: () => {
      setAddressList(initialFilter.addressList)
      setClibing(initialFilter.clibing)
      setconstraints(initialFilter.constraints)
      setStatus(initialFilter.status)
    },
  }

  return { states, actions }
}

const ActionsContext = createContext<{
  addressList: {
    toggle: (option: AddressOption) => void
    init: () => void
  }
  clibing: {
    toggle: (option: ClibingFe) => void
    init: () => void
  }
  constraints: {
    toggle: (option: ConstraintsFe) => void
    init: () => void
  }
  status: {
    toggle: (option: JoinStatusFe) => void
    init: () => void
  }
  init: () => void
  update: (filters?: FilterContextType) => void
}>({
  addressList: {
    toggle: () => {},
    init: () => {},
  },
  clibing: {
    toggle: () => {},
    init: () => {},
  },
  constraints: {
    toggle: () => {},
    init: () => {},
  },
  status: {
    toggle: () => {},
    init: () => {},
  },
  init: () => {},
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
export const clibingOptions: ClibingFe[] = ['볼더링', '리드', '지구력', '상관없음']
export const constraintsOptions: ConstraintsFe[] = ['남녀 모두', '남자', '여자']
export const statusOptions: JoinStatusFe[] = ['전체', '신청하기', '마감임박', '마감']

export class PartyListParams {
  private value: FilterContextType

  constructor(value: FilterContextType) {
    this.value = value
  }

  get constraints(): GetPartyListParams['constraints'] {
    return constraintsFe2Be(this.value.constraints)
  }

  get climbingType(): GetPartyListParams['climbingType'] {
    return clibingFe2Be(this.value.clibing)
  }

  get address1List(): GetPartyListParams['address1List'] {
    return this.value.addressList.map((address) => address as string)
  }

  adapt(): GetPartyListParams {
    return {
      constraints: this.constraints,
      climbingType: this.climbingType,
      address1List: this.address1List,
      // locationId: this.locationId,
    }
  }
}
