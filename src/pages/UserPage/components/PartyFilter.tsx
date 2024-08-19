import ToggleButton from '@/components/ToggleButton'
import styles from './PartyFilter.module.scss'
import { useState } from 'react'
import Icon from '@/components/Icon/Icon'
import BottomSheet from '@/components/BottomSheet'
import ScrollPicker from '@/components/ScrollPicker'
import dayjs from 'dayjs'

export default function PartyFilter() {
  const [activeFilter, setActiveFilter] = useState<'전체' | '암장' | '자연'>('전체')

  return (
    <div className={styles.Container}>
      <ul className={styles.FilterList}>
        <li>
          <ToggleButton onClick={() => setActiveFilter('전체')} pressed={activeFilter === '전체'}>
            전체
          </ToggleButton>
        </li>
        <li>
          <ToggleButton onClick={() => setActiveFilter('암장')} pressed={activeFilter === '암장'}>
            암장
          </ToggleButton>
        </li>
        <li>
          <ToggleButton onClick={() => setActiveFilter('자연')} pressed={activeFilter === '자연'}>
            자연
          </ToggleButton>
        </li>
      </ul>

      <DateFilterBottomSheet />
    </div>
  )
}

function DateFilterBottomSheet() {
  const defaultDate = dayjs()
  const defaultYear = defaultDate.get('year')
  const defaultMonth = defaultDate.get('month') + 1
  const defaultDay = defaultDate.get('date')

  const [year, setYear] = useState(2023)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)

  const YEARS = Array.from({ length: 2 }, (_, i) => 2023 + i).map((year) => ({
    value: year,
    label: `${year}년`,
  }))
  const MONTH = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
    value: month,
    label: `${month}월`,
  }))
  const DAYS = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
    value: day,
    label: `${day}일`,
  }))

  console.log({ year, month, day })

  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <button className={styles.DateFilterTrigger}>
          <Icon className={styles.Icon} icon="CalendarLine" size="16" />
          기간 선택
        </button>
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <div className={styles.DateFilterContent}>
          <div className={styles.Header}>
            <h2>필터</h2>
            <BottomSheet.Close className={styles.Close}>
              <Icon icon="Close" size="24" />
            </BottomSheet.Close>
          </div>

          <section className={styles.DateFilter}>
            <ScrollPicker
              defaultValue={{
                value: defaultYear,
                label: `${defaultYear}년`,
              }}
              list={YEARS}
              onSelectedChange={(option) => {
                if (option) setYear(Number(option.value))
              }}
            />
            <ScrollPicker
              defaultValue={{
                value: defaultMonth,
                label: `${defaultMonth}월`,
              }}
              list={MONTH}
              onSelectedChange={(option) => {
                if (option) setMonth(Number(option.value))
              }}
            />
            <ScrollPicker
              defaultValue={{
                value: defaultDay,
                label: `${defaultDay}일`,
              }}
              list={DAYS}
              onSelectedChange={(option) => {
                if (option) setDay(Number(option.value))
              }}
            />
          </section>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  )
}
