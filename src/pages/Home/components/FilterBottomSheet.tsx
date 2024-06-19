import styles from './FilterBottomSheet.module.scss'
import Icon from '@/components/Icon/Icon'
import BottomSheet from '@/components/BottomSheet'
import {
  addressOptions,
  clibingOptions,
  constrainsOptions,
  statusOptions,
  useFilter,
  useFilterActions,
  useFilterContext,
} from '../hooks/useFilterContext'
import ToggleButton from '@/components/ToggleButton'
import { useEffect } from 'react'

export default function FilterBottomSheetMain() {
  const { states: localFilter, actions: localActions } = useFilter()
  const filterContext = useFilterContext()
  const filterActions = useFilterActions()

  const resetByFilterContext = () => localActions.update(filterContext)
  useEffect(resetByFilterContext, [filterContext])

  return (
    <BottomSheet.Content onClickOverlay={resetByFilterContext}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h2>필터</h2>
          <BottomSheet.Close onClick={resetByFilterContext} className={styles.Close}>
            <Icon icon="Close" size="24" />
          </BottomSheet.Close>
        </div>

        <div className={styles.SectionList}>
          <section className={styles.Section}>
            <div className={styles.Flex}>
              <h3>지역</h3>
              <span>(중복 선택 가능)</span>
            </div>
            <OptionList
              selected={localFilter.addressList}
              onClick={localActions.addressList.toggle}
              options={addressOptions}
            />
          </section>
          <section className={styles.Section}>
            <h3>성별</h3>
            <OptionList
              selected={localFilter.constrains}
              onClick={localActions.constrains.toggle}
              options={constrainsOptions}
            />
          </section>
          <section className={styles.Section}>
            <h3>신청 현황</h3>
            <OptionList
              selected={localFilter.status}
              onClick={localActions.status.toggle}
              options={statusOptions}
            />
          </section>

          <section className={styles.Section}>
            <h3>종목</h3>
            <OptionList
              selected={localFilter.clibing}
              onClick={localActions.clibing.toggle}
              options={clibingOptions}
            />
          </section>
        </div>

        <div className={styles.Controls}>
          <button onClick={localActions.reset} className={styles.ResetButton}>
            초기화
          </button>
          <BottomSheet.Close
            onClick={() => filterActions.update(localFilter)}
            className={styles.ApplyButton}
          >
            적용
          </BottomSheet.Close>
        </div>
      </div>
    </BottomSheet.Content>
  )
}

type OptionListProps<T> = {
  selected: T[] | T
  options: T[]
  onClick: (option: T) => void
}

function OptionList<T extends string>({ selected, options, onClick }: OptionListProps<T>) {
  const pressed = (option: T) => {
    if (typeof selected === 'string') return option === selected
    return (selected as string[]).includes(option)
  }

  return (
    <ul className={styles.OptionList}>
      {options.map((option) => (
        <ToggleButton pressed={pressed(option)} onClick={() => onClick(option)} key={option}>
          {option}
        </ToggleButton>
      ))}
    </ul>
  )
}
