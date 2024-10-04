import { useMemo } from 'react'
import styles from './DatePicker.module.scss'
import dayjs from 'dayjs'
import { useDateActions, useDateContext } from '@/pages/Home/hooks/useDateContext'

type Props = {
  onClick?: (date: dayjs.Dayjs) => void
}
export default function DatePickerContainer ({ onClick }: Props) {
  const selected = useDateContext()
  const now = useMemo(dayjs, [])
  const updateDate = useDateActions()

  return (
    <div className={styles.Container}>
      <h3 className={styles.Title}>{now.format('YYYY년 MM월 DD일 (dd)')}</h3>
      <div className={styles.DatePickerContainer}>
        <DatePicker
          selected={selected}
          onClick={(date: dayjs.Dayjs) => {
            updateDate(date)
            onClick?.(date)
          }}
        />
      </div>
    </div>
  )
}

type DatePickerProps = {
  onClick?: (date: dayjs.Dayjs) => void
  selected: dayjs.Dayjs
}
export function DatePicker ({ onClick, selected }: DatePickerProps) {
  const now = useMemo(dayjs, [])
  const week = useMemo(() => Array.from({ length: 14 }, (_, index) => now.add(index, 'day')), [now])

  return (
    <ul className={styles.List}>
      {week.map((date, index) => (
        <li key={date.format()}>
          <button
            key={index}
            className={styles.Button}
            data-active={dayjs(selected).isSame(date, 'date')}
            onClick={() => {
              onClick?.(date)
            }}
          >
            <span className={styles.Day}>{date.format('dd')}</span>
            <span className={styles.Date}>{date.format('DD')}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
