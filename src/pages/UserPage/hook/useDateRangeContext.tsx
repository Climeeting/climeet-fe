import dayjs from 'dayjs'
import { createContext, useContext, useState } from 'react'

type DateRangeContextType = {
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
}

type DateRangeAction = {
  setStartDate: (date: dayjs.Dayjs) => void
  setEndDate: (date: dayjs.Dayjs) => void
}

const DateRangeContext = createContext<DateRangeContextType>({
  startDate: dayjs(),
  endDate: dayjs().add(1, 'day'),
})

const DateRangeAction = createContext<DateRangeAction>({
  setStartDate: () => {},
  setEndDate: () => {},
})

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day'))

  return (
    <DateRangeContext.Provider value={{ startDate, endDate }}>
      <DateRangeAction.Provider value={{ setStartDate, setEndDate }}>
        {children}
      </DateRangeAction.Provider>
    </DateRangeContext.Provider>
  )
}

export function useDateRangeContext() {
  return useContext(DateRangeContext)
}

export function useDateRangeAction() {
  return useContext(DateRangeAction)
}
