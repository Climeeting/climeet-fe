import { getScrollOption } from '@/components/ScrollPicker'
import { useState } from 'react'

interface TimePickerState {
  meridiem: string
  hours: string
  minutes: string
}

export const MERIDIEM = ['오전', '오후'].map(getScrollOption)
export const HOURS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(getScrollOption)
export const MINUTES = ['00', '10', '20', '30', '40', '50'].map(getScrollOption)

const parseTime = (time: string): TimePickerState => {
  const [hh, mm] = time.split(':').map(Number)
  let meridiem = '오전'
  let hours = (hh > 12 ? hh - 12 : hh).toString().padStart(2, '0')
  if (hh >= 12) {
    meridiem = '오후'
  }
  if (hh === 0) {
    hours = '12'
  }
  const minutes = mm.toString().padStart(2, '0')
  return { meridiem, hours, minutes }
}

export const useTimePicker = (defaultTime: string) => {
  const [timePicker, setTimePicker] = useState<TimePickerState>(() => parseTime(defaultTime))

  const padToTwoDigits = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const createTimeString = (hours: number, minutes: string): string => {
    const paddedHours = padToTwoDigits(hours)
    return `${paddedHours}:${minutes}`
  }

  const convertTo24HourFormat = (meridiem: string, hours: number): number => {
    if (meridiem === '오후' && hours !== 12) {
      return hours + 12
    } else if (meridiem === '오전' && hours === 12) {
      return 0
    }
    return hours
  }

  const getNextTime = (meridiem: string, hours: string, minutes: string): string => {
    const numericHours = parseInt(hours, 10)
    const convertedHours = convertTo24HourFormat(meridiem, numericHours)
    return createTimeString(convertedHours, minutes)
  }

  return {
    timePicker,
    setTimePicker,
    getNextTime,
  }
}
