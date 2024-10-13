import ToggleButton from '@/components/ToggleButton'
import styles from './PartyFilter.module.scss'
import { useState } from 'react'
import Icon from '@/components/Icon/Icon'
import BottomSheet from '@/components/BottomSheet'
import ScrollPicker from '@/components/ScrollPicker'
import dayjs from 'dayjs'
import { useDateRangeAction, useDateRangeHook } from '../hook/useDateRangeContext'

export function PartyFilter () {
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

export function DateFilterBottomSheet () {
  const [open, onOpenChange] = useState(false)
  const close = () => onOpenChange(false)
  const contextActions = useDateRangeAction()
  const { state: { startDate, endDate }, actions } = useDateRangeHook()
  const [currentTab, setCurrentTab] = useState<'start' | 'end' | null>(null)

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Trigger asChild>
        <button className={styles.DateFilterTrigger}>
          <Icon className={styles.Icon} icon='CalendarLine' size='16' />
          기간 선택
        </button>
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <div className={styles.DateFilterContent}>
          <div className={styles.Header}>
            <h2>기간 선택</h2>
            <BottomSheet.Close className={styles.Close}>
              <Icon icon='Close' size='24' />
            </BottomSheet.Close>
          </div>

          <section className={styles.DateFilterHeader}>
            <button
              className={styles.DateButton}
              data-active={currentTab === 'start'}
              onClick={() => {
                setCurrentTab('start')
                if (!startDate) actions.start.init()
              }}
            >
              <Icon className={styles.Icon} icon='CalendarLine' size='16' />
              {startDate ? startDate.format('YYYY.MM.DD') : '시작 날짜'}
            </button>

            <span className={styles.Dash}>~</span>

            <button
              className={styles.DateButton}
              data-active={currentTab === 'end'}
              onClick={() => {
                setCurrentTab('end')
                if (!endDate) actions.end.init()
              }}
            >
              <Icon className={styles.Icon} icon='CalendarLine' size='16' />
              {endDate ? endDate.format('YYYY.MM.DD') : '종료 날짜'}
            </button>
          </section>

          {currentTab
          && (
            <section className={styles.DateFilter}>
              {currentTab === 'start' && startDate && (
                <DatePicker defaultDate={startDate} date={startDate} setDate={actions.start.update} />
              )}
              {currentTab === 'end' && endDate && (
                <DatePicker defaultDate={endDate} date={endDate} setDate={actions.end.update} />
              )}
            </section>
          )}

          <section className={styles.Buttons}>
            <button
              onClick={() => {
                actions.start.reset()
                actions.end.reset()
                setCurrentTab(null)
              }}
              className={styles.Cancel}
            >
              초기화
            </button>
            <button
              onClick={() => {
                contextActions.start.update(startDate)
                contextActions.end.update(endDate)
                close()
              }}
              className={styles.Submit}
            >
              적용
            </button>
          </section>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  )
}

function DatePicker ({
  defaultDate,
  date,
  setDate,
}: {
  defaultDate: dayjs.Dayjs
  date: dayjs.Dayjs
  setDate: (date: dayjs.Dayjs) => void
}) {
  const defaultYear = defaultDate.get('year')
  const defaultMonth = defaultDate.get('month') + 1
  const defaultDay = defaultDate.get('date')

  const YEARS = Array.from({ length: 2 }, (_, i) => 2023 + i).map(year => ({
    value: year,
    label: `${year}년`,
  }))
  const MONTH = Array.from({ length: 12 }, (_, i) => i + 1).map(month => ({
    value: month,
    label: `${month}월`,
  }))
  const DAYS = Array.from({ length: 31 }, (_, i) => i + 1).map(day => ({
    value: day,
    label: `${day}일`,
  }))

  return (
    <>
      <ScrollPicker
        defaultValue={{
          value: defaultYear,
          label: `${defaultYear}년`,
        }}
        list={YEARS}
        onSelectedChange={(option) => {
          if (option) setDate(date.set('year', Number(option.value)))
        }}
      />
      <ScrollPicker
        defaultValue={{
          value: defaultMonth,
          label: `${defaultMonth}월`,
        }}
        list={MONTH}
        onSelectedChange={(option) => {
          if (option) setDate(date.set('month', Number(option.value) - 1))
        }}
      />
      <ScrollPicker
        defaultValue={{
          value: defaultDay,
          label: `${defaultDay}일`,
        }}
        list={DAYS}
        onSelectedChange={(option) => {
          if (option) setDate(date.set('date', Number(option.value)))
        }}
      />
    </>
  )
}
