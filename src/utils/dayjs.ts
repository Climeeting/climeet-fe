import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData' // ES 2015
import 'dayjs/locale/ko'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import localizedFormat from 'dayjs/plugin/localizedFormat' // ES 2015

dayjs.extend(localeData)
dayjs.locale('ko')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.extend(localizedFormat)

dayjs.updateLocale('en', {
  formats: {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY (dd)',
    LLL: 'MMMM D, YYYY HH:mm',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
  },
})

dayjs.updateLocale('ko', {
  formats: {
    LT: 'A hh:mm',
    LTS: 'A h시 m분 s초',
    L: 'YYYY.MM.DD',
    LL: 'YYYY년 MMMM D일 dd요일',
    LLL: 'YYYY년 M월 D일(dd) HH:mm',
    LLLL: 'YYYY년 MMMM D일 dddd A h시 m분',
  },
})

dayjs.updateLocale('ko', {
  calendar: {
    lastDay: '어제',
    sameDay: 'A hh:mm',
    nextDay: 'M월 D일',
    lastWeek: 'M월 D일',
    nextWeek: 'M월 D일',
    sameElse: 'M월 D일',
  },
})
