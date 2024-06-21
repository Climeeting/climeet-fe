import { useMemo } from 'react'
import styles from './DatePicker.module.scss'
import dayjs from 'dayjs'
import { useDateActions, useDateContext } from '@/pages/Home/hooks/useDateContext'

type Props = {
  onClick?: (date: dayjs.Dayjs) => void
}
export default function DatePicker({ onClick }: Props) {
  const selected = useDateContext()
  const now = useMemo(dayjs, [])
  const updateDate = useDateActions()
  const week = useMemo(() => Array.from({ length: 14 }, (_, index) => now.add(index, 'day')), [now])

  return (
    <div className={styles.Container}>
      <h3 className={styles.Title}>{now.format('YYYY년 MM월 DD일 (dd)')}</h3>
      <ul className={styles.List}>
        {week.map((date, index) => (
          <li key={date.format()}>
            <button
              key={index}
              className={styles.Button}
              data-active={dayjs(selected).isSame(date, 'date')}
              onClick={() => {
                updateDate(date)
                onClick?.(date)
              }}
            >
              <span className={styles.Day}>{date.format('dd')}</span>
              <span className={styles.Date}>{date.format('DD')}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
