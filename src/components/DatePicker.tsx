import { useMemo, useState } from 'react'
import styles from './DatePicker.module.scss'
import dayjs from 'dayjs'

type Props = {
  initDate?: dayjs.Dayjs
  onClick?: () => void
}
export default function DatePicker({ initDate, onClick }: Props) {
  const now = useMemo(() => initDate || dayjs(), [initDate])
  const week = useMemo(() => Array.from({ length: 14 }, (_, index) => now.add(index, 'day')), [now])

  const [activeDate, setActiveDate] = useState(now)

  return (
    <div className={styles.Container}>
      <h3 className={styles.Title}>{now.format('YYYY년 MM월 DD일 (dd)')}</h3>
      <ul className={styles.List}>
        {week.map((date, index) => (
          <li>
            <button
              key={index}
              className={styles.Button}
              data-active={dayjs(activeDate).isSame(date)}
              onClick={() => {
                setActiveDate(date)
                onClick?.()
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
