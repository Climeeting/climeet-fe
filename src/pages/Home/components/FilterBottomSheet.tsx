import ToggleButton from '../../../components/ToggleButton'
import styles from './FilterBottomSheet.module.scss'
import Icon from '../../../components/Icon/Icon'
import BottomSheet from '../../../components/BottomSheet'
import {
  FilterContextType,
  addressOptions,
  clibingOptions,
  constrainsOptions,
  statusOptions,
  useFilterActions,
  useFilterContext,
} from '../hooks/useFilterContext'

export default function FilterBottomSheetMain() {
  const actions = useFilterActions()

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
            <div className={styles.Flex}>
              <h3>지역</h3>
              <span>(중복 선택 가능)</span>
            </div>
            <OptionList
              name={'addressList'}
              onClick={actions.toggleAddressList}
              options={addressOptions}
            />
          </section>
          <section className={styles.Section}>
            <h3>성별</h3>
            <OptionList
              name={'constrains'}
              onClick={actions.toggleConstrains}
              options={constrainsOptions}
            />
          </section>
          <section className={styles.Section}>
            <h3>신청 현황</h3>
            <OptionList name={'status'} onClick={actions.toggleStatus} options={statusOptions} />
          </section>

          <section className={styles.Section}>
            <h3>종목</h3>
            <OptionList name={'clibing'} onClick={actions.toggleClibing} options={clibingOptions} />
          </section>
        </div>

        <div className={styles.Controls}>
          <BottomSheet.Close className={styles.ResetButton}>초기화</BottomSheet.Close>
          <BottomSheet.Close className={styles.ApplyButton}>적용</BottomSheet.Close>
        </div>
      </div>
    </BottomSheet.Content>
  )
}

type OptionListProps<T> = {
  options: T[]
  onClick: (option: T) => void
  name: keyof FilterContextType
}

function OptionList<T extends string>({ options, onClick, name }: OptionListProps<T>) {
  const filterContext = useFilterContext()
  const selectedOptions = filterContext[name]

  const pressed = (option: T) => {
    if (typeof selectedOptions === 'string') return option === selectedOptions
    return (selectedOptions as string[]).includes(option)
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
