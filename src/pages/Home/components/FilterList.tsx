import BottomSheet from '../../../components/BottomSheet'
import { FilterProvider, useFilterActions, useFilterContext } from '../hooks/useFilterContext'
import FilterBottomSheet from './FilterBottomSheet'
import FilterButton from './FilterButton'
import styles from './FilterList.module.scss'

export default function FilterList() {
  return (
    <FilterProvider>
      <BottomSheet>
        <FilterTriggerList />
        <FilterBottomSheet />
      </BottomSheet>
    </FilterProvider>
  )
}

function FilterTriggerList() {
  const { addressList, clibing, constrains, status } = useFilterContext()
  const actions = useFilterActions()

  const addressCount = addressList.includes('모든 지역')
    ? addressList.length - 1
    : addressList.length

  return (
    <div className={styles.container}>
      <BottomSheet.Trigger>
        <FilterButton remove={actions.addressList.reset} active={addressList.length !== 0}>
          {addressList.includes('모든 지역')
            ? '모든 지역'
            : addressList.length
            ? `지역 ${addressCount}`
            : '지역'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.constrains.reset} active={!!constrains}>
          {constrains || '성별'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.status.reset} active={!!status}>
          {status || '신청 현황'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.clibing.reset} active={!!clibing}>
          {clibing || '종목'}
        </FilterButton>
      </BottomSheet.Trigger>
    </div>
  )
}
