import BottomSheet from '@/components/BottomSheet'
import { useFilterActions, useFilterContext } from '../hooks/useFilterContext'
import FilterBottomSheet from './FilterBottomSheet'
import FilterButton from './FilterButton'
import styles from './FilterList.module.scss'

export default function FilterList() {
  return (
    <BottomSheet>
      <FilterTriggerList />
      <FilterBottomSheet />
    </BottomSheet>
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
        <FilterButton remove={actions.addressList.init} active={addressList.length !== 0}>
          {addressList.includes('모든 지역')
            ? '모든 지역'
            : addressList.length
              ? `지역 ${addressCount}`
              : '지역'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.constrains.init} active={!!constrains}>
          {constrains || '성별'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.status.init} active={!!status}>
          {status || '신청 현황'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.clibing.init} active={!!clibing}>
          {clibing || '종목'}
        </FilterButton>
      </BottomSheet.Trigger>
    </div>
  )
}
