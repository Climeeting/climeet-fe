import BottomSheet from '@/components/BottomSheet'
import FilterBottomSheet from './FilterBottomSheet'
import FilterButton from './FilterButton'
import styles from './FilterList.module.scss'
import { FilterProvider } from '../hooks/useFilterContext'

export default function FilterList() {
  return (
    <FilterProvider>
      <BottomSheet>
        <div className={styles.container}>
          <BottomSheet.Trigger>
            <FilterButton>지역</FilterButton>
          </BottomSheet.Trigger>

          <BottomSheet.Trigger>
            <FilterButton>성별</FilterButton>
          </BottomSheet.Trigger>

          <BottomSheet.Trigger>
            <FilterButton>신청 현황</FilterButton>
          </BottomSheet.Trigger>

          <BottomSheet.Trigger>
            <FilterButton>종목</FilterButton>
          </BottomSheet.Trigger>
        </div>
        <FilterBottomSheet />
      </BottomSheet>
    </FilterProvider>
  )
}
