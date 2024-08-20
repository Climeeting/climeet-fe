import { useLocalStorage } from '@uidotdev/usehooks'
import dayjs from 'dayjs'
import { createContext, useContext, useEffect } from 'react'

const DateContext = createContext<dayjs.Dayjs>(dayjs())
const DateActions = createContext<(date: dayjs.Dayjs) => void>(() => {})

export function DateProvider ({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useLocalStorage('date', dayjs())

  useEffect(() => {
    // 만약 date가 오늘 이전이라면 오늘로 설정
    if (dayjs(date).isBefore(dayjs(), 'day')) setDate(dayjs())
  }, [date])

  return (
    <DateContext.Provider value={date}>
      <DateActions.Provider value={setDate}>{children}</DateActions.Provider>
    </DateContext.Provider>
  )
}

export const useDateContext = () => {
  return useContext(DateContext)
}

export const useDateActions = () => {
  return useContext(DateActions)
}
