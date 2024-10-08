import BottomSheet from '@/components/BottomSheet'
import { useFilterActions, useFilterContext } from '../hooks/useFilterContext'
import FilterBottomSheet from './FilterBottomSheet'
import FilterButton from './FilterButton'
import styles from './FilterList.module.scss'
import { useState } from 'react'

export default function FilterList () {
  const [open, setOpen] = useState(false)
  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <FilterTriggerList />
      {open && <FilterBottomSheet />}
    </BottomSheet>
  )
}

function FilterTriggerList () {
  const { addressList, clibing, constraints, skillLevel } = useFilterContext()
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
        <FilterButton remove={actions.constraints.init} active={!!constraints}>
          {constraints || '성별'}
        </FilterButton>
      </BottomSheet.Trigger>

      <BottomSheet.Trigger>
        <FilterButton remove={actions.skillLevel.init} active={!!skillLevel}>
          {skillLevel || '실력'}
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
