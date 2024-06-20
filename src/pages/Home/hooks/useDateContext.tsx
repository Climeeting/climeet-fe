import dayjs from 'dayjs'
import { createContext, useContext, useState } from 'react'

const DateContext = createContext<dayjs.Dayjs>(dayjs())
const DateActions = createContext<(date: dayjs.Dayjs) => void>(() => {})

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState(dayjs())

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
