import dayjs from 'dayjs'
import { createContext, useContext, useState } from 'react'

type DateRangeContextType = {
  startDate: dayjs.Dayjs | null
  endDate: dayjs.Dayjs | null
}

type DateRangeAction = {
  setStartDate: (date: dayjs.Dayjs | null) => void
  setEndDate: (date: dayjs.Dayjs | null) => void
}

export const defaultDateRange = {
  startDate: dayjs(),
  endDate: dayjs().add(1, 'day'),
}

const DateRangeContext = createContext<DateRangeContextType>(defaultDateRange)

const DateRangeAction = createContext<DateRangeAction>({
  setStartDate: () => {},
  setEndDate: () => {},
})

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)

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
