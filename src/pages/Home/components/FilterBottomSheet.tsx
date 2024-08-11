import styles from './FilterBottomSheet.module.scss'
import Icon from '@/components/Icon/Icon'
import BottomSheet from '@/components/BottomSheet'
import {
  FilterContextType,
  addressOptions,
  clibingOptions,
  constraintsOptions,
  defaultFilter,
  skillLevelOptions,
  useFilter,
  useFilterActions,
  useFilterContext,
} from '../hooks/useFilterContext'
import ToggleButton from '@/components/ToggleButton'
import { useEffect } from 'react'
import classNames from 'classnames'
import Checkbox from '@/components/CheckBox'

export default function FilterBottomSheet() {
  const { states: localFilter, actions: localActions } = useFilter()
  const filterContext = useFilterContext()
  const filterActions = useFilterActions()

  useEffect(
    function syncFilterContext() {
      localActions.update(filterContext)
    },
    [filterContext]
  )

  return (
    <BottomSheet.Content>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h2>필터</h2>
          <BottomSheet.Close className={styles.Close}>
            <Icon icon="Close" size="24" />
          </BottomSheet.Close>
        </div>

        <div className={styles.SectionList}>
          <section className={styles.Section}>
            <div className={classNames(styles.Flex, styles.SectionTitle)}>
              <h3>지역</h3>
              <span>(중복 선택 가능)</span>
            </div>
            <OptionList
              name="addressList"
              selected={localFilter.addressList}
              onClick={localActions.addressList.toggle}
              options={addressOptions}
            />
          </section>
          <section className={styles.Section}>
            <div className={styles.SectionTitle}>
              <h3>성별</h3>
            </div>
            <OptionList
              name="constraints"
              selected={localFilter.constraints}
              onClick={localActions.constraints.toggle}
              options={constraintsOptions}
            />
          </section>

          <section className={styles.Section}>
            <div className={styles.SectionTitle}>
              <h3>종목</h3>
            </div>
            <OptionList
              name="clibing"
              selected={localFilter.clibing}
              onClick={localActions.clibing.toggle}
              options={clibingOptions}
            />
          </section>

          <section className={styles.Section}>
            <div className={classNames(styles.SectionTitle, styles.FlexSpaceBetween)}>
              <h3>실력</h3>
              <div className={styles.Checkbox}>
                <Checkbox
                  checked={localFilter.skillLevel === ''}
                  onCheckedChange={localActions.skillLevel.init}
                  id="skill"
                >
                  상관없음
                </Checkbox>
              </div>
            </div>
            <OptionList
              name="skillLevel"
              selected={localFilter.skillLevel}
              onClick={localActions.skillLevel.toggle}
              options={skillLevelOptions}
            />
          </section>
        </div>

        <div className={styles.Controls}>
          <button onClick={localActions.init} className={styles.ResetButton}>
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
  name: keyof FilterContextType
  selected: T[] | T
  options: T[]
  onClick: (option: T) => void
}

function OptionList<T extends string>({ name, selected, options, onClick }: OptionListProps<T>) {
  const defaultOption = defaultFilter[name]

  const pressed = (option: T) => {
    if (!selected) return option === defaultOption
    if (selected.length === 0) return option === defaultOption[0]

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
